import { reactive } from 'vue'
const axios = require('axios')

const vModels = reactive({
    nat: '',
    num: '',
    pass: '',
    message: '',
    currentUser: '',
    noUser: true,
})

const users = reactive([{
        names: 'Keimmer Anthony',
        lastnames: 'Altuve Ardila',
        ci: 'V22760305',
        tipo: 'estudiante',
        pass: 'keimmer',
        materias: [{
                codigo: '394',
                nombre: 'Derecho Civil V (Familia y Sucesiones)',
                docente: 'Vivas Franco, Carmen Zenaida',
            },
            {
                codigo: '169',
                nombre: 'Derecho Colectivo del Trabajo y de la Seguridad Social',
                docente: 'Jaime Martínez, Héctor Armando',
            },
        ]
    },
    {
        names: 'Elijah Parra',
        lastnames: 'Altuve Ardila',
        ci: 'V22760315',
        tipo: 'admin',
        pass: 'keimmer',
        materias: [{
                codigo: '394',
                nombre: 'Derecho Civil V (Familia y Sucesiones)',
                docente: 'Vivas Franco, Carmen Zenaida',
            },
            {
                codigo: '169',
                nombre: 'Derecho Colectivo del Trabajo y de la Seguridad Social',
                docente: 'Jaime Martínez, Héctor Armando',
            },
        ]
    },
])

const state = reactive({
    action: null,
    selectedMat: '',
    questionTypes: [{
            id: 1,
            name: 'Calificacion 1-5'
        },
        {
            id: 2,
            name: 'Verdadero Falso'
        }
    ]
})

const methods = {
    checkUser() {
        let cedula = vModels.nat + vModels.num;
        users.forEach(user => {
            if (user.ci == cedula && user.pass == vModels.pass) {
                currentUser.user = user;
                vModels.noUser = false;
            }
        });
    },

}

const currentUser = reactive({
    user: '',
});

export default {
    users,
    methods,
    currentUser,
    vModels,
    state
}