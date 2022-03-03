<template>
<div class="container">
    <div v-if="noUser">
        <h3>Introduzca su cedula para verificar su existencia en el sistema</h3>
        <div class="form-container">
            <select v-model="nat" id="">
                <option value="V">V</option>
                <option value="E">E</option>
            </select>
            <input type="text" v-model="num" placeholder="Numero de cedula">
            <button @click="checkUser">OK</button>
        </div>
    </div>
    <div v-if="!noUser">
        <h3>Bienvenido user.name</h3>
        <h3>Estas son las encuestas que ud puede contestar</h3>
    </div>
</div>
</template>

<script>
const axios = require('axios')
export default {
    data() {
        return {
            noUser: true,
            nat: '', //nacionalidad
            num: '', //numero de cedula
        }
    },
    methods: {
        async checkUser() {
            let ci = nat + '-' + num; //acotamos la nacionalidad con el nro de cedula
            await axios.get()
        }
    }
}
</script>

<style lang="">

</style>
