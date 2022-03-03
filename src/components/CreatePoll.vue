<template>
<div>
    <div class="small-container">

        <h3>Crear Formulario de Encuesta</h3>
        <div class="form-container-col">
            <label>Seleccione una Mencion/Carrera</label>
            <select v-model="newEncuesta.mencion_id" @change="getYear(newEncuesta.mencion_id)">
                <option v-for="(mencion, index) in menciones" :key="index" :value="mencion.id">{{ mencion.nombre_mencion }}</option>
            </select>
            <label>Seleccione el año</label>
            <select v-model="newEncuesta.year" @change="getMateriasMencion(newEncuesta.mencion_id, newEncuesta.year)">
                <option v-for="(year, index) in añosMencion" :key="index" :value="year.year">{{ year.year }}</option>
            </select>
        </div>
        <MateriasTable :materias="materias" />
        <p>La encuesta se aplicara a todos los estudiantes que cursen las materias de los profesores que aparecen en la tabla</p>
    </div>
    <div class="small-container" style="margin-bottom: 50px;">

        <div class="questions" v-for="(newQuestion, index) in newQuestions" :key="index">
            <div class="form-sm-container" v-if="!newQuestion.saved">
                <h4>Introduce el titulo de la pregunta</h4>
                <input type="text" v-model="newQuestion.title" placeholder="Título">
                <h4>Opciones o respuestas de la pregunta</h4>
                <div class="question-radio" v-if="newOptions">
                    <div v-for="(option, index) in newOptions" :key="index">
                        <input class="form-field" type="text" :placeholder="'opción ' + (index + 1)" v-model="option.nombre">
                        <input style="inline: block; width: 30px;" class="form-field" type="text" :placeholder="'valor ' + (index + 1)" v-model="option.valor">
                    </div>

                </div>
                <div class="buttons-row">
                    <button @click="addOption(index)" style="margin-top:20px" class="btn-success sm" v-if="!newQuestion.saved">Agregar opcion</button>
                    <button @click="addOptionsTemplate(index)" class="btn-success sm" style="margin-top:20px;" v-if="!newQuestion.saved">Usar Plantilla</button>
                </div>
                <button @click="save(index)" style="margin-top:20px" class="btn-success" v-if="!newQuestion.saved">Guardar</button>
            </div>
            <div class="question-radio" v-if="newQuestion.saved">
                <h4>{{ newQuestion.title }}</h4>
                <div v-for="(options, index) in newQuestion.options" :key="index">
                    <input type="radio" :name="'radio'+ index" :id="'radio'+index">
                    <label :for="'radio'+index">{{ options.nombre }}</label>
                </div>
            </div>
            <button @click="erase(index)" class="btn-danger" v-if="newQuestion.saved">Eliminar</button>

        </div>
        <button @click="addInputs" class="btn" style="margin-top: 20px;">Agregar Pregunta</button>
        <h4>Todo Listo?</h4>
        <button @click="savePoll" class="btn-success">Guardar Cuestionario</button>
    </div>
</div>
</template>

<script>
const axios = require('axios')
import MateriasTable from './MateriasTable.vue'
import {
    inject
} from 'vue';
export default {
    components: {
        MateriasTable
    },
    data() {
        return {
            newEncuesta: {
                mencion_id: '',
                title: '',
                profesor_materia: '',
                newQuestions: [],
            },
            newQuestions: [],
            newQuestion: {
                type: '',
            },
            materias: '',
            añosMencion: '',
            menciones: '',
            newOptions: [],
        }
    },
    mounted() {
        this.getMenciones();
        console.log(this.materias);
    },
    methods: {
        addInputs() {
            this.newQuestions.push({
                title: '',
                type: '',
                saved: false,
            })
        },
        //metodos get, post de axios
        //metodo para obtener los años de la mencion seleccionada
        async getYear(mencion_id) {
            await axios.get('http://localhost:8000/api/mencion/' + mencion_id + '/años').then((response) => {
                this.añosMencion = response.data
            }).catch((e) => {
                console.log(e)
            })
        },
        //metodo para obtener todas las materias de la mencion seleccionada y del año con sus profesores
        async getMateriasMencion(mencion_id, year) {
            await axios.get('http://localhost:8000/api/mencion/' + mencion_id + '/año/' + year + '/materias').then((response) => {
                this.materias = response.data
            }).catch((e) => {
                console.log(e)
            })
            console.log(this.materias);

        },
        async getMenciones() {
            await axios.get('http://localhost:8000/api/menciones').then((response) => {
                this.menciones = response.data
            }).catch((e) => {
                console.log(e)
            })
        },
        save(index) {
            this.newQuestions[index].options = this.newOptions;
            this.newOptions = [];
            this.newQuestions[index].saved = true;
            console.log(this.newQuestions);
        },
        addOption(index) {
            this.newOptions.push({
                preguntaid: index,
                nombre: '',
                valor: '',
            })
        },
        addOptionsTemplate(index) {
            this.newOptions = [{
                    preguntaid: index,
                    nombre: 'Deficiente',
                    valor: '1',
                },
                {
                    preguntaid: index,
                    nombre: 'Regular',
                    valor: '2',
                },
                {
                    preguntaid: index,
                    nombre: 'Bueno',
                    valor: '3',
                },
                {
                    preguntaid: index,
                    nombre: 'Muy bueno',
                    valor: '4',
                },
                {
                    preguntaid: index,
                    nombre: 'Excelente',
                    valor: '5',
                },
            ]
        },
        erase(index) {
            this.newQuestions.splice(index, 1);
        },
        async savePoll() {
            this.newEncuesta.newQuestions = this.newQuestions;
            await axios.post('http://localhost:8000/api/encuesta/new', this.newEncuesta).then((response) => {
                console.log(response)
            }).catch((e) => {
                console.log(e)
            });
            console.log(this.newQuestions)
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
