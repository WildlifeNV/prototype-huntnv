<template>
    <div style="display: inline-flex; height: 93%; width: 100%;">
        <Map style="height: 100%; width: 100%; border-radius: 5px; margin: 0 1%" />
    </div>
</template>

<script>
import Map from "./UnitDetailsMap.vue"

export default {
    components: {
        Map,
    }
}
</script>
