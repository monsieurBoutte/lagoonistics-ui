import React from "react";
import ReactMapboxGl, { Layer, Source } from "react-mapbox-gl";
// import lagoonData from "../mock-data/lagoon-data.json";
import axios from "axios";

const SENSOR_READING = "Temperature";

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
      lagoonGeoJson: null,
      pointLayerPaint: {
        "circle-radius": 6,
        "circle-color": ["case", [">", ["get", "delta"], 5], "red", "green"],
        "circle-opacity": {
          stops: [[9, 0], [14, 1]]
        }
      },
      heatLayerPaint: {
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["get", "delta"],
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
          stops: [[1, 0.25], [7, 0.6], [12, 0.9], [14, 0]]
        }
      }
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchSensorData().then(data => {
      const features = data.map(this.sensorToFeature);

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
  }

  sensorToFeature(sensor) {
    // TODO: get delta from sensor readings
    return {
      type: "Feature",
      properties: {
        delta: 5,
        sensorId: sensor.sensorId
      },
      geometry: {
        type: "Point",
        coordinates: [sensor.long, sensor.lat]
      }
    };
  }

  fetchSensorData() {
    return Promise.resolve([]);
    // return axios.get("http://50ef6569.ngrok.io/lobo").then(({ data }) => data);
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

  render() {
    return (
      <Map
        style={style.dark}
        center={[-81.012788, 28.680166]}
        zoom={[6]}
        containerStyle={mapStyle}
        onClick={this.handleClick}
      >
        <Source id="lagoon_data" geoJsonSource={this.state.lagoonGeoJson} />
        <Layer
          id="base_layer"
          type="heatmap"
          paint={{
            "heatmap-color": "#99d594",
            "heatmap-opacity": 0.1
          }}
        />
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
      </Map>
    );
  }
}
