<template>
    <l-map style="height:100vh"
        v-model:zoom="zoom" 
        :center="[38.8026, -116.4194]">
    <l-tile-layer
        v-for="tileProvider in tileProviders"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        layer-type="base"
    />
    <l-geo-json :geojson="geojson" :options="geojsonOptions" />
  </l-map>
</template>

<script>
// DON'T load Leaflet components here!
// Its CSS is needed though, if not imported elsewhere in your application.
import "leaflet/dist/leaflet.css"
import { LMap, LGeoJson, LTileLayer } from "@vue-leaflet/vue-leaflet";

const tileProviders = [
  {
    name: 'OpenStreetMap',
    visible: true,
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
];

export default {
  components: {
    LMap,
    LGeoJson,
    LTileLayer
  },
  data() {
    return {
        zoom: 7,
        geojson: {
            type: "FeatureCollection",
            features: [
            // ...
            ],
        },
        geojsonOptions: {
            // Options that don't rely on Leaflet methods.
        },
        tileProviders: tileProviders,
    };
  },
  async beforeMount() {
    // HERE is where to load Leaflet components!
    const { circleMarker } = await import("leaflet/dist/leaflet-src.esm");

    // And now the Leaflet circleMarker function can be used by the options:
    this.geojsonOptions.pointToLayer = (feature, latLng) =>
      circleMarker(latLng, { radius: 8 });
    this.mapIsReady = true;
  },
};
</script>