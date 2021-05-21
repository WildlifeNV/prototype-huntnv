<template>
    <l-map 
      style="height: 100%; width: 100%"
      v-model:zoom="zoom" 
      :center="[38.6, -116.4194]">
    <l-tile-layer
      v-for="tileProvider in tileProviders"
      :key="tileProvider.name"
      :name="tileProvider.name"
      :visible="tileProvider.visible"
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
      layer-type="base"
    />
    <l-control 
      :position="'bottomright'" 
      class="custom-control"
      @click="showButton">
      <p>LAYERS</p>
    </l-control>
    <l-control 
      :position="'bottomright'" 
      class="custom-control" 
      v-if="isButtonVisible">
      <p>DETAILS</p>
    </l-control>
    <l-geo-json 
      :geojson="geojson" 
      :options="options"
    />
  </l-map>
</template>

<script>
// DON'T load Leaflet components here!
// Its CSS is needed though, if not imported elsewhere in your application.
import "leaflet/dist/leaflet.css"
import { LMap, LGeoJson, LTileLayer, LControl} from "@vue-leaflet/vue-leaflet";

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
    LTileLayer,
    LControl
  },
  data() {
    return {
        zoom: 7,
        geojson: null,
        tileProviders: tileProviders,
        isButtonVisible: false,
    };
  },
  async beforeMount() {
    // HERE is where to load Leaflet components!
    const baseURL = "/Game_Management_Units.geojson"
    const response = await fetch( baseURL );
    this.geojson = await response.json();
  },
  methods: {
    showButton() {
      if (this.isButtonVisible == false) {
        this.isButtonVisible = true
      } else {
        this.isButtonVisible = false
      }
    }
  },
  computed: {
    onEachFeature() {
      return (features, layer) => {
        layer.bindTooltip(features.properties.HUNTUNIT, {
          permanent: false,
          sticky: true
        })
      }
    },
    options() {
      return {
        onEachFeature: this.onEachFeature
      }
    }
  }
};
</script>

<style scoped>

.custom-control {
  color: #fff;
  background: rgb(15, 14, 14);
  padding: 0 0.5em;
  border: 1px solid rgb(15, 14, 14);
}

</style>