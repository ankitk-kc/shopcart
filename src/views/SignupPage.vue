<template>
    <div class="card p-3 mt-4 mx-auto" style="width: 30rem;">
        <h2>Sign up form</h2>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">User Name</label>
            <input type="text" class="form-control" v-model="user.username" id="exampleFormControlInput1" placeholder="Enter your user name">
            <p v-if="v$.username.$error" class="text-danger mt-3">{{v$.username.$errors[0].$message}}</p>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Password</label>
            <input type="password" v-model="user.password" class="form-control" id="exampleFormControlInput2">
            <p v-if="v$.password.$error" class="text-danger mt-3">{{v$.password.$errors[0].$message}}</p>
        </div>
        <button class="btn btn-primary" @click="handleSubmit">
            Submit
        </button>
    </div>
</template>
<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router'
import { required ,minLength,helpers} from '@vuelidate/validators'
import { defineComponent, onMounted, reactive } from 'vue';
import router from '@/router';

export default defineComponent({
    name: 'signupPage',
    setup(){
        const user= reactive({
            username:'',
            password:''
        })
        const rules = {
            username: { required },
            password: {
                minLength:minLength(8),required,containsPasswordRequirement:helpers.withMessage(()=>"password require an UpperCase,Lowercase,Number & symbol",(value:any)=>
                /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$#!%*?&])/.test(value.toString()))
            }, 
    }
    const v$ = useVuelidate(rules, user)

    onMounted(()=>{
        const getDetails=localStorage.getItem("user-info")
        if(getDetails) router.push({name:'loginPage'})
    })

    const handleSubmit= async() => {
            
            const isFormCorrect=await v$.value.$validate()
            if(!isFormCorrect) return
            localStorage.setItem('user-info',JSON.stringify(user))
            router.push({name:'loginPage'})
        }

    return { user, v$ ,handleSubmit}
    }

})
</script>