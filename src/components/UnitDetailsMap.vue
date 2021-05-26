<template>
    <l-map 
      style="height: 93%; width: 100%"
      v-model:zoom="zoom" 
      :center="[38.73, -116.2]">
    <TopoLayer />
    <UnitDetailsList style="width: 30%;"/>
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
import { LMap, LGeoJson} from "@vue-leaflet/vue-leaflet";
import axios from "axios";

import UnitDetailsList from "./UnitDetailsList.vue";
import TopoLayer from "./layers/TopoLayer.vue"

export default {
  components: {
    LMap,
    LGeoJson,
    UnitDetailsList,
    TopoLayer
  },
  data() {
    return {
        zoom: 9,
        geojson: null,
    };
  },
  async beforeMount() {
    // HERE is where to load Leaflet components!
    const baseURL = "/hunt_unit_antelope.json"
    await axios.get(baseURL)
      .then((response) => {
        const data = response.data.features.filter(features => (features.properties.HUNTUNIT === '163'))
        this.geojson = data
      }
    )
  },
  methods: {},
  computed: {
    onEachFeature() {
      return (features, layer) => {
        const huntUnitContent = "<p><b>UNIT: </b>" + "<b>" + features.properties.HUNTUNIT + "</b>";

        layer.bindTooltip(huntUnitContent, {
          permanent: false,
          sticky: true
        });

        layer.on('mouseover', function () {
          this.setStyle({
            'weight': '6px',
            'color': 'black',
          })
        });

        layer.on('mouseout', function () {
          this.setStyle({
            'weight': '3px',
            'color': 'rgb(51, 136, 255)',
          })
        });
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

.custom-control-main {
  color: #fff;
  font-weight: bold;
  background: rgb(15, 14, 14);
  padding: 0 1em;
  border-radius: 3px;
}

.custom-control-main:hover {
  color: rgb(0, 0, 0);
  font-weight: bold;
  background: rgb(179, 172, 172);
  padding: 0 1em;
  border-radius: 3px;
}

.custom-control {
  color: #fff;
  font-weight: bold;
  background: rgb(15, 14, 14);
  padding: 0 1em;
  border-radius: 3px;
  opacity: 75%;
}

.custom-control:hover {
  color: rgb(0, 0, 0);
  font-weight: bold;
  background: rgb(179, 172, 172);
  padding: 0 1em;
  border-radius: 3px;
  opacity: 75%;
}

.leaflet-control {
  display: grid;
}

.select {
  background-color: black;
  display: grid;
  padding: 0 1em;
  padding: 10px;
  border-radius: 3px;
  opacity: 75%;
}

.select-label {
  color: #fff;
  padding-bottom: 10px;
}

</style>