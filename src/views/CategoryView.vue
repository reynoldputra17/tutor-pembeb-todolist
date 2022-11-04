<template>
    <div>
        <div style="background-color: white; color: black; padding: 50px;">
            <h1>New Category</h1>
            <label for="">Category name : </label>
            <input type="text" v-model="newCtg" ><br>
            <button @click="createCategory" >Create</button>
        </div>

        <div v-show="isUpdate" style="background-color: white; color: black; padding: 50px;">
            <h1>Update Category</h1>
            <label for="">Category name : </label>
            <input type="text" v-model="currentCtg.name"><br>
            <button @click="handleUpdate">Update</button>
        </div>

        <h1>Category List</h1>
        <hr>
        <div v-for="category in categories" :key="category.id" class="card">
            <h3>{{ category.name }}</h3>
            <div>
                <a style="margin-right: 20px" @click="deleteCategory(category.id)">Delete</a>
                <a @click="updateCategory(category.id)">Edit</a>
            </div>
        </div>
    </div>
</template>

<script>
import { db } from "../firebase.js"
import { collection, query , onSnapshot, addDoc, doc, deleteDoc, updateDoc  } from "firebase/firestore";

export default {
    data () {
        return {
            categories : [],
            newCtg : "",
            currentCtg : {
                id : "",
                name : ""
            },
            isUpdate : false
        }
    },
    methods: {
        getCategory() {
            const q = query(collection(db, "category"));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const temp = [];
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    let id =  doc.id
                    temp.push({id, ...data});
                });
                console.log(temp);
                this.categories = temp;
            });
        },
        async createCategory() {
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "category"), { name : this.newCtg });
            console.log("Document written with ID: ", docRef.id);
        },
        async deleteCategory(id) {
            await deleteDoc(doc(db, "category", id));
        },
        updateCategory(id){
            this.isUpdate = true
            this.categories.forEach((category) => {
                if(category.id == id){
                    this.currentCtg.name = category.name
                    this.currentCtg.id = category.id
                }
            })
        },
        async handleUpdate(){
            await updateDoc(doc(db, "category", this.currentCtg.id), { name : this.currentCtg.name});
        }
    },
    mounted() {
        this.getCategory()
    }
}

</script>