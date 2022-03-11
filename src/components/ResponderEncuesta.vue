<template lang="">
<div class="container">
    <div class="title">
        <h3>
            Encuesta para promediar el desempeño del profesor/a {{encuesta[0].apellidos}} {{encuesta[0].nombres}}
        </h3>
        <h3>
            Materia: {{encuesta[0].nombre_materia}}
        </h3>
    </div>
    <div class="formulario-responder">
        <h4>Preguntas</h4>
        <div class="pregunta" v-for="(pregunta, index) in encuesta.preguntas" :key="index">
            <h5>{{index + 1}}. {{pregunta.titulo}}</h5>
            <h5>Respuestas</h5>
            <div class="respuestas-cont">
                <div v-for="(respuesta, index) in pregunta.respuestas" :key="index" class="respuestas">
                    <div class="respuesta">{{respuesta.respuesta}}</div>
                    <div :class="{valor: !respuesta.pressed, 'valor-selected': respuesta.pressed}" @click="setPressed(respuesta, pregunta.respuestas)">
                        {{respuesta.valor}}
                    </div>
                </div>
            </div>
        </div>
        <button class="btn-success" @click="checkAndPost">Enviar Respuestas</button>
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
            encuestaId: '',
            encuesta: [
                0,                
            ],
            errors: [],
            respuestasEstudiante: {
                encuesta: [],
                estudiante: ''
            },
        }
    },
    setup() {
        const users = inject('users');


        return {
            users
        }

    },
    methods: {
        async GetEncuesta() {
            await axios.get('http://localhost:8000/api/encuesta/'+ this.encuestaId).then((response) => {
                console.log(response.data);
                this.encuesta = response.data
            }).catch((e) => {
                console.log(e)
            })
        },
        setPressed(respuesta, respuestas) {
            respuestas.forEach(resp => {
                resp.pressed = false
            });
            respuesta.pressed = true;
        },
        //funcion para enviar las respuestas
        async checkAndPost() {
            //antes de enviar cualquier solicitud validamos si estan todas las preguntas contestadas
            await this.checkErrors()
            if(this.errors.length == 0){
                this.respuestasEstudiante.encuesta = this.encuesta;
                //quitamos los datos innecesarios antes de enviar a el servidor
                await this.cleanRequest();
                await axios.post('http://localhost:8000/api/encuesta/guardar-respuestas', this.respuestasEstudiante).then((response) => {
                    console.log(response)
                }).catch ((e) => {
                    console.log(e)
                });    
            } else {
                console.log(this.errors)
            }
        },
        //funcion para verificar que cada pregunta tenga una respuesta seleccionada
        checkErrors() {
            this.errors = []
            this.encuesta.preguntas.forEach(pregunta => {
                let j = 0;
                pregunta.respuestas.every(respuesta => {
                    if (!respuesta.hasOwnProperty('pressed')) {
                        this.errors.push('error debe seleccionar una respuesta en la pregunta '+ pregunta.id)
                    } else if (respuesta.pressed == true && respuesta.hasOwnProperty('pressed')) {
                        return false
                    }
                    j++
                });
            });
            return
        },
        cleanRequest() {
            this.respuestasEstudiante.encuesta.preguntas.forEach(pregunta => {
                //aplicamos un filtro para qutar todas las respuestas que no fueron seleccionadas
                pregunta.respuestas = pregunta.respuestas.filter(item => item['pressed'] !== false);
            });
            console.log(this.respuestasEstudiante.encuesta.preguntas);
        }
    },
    computed: {
        
    },
    created() {
        this.encuestaId = this.$route.params.id
        this.GetEncuesta()
        if(!this.users.currentUser[0]) {
            this.$router.push({name: 'Home'});
        } else {
            this.respuestasEstudiante.estudiante = this.users.currentUser[0]
        }
    }


}
</script>

<style lang="">

</style>
