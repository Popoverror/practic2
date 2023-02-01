
<template>

    
   <div id="app" class="light" v-bind:class="{dark: isDark}">
    <h1>Всього студентів: {{ studentsCount }}</h1>
    <br>
    <button v-on:click="changeTheme()">Change Theme</button>
    <br>
    <br>
    <input type="text" name="search" v-model="search"><br>
    <br>
		<table class="table table-dark">
			<tr v-for="item in students"  v-bind:key="item._id"> 
				<!-- <td>{{item.name}}</td> -->
                <td><router-link v-bind:to="'/student-info/'+item._id">{{item.name}}</router-link></td>
                <td><input type="checkbox" v-model="item.isDonePr"></td>
                <td>{{item.group}}</td>
                <td><a href = "#" @click="updateStudent(item._id)">Оновити</a></td>
                <td><a href = "#" @click="deleteStudent(item._id)">Видалити</a></td>
			</tr>
		</table>

			<input v-model="student.name">
			<input type="checkbox" v-model="student.isDonePr">
			<select v-model="student.group">
				<option value="RPZ 19 1/9">RPZ 19 1/9</option>
				<option value="RPZ 19 2/9">RPZ 19 2/9</option>
			</select>
			<button v-if="editId != -1" v-on:click="update2Student()">Update student</button>
            <button v-else v-on:click="addStudent()">Add student</button>
   </div>
</template>


<script>
import axios from 'axios'
import { VueElement } from 'vue';


export default {
    data() {
        return {
            students: [],
            search:'',
            student: {name: "", isDonePr: false, group: ""},
            editId: -1,
            isDark: null,
        }
    },
    mounted: function(){
        axios.get('http://34.82.81.113:3000/students').then((response) => {
            console.log(response.data);
            this.students = response.data;
            this.$store.commit('setCount', this.students.length);
            this.isDark = this.$store.getters.getTheme;
        });
    },
    methods: {
        deleteStudent(studId) {
            axios.delete("http://34.82.81.113:3000/students/" + studId)            
            .then(data => {
                console.log(data);
            })
        },
        updateStudent(studId) {
            this.editId = studId;
            this.student = this.students.find(item => item._id === this.editId);
        },
        update2Student() {
            let foundStudent = this.students.find((element) => {
                return element._id == this.editId;
            });

            axios.put("http://34.82.81.113:3000/students/" + this.editId, this.student)
            .then(data => {                
                console.log(data);
           })
           .catch(function (error) {
                console.log(error);
            });
            this.editId = -1;
        },
        addStudent() {
            this.students.push(this.student);

            axios.post("http://34.82.81.113:3000/students", this.student)
           .then(data => {                
                console.log(data);
           })
           .catch(function (error) {
                console.log(error);
            });         
        },
        changeTheme(){
            if(this.isDark === true) this.isDark = false;
            else this.isDark = true;
            this.$store.commit('changeTheme', this.isDark);
        },
    },
    computed: {
        studentsCount () {
            return this.$store.getters.getCount;
        },
        setTheme () {
            return this.$store.getters.getTheme;
        },
    },
}
 </script>

