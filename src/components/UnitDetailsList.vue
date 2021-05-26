<template>
    <l-control>
        <div>
            <div class="custom-control">
                <h1>UNIT 163</h1>
                <p><b>MANAGEMENT AREA:</b> 16</p>
            </div>
            <div class="custom-control">
                <p><b>ACRES:</b> 859693</p>
                <p><b>ACRES PUBLIC:</b> 123456 (80%)</p>
                <p><b>ACRES PRIVATE:</b> 1324 (20%)</p>
            </div>
            <div class="custom-control">
                <p><b>REASON FOR CLOSURE:</b> None</p>
                <p><b>NEAREST AIRPORT:</b> Reno (160 miles)</p>
                <p><b>TRAIL ACCESS:</b> 12345 (10%) <button @click="showTrail">INFO</button></p>
                <p v-show="isTrailVisible">All areas within 1 miles of defined trails</p>
                <p><b>ROAD ACCESS:</b> 54321 (40%) <button @click="showRoad">INFO</button></p>
                <p v-show="isRoadVisible">All areas within 2 miles of defined raods</p>
                <p><b>DESCRIPTION:</b> This unit has lots of opportunities for camping and fishing around common hunting areas. This unit is slightly forested with large and deep valleys throughout.</p>
            </div>
        </div>
    </l-control>
</template>
<script>
import "leaflet/dist/leaflet.css"
import { LControl} from "@vue-leaflet/vue-leaflet";

export default {
    components: {
        LControl
    },
    data() {
        return {
            isTrailVisible: false,
            isRoadVisible: false,
        };
    },
    methods: {
        showTrail() {
            if (this.isTrailVisible == false) {
                this.isTrailVisible = true
            } else {
                this.isTrailVisible = false
            }
        },
        showRoad() {
            if (this.isRoadVisible == false) {
                this.isRoadVisible = true
            } else {
                this.isRoadVisible = false
            }
        },
    }
}
</script>

<style scoped>
.custom-control {
  color: #fff;
  background: rgb(83, 80, 80, 0.75);
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 3px;
}
</style>