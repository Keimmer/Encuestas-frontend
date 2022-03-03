<template lang="">
<div class="container">    
    <div v-if="!users.vModels.noUser && users.state.action == null">
        <h3>Bienvenido {{users.currentUser.user.names}}</h3>
        <h3>Que accion desea realizar?</h3>
        <div class="button-row">
            <button class="btn">Crear Cuestionario</button>
            <button class="btn">Modificar Cuestionarios</button>
            <button class="btn">Eliminar/Deshabilitar Cuestionarios</button>
        </div>
    </div>
    
<CreatePoll/>
</div>
</template>

<script>
import {
    inject
} from 'vue';
import CreatePoll from '@/components/CreatePoll.vue';

export default {
    components: {
        CreatePoll
    },
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
