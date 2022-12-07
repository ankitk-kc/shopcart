<template>
    <nav class="navbar bg-light">
        <div class="container-fluid">
            <a class="navbar-link"><router-link to="./addtocart"> Add To Cart
                </router-link>
            </a>
            <a class="navbar-link"><router-link to="./wishlist">Wish List
                </router-link>
            </a>
            <button @click="Logout" class="btn btn-outline-success me-2" type="button">Logout</button>
        </div>
    </nav>
</template>
<script lang="ts">
import router from '@/router';
import { defineComponent } from 'vue';

export default defineComponent({
    setup(){
        const Logout=()=>{
        localStorage.clear();
        // localStorage.removeItem('user-info');
        router.push({name:'home'})
    }
    return{Logout}
    }
    
})
</script>