<template>
    <l-control 
        :position="'bottomleft'" 
        class="custom-control-list">
        <div>
            <h2 class="custom-control-list-item">HUNT UNIT DETAILS</h2>
            <h3><b>HUNT UNIT:</b> 010</h3>
            <p><b>ACRES:</b> 98765</p>
            <p><b>PUBLIC ACRES:</b> 65432 (80%)</p>
            <p><b>MANAGEMENT UNIT:</b> 4</p>
            <p><b>CLOSED:</b> No</p>
        </div>
    </l-control>
</template>

<script>
import "leaflet/dist/leaflet.css"
import { LControl} from "@vue-leaflet/vue-leaflet";

export default {
    components: {
        LControl
    }
}
</script>

<style scoped>
    .custom-control-list {
        color: #fff;
        background: rgb(15, 14, 14, 0.5);
        padding:  5px 20px;
        margin: 10px;
        border-radius: 3px;
    }
</style>

