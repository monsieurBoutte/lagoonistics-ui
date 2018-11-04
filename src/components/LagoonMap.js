import React from "react";
import ReactMapboxGl, { Layer, Source } from "react-mapbox-gl";
import axios from "axios";
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

const SENSOR_READING = "Dissolved O2";
const DELTAS = {
  'Temperature': 2,   // 75 -> 84
  'Salinity': 1,    // 24.89 -> 28.3
  'Dissolved O2': 1,    // 4 -> 8
  'pH': 0.3             // 7.1 -> 7.9
};
const HEAT_MAP_BASE = {
  "heatmap-intensity": {
    stops: [[0, 0], [7, 2], [10, 5]]
  },
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
  height: "100%"
};

export default class LagoonMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [-87.6500523, 41.850033], // Center of US
      zoom: [3],
      lagoonGeoJson: null,
      pointLayerPaint: {
        "circle-radius": 5,
        "circle-color": ["case", [">", ["get", "delta"], 5], "red", "#ffffbf"],
        "circle-opacity": {
          stops: [[9, 0], [14, 1]]
        }
      },
      heatLayerPaint: {
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["get", "delta"],
          -0.1,
          0.5,
          0,
          0, // if delta is zero show zero weight
          5,
          0.5,
          10,
          1
        ],
        "heatmap-intensity": {
          stops: [[0, 0], [7, 1], [10, 2]]
        },
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(0,0,0,0)",
          0.25,
          "#99d594", // green
          0.5,
          "#ffffbf", // yellow
          1,
          "#fc8d59" // red
        ],
        "heatmap-radius": {
          stops: [[1, 20], [5, 100], [14, 160]]
        },
        "heatmap-opacity": {
          stops: [[1, 0.25], [7, 0.6], [12, 0.9], [13, 0]]
        }
      }
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleMapLoad = this.handleMapLoad.bind(this);
    this.handleSnackClose = this.handleSnackClose.bind(this);
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
    });

    this.setHeatMapForReading(SENSOR_READING);
  }

  setHeatMapForReading(sensorReadingKey) {
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

    if (plusMinusDelta) {
      // negative deltas
      heatmapWeight.push(plusMinusDelta * -1);
      heatmapWeight.push(1);
      heatmapColor.push(plusMinusDelta * -1);
      heatmapColor.push('#d7191c'); // dark red

      heatmapWeight.push((plusMinusDelta / 2) * -1);
      heatmapWeight.push(0.5);
      heatmapColor.push((plusMinusDelta / 2) * -1);
      heatmapColor.push('#fdae61'); // light red

      // show nothing for zero changes
      heatmapWeight.push(0);
      heatmapWeight.push(0);
      heatmapColor.push(0);
      heatmapColor.push('rgba(0,0,0,0)'); // nuetral: #ffffbf

      // positive deltas
      heatmapWeight.push((plusMinusDelta / 2));
      heatmapWeight.push(0.5);
      heatmapColor.push((plusMinusDelta / 2));
      heatmapColor.push('#abd9e9'); // light blue

      heatmapWeight.push(plusMinusDelta);
      heatmapWeight.push(1);
      heatmapColor.push(plusMinusDelta);
      heatmapColor.push('#2c7bb6'); // dark blue
    }

    const updatedHeatmapPaint = {
      ...HEAT_MAP_BASE,
      'heatmap-weight': heatmapWeight,
      'heatmap-color': heatmapColor
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
        f => f.layer.id === "point_layer"
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

  render() {
    return (
      <div style={{ height: '100%' }}>
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
            <div>
              <Source id="lagoon_data" geoJsonSource={this.state.lagoonGeoJson} />
              <Layer
                id="heatmap_layer"
                type="heatmap"
                paint={this.state.heatLayerPaint}
                sourceId="lagoon_data"
              />
              <Layer
                id="point_layer"
                type="circle"
                paint={this.state.pointLayerPaint}
                sourceId="lagoon_data"
              />
            </div>
          }
        </Map>

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
