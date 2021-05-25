<template>
    <l-map 
      style="height: 93%; width: 100%"
      v-model:zoom="zoom"
      :center="[38.6, -116.4194]">
    <TopoLayer />
    <!--<MapLeftList />-->
    <l-control 
      :position="'bottomright'" 
      class="custom-control-main"
      @click="showButton">
      <h1>HUNT NV</h1>
    </l-control>
    <l-control 
      :position="'bottomright'" 
      v-if="isButtonVisible"
      v-show="isQuotaVisible">
      <div class="select">
        <label class="select-label">DESIRED DRAW ODDS: <b>{{ quota }}%</b></label>
        <input type="range" max="100" min="1" step="1" v-model="quota" @change='filterQuota()' id="quota">
      </div>
    </l-control>
     <l-control 
      :position="'bottomright'" 
      v-if="isButtonVisible"
      v-show="isWeaponVisible">
      <div class="select">
        <label class="select-label">SELECT A WEAPON CLASS</label>
        <select id="weapon" @change='filterWeapon()' >
          <option value="none">None</option>
          <option value="archery" >ARCHERY</option>
          <option value="muzzleLoader" >MUZZLE LOADER</option>
          <option value="rifle" >RIFLE</option>
          <option value="anyWeapone" >ANY LEGAL WEAPON</option>
        </select>
      </div>
    </l-control>
    <l-control 
      :position="'bottomright'" 
      v-if="isButtonVisible">
      <div class="select">
        <label class="select-label">SELECT A SPECIES</label>
        <select id="species" @change='filterSpecies()' >
          <option value="none">None</option>
          <option value="bear" >AMERICAN BLACK BEAR</option>
          <option value="antelope" >ANTELOPE</option>
          <option value="sheep" >BIGHORN SHEEP</option>
          <option value="elk" >ELK</option>
          <option value="goat" >MOUNTAIN GOAT</option>
          <option value="lion" >MOUNTAIN LION</option>
        </select>
      </div>
    </l-control>
    <l-control 
      :position="'bottomright'" 
      v-if="isButtonVisible">
      <div class="select">
        <label class="select-label">SELECT A MANAGEMENT UNIT</label>
        <select id="manageunit_id" @change='filterSelect()'>
          <option value="none">ALL MANAGEMENT AREAS</option>
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
      <p>CLOSED HUNTING AREAS</p>
    </l-control>
    <l-control 
      :position="'bottomright'" 
      class="custom-control" 
      v-if="isButtonVisible"
      @click="filterRegion">
      <p>NDOW REGIONS</p>
    </l-control>
    <l-control 
      :position="'bottomright'" 
      class="custom-control" 
      v-if="isButtonVisible"
      @click="filterCounty">
      <p>NEVADA COUNTIES</p>
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
      :options-style="styleFunction"
      @click="details"
    />
  </l-map>
</template>

<script>
// DON'T load Leaflet components here!
// Its CSS is needed though, if not imported elsewhere in your application.
import "leaflet/dist/leaflet.css"
import { LMap, LGeoJson, LControl} from "@vue-leaflet/vue-leaflet";
import axios from "axios"

import MapLeftList from "./MapLeftList.vue"
import TopoLayer from "./layers/TopoLayer.vue"

export default {
  components: {
    LMap,
    LGeoJson,
    LControl,
    MapLeftList,
    TopoLayer
  },
  data() {
    return {
        zoom: 6,
        geojson: null,
        isButtonVisible: false,
        quota: 50,
        premium: true,
    };
  },
  async beforeMount() {
    // HERE is where to load Leaflet components!
    const baseURL = "/hunt_unit_antelope.json"
    await axios.get(baseURL)
      .then((response) => {
        this.geojson = response.data.features
      }
    )
  },
  methods: {
    details () {

    },
    showButton() {
      if (this.isButtonVisible == false) {
        this.isButtonVisible = true
      } else {
        this.isButtonVisible = false
      }
    },
    filterWeapon(weapon_id) {
      const species_id = document.getElementById("species").value;
      const weapon = document.getElementById("weapon").value;

      var weapon_id

      switch (weapon) {
        case 'archery':
          weapon_id = 1
          break;
        default:
          break;
      }
      const baseURL = "/hunt_unit_antelope.json"
      axios.get(baseURL)
        .then((response) => {
          const weapon = weapon_id
          if (weapon === 1) {
            const data = response.data.features.filter(features => ((features.properties.ARCHERY === weapon_id) && (features.properties.ANTELOPE === weapon_id)))
            this.geojson = data
            this.isQuotaVisible = true
          }
        }
      )
    },
    filterQuota() {
      const quota = document.getElementById("quota").value;
      const baseURL = "/hunt_unit_antelope.json"
      axios.get(baseURL)
        .then((response) => {
          const data = response.data.features.filter(features => ((features.properties.ARCHERY === 1) && (features.properties.ANTELOPE === 1) && (features.properties.QUOTA < quota)))
          this.geojson = data
          this.isQuotaVisible = true
        }
      )
    },
    filterSpecies(species_id) {
      const species = document.getElementById("species").value;

      var species_id

      switch (species) {
        case 'none':
          species_id = 0
          break;
        case 'antelope':
          species_id = 1
          break;
      
        default:
          break;
      }
      const baseURL = "/hunt_unit_antelope.json"
      axios.get(baseURL)
        .then((response) => {
          const species = species_id
          if (species === 1) {
            const data = response.data.features.filter(features => features.properties.ANTELOPE === species_id)
            this.geojson = data
            this.isWeaponVisible = true
          } else {
            this.isWeaponVisible = false
            this.isQuotaVisible = false
            const baseURL = "/hunt_unit_antelope.json"
            axios.get(baseURL)
              .then((response) => {
                this.geojson = response.data.features
              }
            )
          }
        }
      )
    },
    filterSelect() {
      const choice = document.getElementById("manageunit_id").value;
      console.log(choice);

      var id;

      switch(choice) {
          case 'none':
              id = 0
              break;
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
              id = none
      }

      const baseURL = "/hunt_unit_antelope.json"
      axios.get(baseURL)
        .then((response) => {
          // allows filtering of geojson
          console.log(id)
          if (id === 0) {
              this.geojson = response.data.features
          } else {
            const managementunit = id
            const data = response.data.features.filter(features => features.properties.MANAGEUNIT === managementunit)
            console.log(response.data.features.filter(features => features.properties.MANAGEUNIT === managementunit))
            this.geojson = data
          }
        }
      )
    },
    filterDefualt() {
      const baseURL = "/hunt_unit_antelope.json"
      axios.get(baseURL)
        .then((response) => {
          this.geojson = response.data.features
        }
      )
    },
    filterClosed() {
      const baseURL = "/hunt_unit_antelope.json"
      axios.get(baseURL)
        .then((response) => {
          const managementunit = 0
          const data = response.data.features.filter(features => features.properties.MANAGEUNIT === managementunit)
          console.log(response.data.features.filter(features => features.properties.MANAGEUNIT === managementunit))
          this.geojson = data
        }
      )
    },
    filterRegion() {
      const baseURL = "https://pg-featureserv-g4n63.ondigitalocean.app/collections/boundaries.ndow_regions/items.json"
      axios.get(baseURL)
        .then((response) => {
          this.geojson = response.data.features
        }
      )
    },
    filterCounty() {
      const baseURL = "https://pg-featureserv-g4n63.ondigitalocean.app/collections/boundaries.nv_counties/items.json?limit=50"
      axios.get(baseURL)
        .then((response) => {
          this.geojson = response.data.features
        }
      )
    }
  },
  computed: {
  
    styleFunction () {
      return () => {
        this.setStyle({
          'weight': '1px',
        })
      };
    },
    onEachFeature() {
      return (features, layer) => {
        const huntUnitContent = "<p><b>UNIT: </b>" + "<b>" + features.properties.HUNTUNIT + "</b>";
        
        const huntUnitDetails = "<h1><b> HUNT UNIT " + features.properties.HUNTUNIT + "</b></h1>" +
                "<p>MANAGEMENT AREA: " + features.properties.MANAGEUNIT + "</p>" +
                "<a><b>Hunt Unit Details</b></a>" +
                "<p>ACRES: " + features.properties.ACRES + "</p>" +
                "<p>ACRES PUBLIC: " + (features.properties.ACRES*0.80) + " (" + (((features.properties.ACRES*0.80)/(features.properties.ACRES))*100) + "%)" + "</p>" +
                "<p>DESCRIPTION: This unit has lots of opportunities for camping and fishing around common hunting areas. This unit is slightly forested with large and deep valleys throughout.</p>";

        const closedUnitContent ="<p><b> NAME: </b>" + features.properties.CLOSED + "<br>" + "<p><b> STATUS: </b>" + features.properties.SYMBOL;

        const countyContent ="<p><b> NAME: </b>" + features.properties.cntyname;

        const regionContent ="<p><b> NAME: </b>" + features.properties.region;

        const closedDetails = "<h1><b>" + features.properties.CLOSED + "</b></h1>" +
                "<p>ACRES: " + features.properties.ACRES + "</p>";

        if (features.properties.HUNTUNIT === null) {
          layer.bindTooltip(closedUnitContent, {
            permanent: false,
            sticky: true
          });
        }  else if (features.properties.HUNTUNIT != null) {
          layer.bindTooltip(huntUnitContent, {
            permanent: false,
            sticky: true
          });
          layer.bindPopup(huntUnitDetails, {
            permanent: false,
            sticky: true
          });
        } else if (features.properties.cntyname != null) {
          layer.bindTooltip(countyContent, {
            permanent: false,
            sticky: true
          });
        } else if (features.properties.region != null) {
          layer.bindTooltip(regionContent, {
            permanent: false,
            sticky: true
          });
        }

        //make sure that weight is set to number or geojson will disappear
        layer.on('mouseover', function () {
          this.setStyle({
            'weight': '6',
            'color': 'black',
          })
        });

        layer.on('mouseout', function () {
          this.setStyle({
            'weight': '3',
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