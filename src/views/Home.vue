<template>
<div class="container">
    <h3>EVALUACIÓN DEL DESEMPEÑO DOCENTE - AÑO ACADÉMICO 2022</h3>
    <h4>BIEVENIDOS AL PROCESO DE GESTION DE EVALUACIÓN DEL DESEMPEÑO DOCENTE DE LAS ACTIVIDADES EN LOS ENTORNOS VIRTUALES DE APRENDIZAJE Y PRESENCIALES EN EL AÑO ACADÉMICO 2022</h4>
    <div v-if="users.vModels.noUser" class="small-container">
        <h3>Introduzca su cedula para verificar su existencia en el sistema</h3>
        <div class="form-container">
            <select class="form-field" v-model="users.vModels.nat" id="">
                <option value="V">V</option>
                <option value="E">E</option>
            </select>
            <input class="form-field" type="text" v-model="users.vModels.num" placeholder="Numero de cedula">
            <input class="form-field" type="password" v-model="users.vModels.pass" placeholder="Contraseña">
            <button @click="users.methods.checkUser" class="btn-blue">OK</button>
        </div>
    </div>
    <div v-if="!users.vModels.noUser">
        <h3>Bienvenido {{users.currentUser.user.names}}</h3>
        <h3>Que accion desea realizar?</h3>
        <div class="button-row">
            <button class="btn">Responder Encuestas</button>
            <button class="btn">Ver Encuestas Pasadas</button>
        </div>

    </div>
</div>
</template>

<script>
import {
    inject
} from 'vue';

export default {

    data() {
        return {

        }
    },
    setup() {
        const users = inject('users');

        return {
            users
        }

    }

}
</script>
