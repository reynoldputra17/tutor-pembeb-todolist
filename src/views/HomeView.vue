<!-- <script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script> -->

<template>
  <div>
    <div style="background-color: white; color: black; width: 300px; padding:50px;">
      <h1>Input Task</h1>
      <label for="">Title :</label>
      <input type="text" v-model="newTask.title" ><br>
      <label for="">Description :</label>
      <input type="text" v-model="newTask.desc" ><br>
      <label>Date :</label>
      <input type="date" v-model="newTask.date" ><br>

      <div v-for="category in categories" :key="category.id" >
        <input type="checkbox" v-model="newTask.category" :value="category.id" > <label>{{ category.name }}</label><br>
      </div>

      <button @click="createTask" >
        Create
      </button>
    </div>

    <div v-show="isUpdate" style="background-color: white; color: black; width: 300px; padding:50px;">
      <h1>Update Task</h1>
      <label >Title :</label>
      <input type="text"  v-model="currentTask.title"><br>
      <label >Description :</label>
      <input type="text"  v-model="currentTask.desc "  ><br>
      <label>Date :</label>
      <input type="date" v-model="currentTask.date" ><br>

      <!-- <div>
        <input type="checkbox"> <label>Category 1</label><br>
      </div> -->

      <button @click="handleUpdate">
        Update
      </button>
    </div>

    <h1>Task List</h1>

    <div v-for="task in tasks" :key="task" class="card" style="margin-bottom: 10px; border: 1px solid; padding:50px;">
      <input type="checkbox">
      <h2>{{ task.title }}</h2>  
      <p>{{ task.desc }}</p>
      <p>{{ task.date }}</p>
      <div style="display:flex;">
        <p v-for="ctg in task.category" :key="ctg" style="margin-right: 5px;">{{ categories[ctg].name }} | </p> 
      </div>
      <div>
        <a style="margin-right: 20px" @click="deleteTask(task.id)" >Delete</a>
        <a @click="updateTask(task.id)" >Edit</a>
      </div>
    </div>

  </div>
</template>

<script>
import { db } from "../firebase.js"
import { collection, query , onSnapshot, addDoc, doc, deleteDoc, updateDoc  } from "firebase/firestore";
export default {
  data() {
    return {
      tasks: [],
      categories : [],
      newTask: {
        title: "",
        desc: "",
        date: "",
        status: false,
        category : []
      },
      currentTask: {
        id : "",
        title : "",
        date : "",
        desc : ""
      },
      isUpdate: false
    }
  },
  methods: {
    getTask() {
      const q = query(collection(db, "task"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const temp = [];
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            let id =  doc.id
            temp.push({id, ...data});
        });

        console.log(temp);
        this.tasks = temp;
      });
    },
    getCategory() {
            const q = query(collection(db, "category"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let temp = {};
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    let id =  doc.id
                    temp = {...temp, [id] : {id, ...data}};
                });
                console.log(temp);
                this.categories = temp;
                
            });
    },
    async createTask() {
      console.log(this.newTask)
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "task"), this.newTask);
      console.log("Document written with ID: ", docRef.id);
    },
    async deleteTask(id) {
      await deleteDoc(doc(db, "task", id));
    },
    updateTask(id) {
      console.log(id)
      this.tasks.forEach((task) => {
        if(task.id == id ){
          this.currentTask.id = id
          this.currentTask.title = task.title
          this.currentTask.desc = task.desc
          this.currentTask.date = task.date
        }
      })
      console.log(this.currentTask)
      this.isUpdate = true
    },
    async handleUpdate () {
     console.log(this.currentTask)
      await updateDoc(doc(db, "task", this.currentTask.id), this.currentTask);
    }
  },
  mounted() {
    this.getCategory()
    this.getTask()

  }
}

</script>
