import React, { Fragment } from "react";
import ReactMapboxGl, { Layer, Source } from "react-mapbox-gl";
import axios from "axios";
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const SENSOR_READING = "Dissolved O2";
const DELTAS = {
  'Temperature': 2,   // 75 -> 84
  'Salinity': 1,    // 24.89 -> 28.3
  'Dissolved O2': 1,    // 4 -> 8
  'pH': 0.3             // 7.1 -> 7.9
};
const HEAT_MAP_BASE = {
  "heatmap-color": [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    0, "rgba(0,0,0,0)",
    0.2, "#d7191c",
    0.4, "#fdae61",
    0.6, "#ffffbf",
    0.8, "#abd9e9",
    1, "#2c7bb6"
  ],
  "heatmap-intensity": [
    // stops: [[0, 0], [7, 2], [10, 5]]
    "interpolate",
    ["linear"],
    ["zoom"],
    0, 1,
    9, 3
  ],
  "heatmap-radius": {
    stops: [[1, 20], [5, 100], [14, 160]]
  },
  "heatmap-opacity": {
    stops: [[1, 0.25], [7, 0.6], [12, 0.9], [13, 0]]
  }
};

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGRvcmlhOTIxIiwiYSI6ImNqbzFyaTlyajBlcm8za3FpeXVobDhnOXQifQ.cCd_N_-DvB2yn4BOHmdWyQ",
  maxZoom: 16,
  minZoom: 4
});

const style = {
  dark: "mapbox://styles/mapbox/dark-v9",
  streets: "mapbox://styles/mapbox/streets-v9"
};

const mapStyle = {
  height: 'auto',
  flex: '1 0 auto'
};

export default class LagoonMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [-87.6500523, 41.850033], // Center of US
      zoom: [3],
      currentMapType: 1,
      lagoonGeoJson: null,
      pointLayerPaint: {
        "circle-radius": 5,
        "circle-color": ["case", [">", ["get", "delta"], 5], "red", "#ffffbf"],
        "circle-opacity": {
          stops: [[9, 0], [14, 1]]
        }
      },
      heatLayerPaint: HEAT_MAP_BASE
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleSnackClose = this.handleSnackClose.bind(this);
    this.handleMapChange = this.handleMapChange.bind(this);
  }

  componentDidMount() {
    this.fetchSensorData().then(data => {
      const features = data.map(this.sensorToFeature);
      console.log({ data, features });
      this.setState({
        lagoonGeoJson: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features
          }
        }
      });

      let min, max;
      const d = data.map(item => {
        const reading = item.data.find(item => item.label === SENSOR_READING);

        return reading.delta;
      }).sort();

      console.log({ d });

      min = Math.abs(d[0]);
      max = d[d.length - 1];

      this.setHeatMapForReading(SENSOR_READING, min, max);
    });
  }

  setHeatMapForReading(sensorReadingKey, min, max) {
    const plusMinusDelta = DELTAS[sensorReadingKey];
    const heatmapWeight = [
      "interpolate",
      ["linear"],
      ["get", "delta"]
    ];
    const heatmapColor = [
      "interpolate",
      ["linear"],
      ["heatmap-density"]
    ];
    // WEIGHT
    // {
    //   "interpolate",
    //   ["linear"],
    //   ["get", "mag"],
    //   offset, 0,
    //   max + offset, 1
    // }

    if (plusMinusDelta) {

      // [offset ... max + offset]



      // COLOR
      // {
      //   "interpolate",
      //   ["linear"],
      //   ["heatmap-density"],
      //   0, "rgba(33,102,172,0)",
      //   0.2, "rgb(103,169,207)",
      //   0.4, "rgb(209,229,240)",
      //   0.6, "rgb(253,219,199)",
      //   0.8, "rgb(239,138,98)",
      //   1, "rgb(178,24,43)"
      // }

      // negative deltas
      // heatmapWeight.push(plusMinusDelta );
      // heatmapWeight.push(1);
      // heatmapColor.push(plusMinusDelta * -1);
      // heatmapColor.push('#d7191c'); // dark red

      // heatmapWeight.push((plusMinusDelta / 2) + 0.009999999999999787);
      // heatmapWeight.push(0.5);
      // heatmapColor.push((plusMinusDelta / 2) * -1);
      // heatmapColor.push('#fdae61'); // light red

      // show nothing for zero changes
      // heatmapWeight.push(0);
      // heatmapWeight.push(0);
      // heatmapColor.push(0);
      // heatmapColor.push('rgba(0,0,0,0)'); // nuetral: #ffffbf

      // positive deltas
      // heatmapWeight.push((plusMinusDelta / 2));
      // heatmapWeight.push(0.5);/
      // heatmapColor.push((plusMinusDelta / 2));
      // heatmapColor.push('#abd9e9'); // light blue

      // heatmapWeight.push(plusMinusDelta);
      // heatmapWeight.push(1);
      // heatmapColor.push(plusMinusDelta);
      // heatmapColor.push('#2c7bb6'); // dark blue
    }

    heatmapWeight.push(min);
    heatmapWeight.push(0);

    heatmapWeight.push(min + max);
    heatmapWeight.push(1);

    const updatedHeatmapPaint = {
      ...HEAT_MAP_BASE,
      'heatmap-weight': heatmapWeight,
      // 'heatmap-color': heatmapColor
    };

    console.log({ updatedHeatmapPaint });
    this.setState({
      heatLayerPaint: updatedHeatmapPaint
    });
  }

  sensorToFeature(sensor) {
    // TODO: get delta from sensor readings
    const [reading] = sensor.data.filter(d => d.label === SENSOR_READING);
    return {
      type: "Feature",
      properties: {
        delta: (reading && reading.delta * -1) || 0,
        value: reading.value,
        sensorId: sensor.sensorId
      },
      geometry: {
        type: "Point",
        coordinates: [sensor.long, sensor.lat]
      }
    };
  }

  async fetchSensorData() {
    let data = [];

    try {
      // await new Promise(resolve => setTimeout(resolve, 7000));
      const response = await axios.get("http://50ef6569.ngrok.io");
      data = response.data;
    } catch (err) {
      this.setState({
        err,
        showError: true
      });
    }

    return data;
  }

  handleMapLoad(map) {
    const center = [-81.012788, 28.680166];
    const point = map.project(center);

    point.x -= 40;

    const newCenter = map.unproject(point);

    this.setState({ center: newCenter, zoom: [6.5] });
  }

  handleClick(map, event) {
    const features = map.queryRenderedFeatures(event.point);

    if (features && features.length) {
      const [featureClicked] = features.filter(
        f => f.layer.id === "heatmap_point_layer"
      );

      if (featureClicked) {
        console.log(featureClicked.properties);
      }
    }
  }

  handleSnackClose() {
    this.setState({
      showError: false
    });
  }

  handleMapChange(event, value) {
    this.setState({
      currentMapType: value
    })
  }

  render() {
    return (
      <div style={{display: 'flex', height: 'auto', flex: '1 0 auto', position: 'relative'}}>
        <Map
          style={style.dark}
          center={this.state.center}
          zoom={this.state.zoom}
          containerStyle={mapStyle}
          onStyleLoad={this.handleMapLoad}
          onClick={this.handleClick}
        >
          <Layer
            id="base_layer"
            type="heatmap"
            paint={{
              "heatmap-color": "#99d594",
              "heatmap-opacity": 0.05
            }}
          />

          {!this.state.lagoonGeoJson && !this.state.err &&
            <LinearProgress />
          }

          {this.state.lagoonGeoJson &&
            <Fragment>
              <Source id="lagoon_data" geoJsonSource={this.state.lagoonGeoJson} />

              {this.state.currentMapType === 0 && (
                <Fragment>
                  <Layer
                    id="heatmap_layer"
                    type="heatmap"
                    paint={this.state.heatLayerPaint}
                    sourceId="lagoon_data"
                  />
                  <Layer
                    id="heatmap_point_layer"
                    type="circle"
                    paint={this.state.pointLayerPaint}
                    sourceId="lagoon_data"
                  />
                </Fragment>
              )}

              {this.state.currentMapType === 1 && (
                <Fragment>
                  <Layer
                    id="point_layer"
                    type="circle"
                    paint={{
                      "circle-color": "#ffffbf"
                    }}
                    sourceId="lagoon_data"
                  />
                </Fragment>
              )}
            </Fragment>
          }
        </Map>

        <Paper square style={{position: 'absolute',top: '20px',right: '20px'}}>
          <Tabs
            value={this.state.currentMapType}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleMapChange}
          >
            <Tab label="Heatmap" />
            <Tab label="Points" />
          </Tabs>
        </Paper>

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.state.showError}
          message={<span id="message-id">Error loading data</span>}
          action={
            <Button color="secondary" size="small" onClick={this.handleSnackClose}>
              Ok
            </Button>
          }
        />
      </div>
    );
  }
}
