<template>
    <div class="side-bar" style="width:25%">
        <h1>HUNT NV</h1>
        <table>
        <tr>
            <th></th>
            <th>SPECIES</th>
        </tr>
        <tr>
            <td><input type="checkbox"></td>
            <td id="label">MULE DEER</td>
        </tr>
        <tr>
            <td><input type="checkbox"></td>
            <td id="label">BIGHORN SHEEP</td>
        </tr>
        </table>
    </div>
</template>

<script>

</script>

<style scoped>
h1, h3, li, td, th {
    color: white;
}

.side-bar {
    background-color: black;
    height: 100%;
}

ul {
    list-style-type: none;
}

.species-label {
    margin-left: 5%;
}

table {
    width: 100%;
}
</style>