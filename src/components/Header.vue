<template>
<div>
    <div class="header">
        <div class="header-logo">
            <img src="@/assets/logo_ucat2.png" alt="">
        </div>
    </div>
    <div class="header-links">
        <router-link class="header-link" to="/">INICIO</router-link>
        <router-link class="header-link" to="/crear-encuesta">CREAR ENCUESTAS</router-link>
        <router-link class="header-link" to="/encuestas" v-if="users.currentUser.user.tipo == 'estudiante'">ENCUESTAS</router-link>
        <router-link class="header-link" to="/configuracion" style="margin-right: 170px;" v-if="users.currentUser.user.tipo == 'admin'">CONFIGURACIÓN</router-link>
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
<style lang="">
    
</style>