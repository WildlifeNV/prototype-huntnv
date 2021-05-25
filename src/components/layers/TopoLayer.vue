<template>
    <l-tile-layer
      v-for="tileProvider in tileProviders"
      :key="tileProvider.name"
      :name="tileProvider.name"
      :visible="tileProvider.visible"
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
      layer-type="base"
    />
</template>

<script>
import "leaflet/dist/leaflet.css"
import { LTileLayer } from "@vue-leaflet/vue-leaflet";

const tileProviders = [
  {
    name: 'Topo',
    visible: true,
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
  }
];

export default {
  components: {
    LTileLayer,
  },
  data() {
    return {
        tileProviders: tileProviders,
    };
  }
}

</script>
