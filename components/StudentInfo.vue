<template>
    <div>
        {{ student.name }}
        <img v-bind:src="student.photo">
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        props:{
            id: '',
        },
        data() {
            return {
                student: {},
            };
        },
        mounted: function(){
            axios.get('http://34.82.81.113:3000/students/'+this.id).then((response) => {
                console.log(response.data);
                this.student = response.data;
            });
        },  
    }
</script>