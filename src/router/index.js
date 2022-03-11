import { createRouter, createWebHashHistory } from 'vue-router'
import CreatePollVue from '../components/CreatePoll.vue'
import EncuestasEstudianteVue from '../components/EncuestasEstudiante.vue'
import ResponderEncuestaVue from '../components/ResponderEncuesta.vue'
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
    },
    {
        path: '/encuestas-estudiante',
        name: 'Encuestas Estudiante',
        component: EncuestasEstudianteVue,
    },
    {
        path: '/encuesta/:id/responder',
        name: 'Responder Encuesta',
        component: ResponderEncuestaVue,
        params: true
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router