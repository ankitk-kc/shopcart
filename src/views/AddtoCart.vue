<template>
    <NavigationBarVue/>
    <div class="m-3">
        <h1 class="mt-3">Cart items:</h1>
        <!-- <div v-if="showCart"> -->
        <div v-if="(inCartItem.length>0)">
            <div v-for="product in inCartItem" :key="product.id" class="card-body m-3" style="width: 14rem;">

                <img src="../assets/Default_Image_Thumbnail.png" class="card-img-top" alt="">
                <h5 class="card-title mt-2">{{ product.name }}</h5>
                <p class="card-text ">Price:${{ product.price}}</p>
                <h5 class="card-title">total Price:${{product.quantity? product.price*product.quantity:product.price}}</h5>
                <div class="card-body">
                    <p>
                        <span class="btn btn-primary m-3" @click="reduceQunatity(product)">-</span><span>{{ product.quantity }}</span> 
                        <span class="btn btn-primary m-3" @click="addQuantity(product)">+</span>
                    </p>
                </div>

            </div>
            <div>
                <h1>Total price to pay:${{getTotalSum}}</h1>
            </div>
        </div>


        <!-- </div> -->
        <div v-else>
            <h4>Your cart is empty</h4>
        </div>
    </div>
</template>

<script lang="ts">
import NavigationBarVue from '@/components/NavigationBar.vue';
import product from '@/types/product';
import { computed } from '@vue/reactivity';
import { defineComponent, onMounted, ref, watch } from 'vue';
export default defineComponent({
    components:{
        NavigationBarVue
    },
    setup() {
        var inCartItem = ref<product[]>([])

        onMounted(() => {
            inCartItem.value = JSON.parse(localStorage.getItem('cart-item') || '[]')
        })
       const getTotalSum=computed(()=>{
            
            return inCartItem.value.reduce((totalSum:any,item:product)=>{
               if(item.quantity){
                return totalSum+(item.quantity*item.price)
               }
            //    else{
            //     return totalSum+item.price
            //    }
            },0)

        })
        const reduceQunatity = (item: product) => {
            item['quantity']?item['quantity']-=1:null
            const idx=inCartItem.value.indexOf(item)
            if(item['quantity']==0){
                inCartItem.value.splice(idx,1)  
            }
            localStorage.setItem('cart-item', JSON.stringify(inCartItem.value))
        }

        const addQuantity = (item: product) => {
            item['quantity']?item['quantity']+=1:null
            localStorage.setItem('cart-item', JSON.stringify(inCartItem.value))
        }
        return {  inCartItem,reduceQunatity,addQuantity,getTotalSum}
    }
})
</script>
