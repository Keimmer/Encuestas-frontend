<template>
<div class="container">
    <h3>EVALUACIÓN DEL DESEMPEÑO DOCENTE - AÑO ACADÉMICO 2022</h3>
    <h4>BIEVENIDOS AL PROCESO DE GESTION DE EVALUACIÓN DEL DESEMPEÑO DOCENTE DE LAS ACTIVIDADES EN LOS ENTORNOS VIRTUALES DE APRENDIZAJE Y PRESENCIALES EN EL AÑO ACADÉMICO 2022</h4>
    <div class="small-container">
        <h3>Introduzca su cedula para verificar su existencia en el sistema</h3>
        <div class="form-container">
            <select class="form-field" v-model="estudiante.cedula" id="">
                <option value="V">V</option>
                <option value="E">E</option>
            </select>
            <input class="form-field" type="text" v-model="estudiante.cedula" placeholder="Numero de cedula">
            <!-- en caso de utilizar contraseña tenemos este campo -->
            <!-- <input class="form-field" type="password" v-model="users.vModels.pass" placeholder="Contraseña"> -->
            <button @click="EncontrarEstudiante" class="btn-blue">OK</button>
        </div>
    </div>
    <div>
        <h3>Bienvenido {{}}</h3>
        <h3>Que accion desea realizar?</h3>
        <div class="button-row">
            <button class="btn">Responder Encuestas</button>
            <button class="btn">Ver Encuestas Pasadas</button>
        </div>

    </div>
</div>
</template>

<script>
const axios = require('axios')
import {
    inject
} from 'vue';

export default {

    data() {
        return {
            estudiante: {
                cedula: ''
            }
        }
    },
    setup() {
        const users = inject('users');


        return {
            users
        }

    },
    methods: {
        EncontrarEstudiante(){
            axios.get('http://localhost:8000/api/estudiantes/' + this.estudiante.cedula + '/encuestas')
            .then((response) => {
                this.users.currentUser = response.data
                console.log(response);
                this.$router.push({name: 'Encuestas Estudiante'});
            }).catch((e) => {
                console.log(e);
            })
        }
    },
}
</script>
