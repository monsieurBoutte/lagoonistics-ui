import React from "react";
import ReactMapboxGl, { Layer, Source } from "react-mapbox-gl";
import lagoonData from "../mock-data/lagoon-data.json";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGRvcmlhOTIxIiwiYSI6ImNqbzFyaTlyajBlcm8za3FpeXVobDhnOXQifQ.cCd_N_-DvB2yn4BOHmdWyQ",
  maxZoom: 16,
  minZoom: 4
});

const mapStyle = {
  display: "block",
  height: "700px"
};

const layerPaint = {
  "heatmap-weight": [
    "interpolate",
    ["linear"],
    ["get", "delta"],
    0,
    0,
    5,
    0.5,
    10,
    1
  ],
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  "heatmap-intensity": {
    stops: [[0, 0], [7, 1], [10, 2]]
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
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
  // Adjust the heatmap radius by zoom level
  "heatmap-radius": {
    stops: [[1, 20], [5, 100], [14, 160]]
  },
  "heatmap-opacity": {
    stops: [[1, 0.25], [7, 0.6], [12, 0.9], [14, 0]]
  }
};

const style = {
  dark: "mapbox://styles/mapbox/dark-v9",
  streets: "mapbox://styles/mapbox/streets-v9"
};

const lagoonFeatures = lagoonData.map((item, i) => {
  const delta = Math.floor(Math.random() * Math.floor(10));
  console.log({ delta });
  return {
    type: "Feature",
    properties: {
      delta
    },
    geometry: {
      type: "Point",
      coordinates: [item.lon, item.lat]
    }
  };
});

const lagoonGeoJson = {
  type: "geojson",
  data: {
    type: "FeatureCollection",
    features: lagoonFeatures
  }
};

export default class LagoonMap extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(map, event) {
    const features = map.queryRenderedFeatures(event.point);

    if (features && features.length) {
      const [featureClicked] = features.filter(f => f.layer.id === 'point_layer');

      if (featureClicked) {
        console.log(featureClicked.properties);
      }
    }
  }

  render() {
    return (
      <div>
        <Map
          style={style.dark}
          center={[-81.012788, 28.680166]}
          zoom={[6]}
          containerStyle={mapStyle}
          onClick={this.handleClick}
        >
          <Source id="lagoon_data" geoJsonSource={lagoonGeoJson} />

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
            paint={layerPaint}
            sourceId="lagoon_data"
          />

          <Layer
            id="point_layer"
            type="circle"
            paint={{
              "circle-radius": 4,
              "circle-color": [
                'case',
                ['>', ['get', 'delta'], 5],
                'red',
                'green'
              ],
              "circle-opacity": {
                stops: [[9, 0], [14, 1]]
              }
            }}
            sourceId="lagoon_data"
          />
        </Map>
      </div>
    );
  }
}
