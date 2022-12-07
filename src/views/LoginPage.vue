<template>
   
    <div class="card p-3 mt-4 mx-auto" style="width: 30rem;">
      <h1>login form</h1>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Enter Username</label>
            <input type="text" class="form-control" v-model="userInfo.username" id="exampleFormControlInput1" placeholder="Enter your user name">    
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Enter Password</label>
            <input type="password" v-model="userInfo.password" class="form-control" id="exampleFormControlInput2">
        </div>
        <button class="btn btn-primary" @click="handleLogin">
            LogIn
        </button>
    </div>
  </template>
  <script lang="ts">
  import { useRouter } from 'vue-router'
  import { defineComponent, onMounted, reactive } from 'vue';
import router from '@/router';
 
   export default defineComponent({
     name:'loginPage',
     setup(){
      onMounted(()=>{
        const getDetails=localStorage.getItem("user-info")
        if(!getDetails) router.push({name:'home'})
      })
       const userInfo=reactive({
         username:'',
         password:''
       })
       const handleLogin=()=>{
        let user=JSON.parse(localStorage.getItem('user-info') || '{}')
        if(userInfo.username=== user.username && userInfo.password===user.password){
           router.push({name:'productlistPage'})
       }else{
        alert('Wrong Credentials')
       }
     }

     return{userInfo,handleLogin}
    }
 
   })
 </script>