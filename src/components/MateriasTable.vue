<template>
<div class="small-container">
    <table>

        <tr>
            <th>
                Profesor
            </th>
            <th style="width: 50%;">
                Materia
            </th>
            <th>
                Año
            </th>
        </tr>
        <tr v-for="(materia, index) in materias" :key="index">
            <td>{{materia.nombres}} {{materia.apellidos}}</td>
            <td>{{materia.nombre_materia}}</td>
            <td>{{materia.year}}</td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
    props: ['materias']
}
</script>

<style>
table{
    margin: 50px;
    padding: 10px;
}
td{
    text-align: left;
    margin: 10px;
    padding: 5px;
}
tr:nth-child(even) {
  background-color: #D6EEEE;
}
th{
    padding: 7px;
    background-color: #4287dc;
    text-align: left;
}
</style>
