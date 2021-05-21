<template>
    <table>
        <tr>
            <h1 class="title">HUNT NV</h1>
        </tr>
        <tr>
            <label for="species" class="species_label">SPECIES</label>
            <select name="species" id="species_list">
                <option value="none">NONE</option>
                <option value="antelope">ANTELOPE</option>
                <option value="bighornSheep">BIGHORN SHEEP</option>
                <option value="elk">ELK</option>
                <option value="moutainGoat">MOUNTAIN GOAT</option>
            </select>
        </tr>
        <tr>
            <label for="weapon" class="weapon_label">WEAPON CLASS</label>
            <select name="weapon" id="weapon_list">
                <option value="none">NONE</option>
                <option value="archery">ARCHERY</option>
                <option value="rifle">RIFLE</option>
                <option value="muzzle-loader">MUZZLE LOADER</option>
                <option value="any">ANY</option>
            </select>
        </tr>
        <tr>
            <label for="success" class="success_label">HUNT SUCCESS</label>
            <input type="range">
        </tr>
    </table>
</template>

<style scoped>
h1, label {
    color: white;
}

.side-bar {
    background-color: black;
    height: 100%;
}

table {
    display: inline;
}

tr {
    display: grid;
    padding: 20px;
}

select {
    padding: 5%;
    border-radius: 3px;
}

label {
    padding-bottom: 5%;
}
</style>