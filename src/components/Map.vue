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
      class="custom-control-main"
      @click="showButton">
      <h1>HUNT NV</h1>
    </l-control>
    <l-control 
      :position="'bottomright'" 
      v-if="isButtonVisible">
      <div class="select">
        <label class="select-label">SELECT A MANAGEMENT UNIT</label>
        <select id="manageunit_id" @change='filterSelect()'>
          <option value="1" >MANAGEMENT AREA 1</option>
          <option value="2" >MANAGEMENT AREA 2</option>
          <option value="3" >MANAGEMENT AREA 3</option>
          <option value="4" >MANAGEMENT AREA 4</option>
          <option value="5" >MANAGEMENT AREA 5</option>
          <option value="6" >MANAGEMENT AREA 6</option>
          <option value="7" >MANAGEMENT AREA 7</option>
          <option value="8" >MANAGEMENT AREA 8</option>
          <option value="9" >MANAGEMENT AREA 9</option>
          <option value="10" >MANAGEMENT AREA 10</option>
          <option value="11" >MANAGEMENT AREA 11</option>
          <option value="12" >MANAGEMENT AREA 12</option>
          <option value="13" >MANAGEMENT AREA 13</option>
          <option value="14" >MANAGEMENT AREA 14</option>
          <option value="15" >MANAGEMENT AREA 15</option>
          <option value="16" >MANAGEMENT AREA 16</option>
          <option value="17" >MANAGEMENT AREA 17</option>
          <option value="18" >MANAGEMENT AREA 18</option>
          <option value="19" >MANAGEMENT AREA 19</option>
          <option value="20" >MANAGEMENT AREA 20</option>
          <option value="21" >MANAGEMENT AREA 21</option>
          <option value="22" >MANAGEMENT AREA 22</option>
          <option value="23" >MANAGEMENT AREA 23</option>
          <option value="24" >MANAGEMENT AREA 24</option>
          <option value="25" >MANAGEMENT AREA 25</option>
          <option value="26" >MANAGEMENT AREA 26</option>
          <option value="27" >MANAGEMENT AREA 27</option>
          <option value="28" >MANAGEMENT AREA 28</option>
          <option value="29" >MANAGEMENT AREA 29</option>
        </select>
      </div>
    </l-control>
    <l-control 
      :position="'bottomright'" 
      class="custom-control" 
      v-if="isButtonVisible"
      @click="filterClosed">
      <p>CLOSE HUNTING AREAS</p>
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
        zoom: 6,
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
    filterSelect() {
      const choice = document.getElementById("manageunit_id").value;
      console.log(choice);

      var id;

      switch(choice) {
          case '1':
              id = 1
              break;
          case '2':
              id = 2
              break;
          case '3':
              id = 3
              break;
          case '4':
              id = 4
              break;
          case '5':
              id = 5
              break;
          case '6':
              id = 6
              break;
          case '7':
              id = 7
              break;
          case '8':
              id = 8
              break;
          case '9':
              id = 9
              break;
          case '10':
              id = 10
              break;
          case '11':
              id = 11
              break;
          case '12':
              id = 12
              break;
          case '13':
              id = 13
              break;
          case '14':
              id = 14
              break;
          case '15':
              id = 15
              break;
          case '16':
              id = 16
              break;
          case '17':
              id = 17
              break;
          case '18':
              id = 18
              break;
          case '19':
              id = 19
              break;
          case '20':
              id = 20
              break;
          case '21':
              id = 21
              break;
          case '22':
              id = 22
              break;
          case '23':
              id = 23
              break;
          case '24':
              id = 24
              break;
          case '25':
              id = 25
              break;
          case '26':
              id = 26
              break;
          case '27':
              id = 27
              break;
          case '28':
              id = 28
              break;
          case '29':
              id = 29
              break;
          default:
              id = 1
      }

      const baseURL = "/hunt-units.geojson"
      axios.get(baseURL)
        .then((response) => {
          // allows filtering of geojson
          const managementunit = id
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
    },
    filterClosed() {
      const baseURL = "/hunt-units.geojson"
      axios.get(baseURL)
        .then((response) => {
          const managementunit = 0
          const data = response.data.features.filter(features => features.properties.MANAGEUNIT === managementunit)
          console.log(response.data.features.filter(features => features.properties.MANAGEUNIT === managementunit))
          this.geojson = data
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

.custom-control-main {
  color: #fff;
  background: rgb(15, 14, 14);
  padding: 0 1em;
  border: 1px solid rgb(15, 14, 14);
  border-radius: 3px;
}

.custom-control {
  color: #fff;
  background: rgb(15, 14, 14);
  padding: 0 1em;
  border: 1px solid rgb(15, 14, 14);
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