import { createRouter, createWebHashHistory } from 'vue-router'
import CreatePollVue from '../components/CreatePoll.vue'
import ConfiguracionVue from '../views/Configuracion.vue'
import EncuestasVue from '../views/Encuestas.vue'
import Home from '../views/Home.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/encuestas',
        name: 'encuestas',
        component: EncuestasVue
    },
    {
        path: '/configuracion',
        name: 'configuracion',
        component: ConfiguracionVue
    },
    {
        path: '/crear-encuesta',
        name: 'Crear Encuesta',
        component: CreatePollVue
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router