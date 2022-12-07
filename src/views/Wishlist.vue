<template>
    <NavigationBarVue/>
    <div>
        <h1>wishlist items:</h1>
        <div v-if="(wishlistItems.length>0)" class="w-full flex row mx-2">
            <div class="card m-3 " v-for="item in wishlistItems" :key="item.id" style="width: 14rem;">
            <button @click="removeItem(item)" type="button" class="btn-close" aria-label="Close"></button>
                <img src="../assets/Default_Image_Thumbnail.png" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <p class="card-text">{{ item.description }}</p>
                    <p class="card-text ">Price:${{ item.price}}</p>
                </div>
            </div>
        </div>
        <div v-else>
            <h3>Your wishlist is Empty</h3>
        </div>
    </div>
</template>
<script lang="ts">
import NavigationBarVue from '@/components/NavigationBar.vue';
import product from '@/types/product';
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
    components:{
        NavigationBarVue
    },
    setup() {
        const wishlistItems = ref<product[]>([])
        onMounted(() => {
            wishlistItems.value = JSON.parse(localStorage.getItem('wishlist-item') || '[]')
        })
        const removeItem=(item:product)=>{
            var index=wishlistItems.value.indexOf(item)
            console.log(index)
            if(index>-1){
                wishlistItems.value.splice(index, 1);    
            }
            
            localStorage.setItem('wishlist-item',JSON.stringify(wishlistItems.value))
        }
        return { wishlistItems ,removeItem}
    }

})
</script>