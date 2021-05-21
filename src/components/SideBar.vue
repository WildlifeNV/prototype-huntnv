<template>
    <div class="side-bar" style="width:25%">
        <table>
        <tr>
            <th></th>
            <th><h2>HUNT NV</h2></th>
        </tr>
        </table>
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
        <tr>
            <td><input type="checkbox"></td>
            <td id="label">MOUNTAIN LION</td>
        </tr>
        <tr>
            <td><input type="checkbox"></td>
            <td id="label">ELK</td>
        </tr>
        </table>
        <table>
        <tr>
            <th></th>
            <th>WEAPON CLASS</th>
        </tr>
        <tr>
            <td><input type="checkbox"></td>
            <td id="label">ARCHERY</td>
        </tr>
        <tr>
            <td><input type="checkbox"></td>
            <td id="label">RIFLE</td>
        </tr>
        <tr>
            <td><input type="checkbox"></td>
            <td id="label">MUZZLE LOADER</td>
        </tr>
        </table>
        <table>
        <tr>
            <th></th>
            <th>QUOTA</th>
        </tr>
        <tr>
            <td></td>
            <td><input type="range"></td>
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

th {
    font-size: 25px;
}

ul {
    list-style-type: none;
}

table {
    width: 100%;
}

.side-bar {
    background-color: black;
    height: 100%;
    opacity: 80%;
}
</style>