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
      <h3>MANAGEMENT AREAS</h3>
    </l-control>
    <l-control 
      :position="'bottomright'" 
      class="custom-control" 
      v-if="isButtonVisible"
      @click="filterArea10">
      <p>MANAGEMENT AREA 10</p>
    </l-control>
    <l-control 
      :position="'bottomright'" 
      class="custom-control" 
      v-if="isButtonVisible"
      @click="filterArea12">
      <p>MANAGEMENT AREA 20</p>
    </l-control>
    <l-control 
      :position="'bottomright'" 
      class="custom-control" 
      v-if="isButtonVisible"
      @click="filterDefualt">
      <p>ALL UNITS</p>
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
import axios from "axios"

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
    const baseURL = "/hunt-units.geojson"
    await axios.get(baseURL)
      .then((response) => {
        this.geojson = response.data.features
      }
    )
  },
  methods: {
    showButton() {
      if (this.isButtonVisible == false) {
        this.isButtonVisible = true
      } else {
        this.isButtonVisible = false
      }
    },
    filterArea10() {
      const baseURL = "/hunt-units.geojson"
      axios.get(baseURL)
        .then((response) => {
          // allows filtering of geojson
          const managementunit = 10
          const data = response.data.features.filter(features => features.properties.MANAGEUNIT === managementunit)
          console.log(response.data.features.filter(features => features.properties.MANAGEUNIT === managementunit))
          this.geojson = data
        }
      )
    },
    filterArea12() {
      const baseURL = "/hunt-units.geojson"
      axios.get(baseURL)
        .then((response) => {
          // allows filtering of geojson
          const managementunit = 20
          const data = response.data.features.filter(features => features.properties.MANAGEUNIT === managementunit)
          console.log(response.data.features.filter(features => features.properties.MANAGEUNIT === managementunit))
          this.geojson = data
        }
      )
    },
    filterDefualt() {
      const baseURL = "/hunt-units.geojson"
      axios.get(baseURL)
        .then((response) => {
          this.geojson = response.data.features
        }
      )
    }
  },
  computed: {
    onEachFeature() {
      return (features, layer) => {
        const huntUnitContent = "<p><b> HUNT UNIT </b>" + "<b>" + features.properties.HUNTUNIT + "</b>" + 
                "</br>" + "<p>MANAGEMENT AREA: " + features.properties.MANAGEUNIT +
                "</br>" + "<p>ACRES: " + features.properties.ACRES;

        const closedUnitContent = "<p><b> STATUS: </b>" + features.properties.SYMBOL + 
                "</br>" + "<p><b> NAME: </b>" + features.properties.CLOSED;

        layer.bindTooltip(huntUnitContent, {
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