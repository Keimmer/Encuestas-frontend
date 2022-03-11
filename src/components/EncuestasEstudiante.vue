<template lang="">
<div class="container">
    <h3>Bienvenido/a {{users.currentUser[0].nombres}}, estas son las encuestas que usted puede contestar.</h3>
    <div class="tarjetas-encuestas">
        <div class="tarjeta-encuesta" v-for="(encuesta, index) in users.currentUser.encuestas" :key="index">
            <div class="text">
            <h5>
                Encuesta para promediar el desempeño del profesor/a {{encuesta.profesor[0].apellidos}} {{encuesta.profesor[0].nombres}}
            </h5>
            <h6>Materia: {{encuesta.profesor[0].nombre_materia}}</h6>

            </div>
            <button class="btn" style="align-self:flex-start;" @click="RedirectToSurvey(encuesta.id)">Contestar</button>
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

    },
    created() {
        console.log(this.users.currentUser)
    },
    methods: {
        RedirectToSurvey(id){
            this.$router.push({path: '/encuesta/'+ id + '/responder'});
        }
    }
}
</script>

<style lang="">

</style>
