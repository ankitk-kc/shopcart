<template>
  <NavigationBar />
  <div class="w-full flex row mx-2">
    <div class="card m-3 " v-for="productDetail in productDetails" :key="productDetail.id" style="width: 16rem;">
      <img src="../assets/Default_Image_Thumbnail.png" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">{{ productDetail.name }}</h5>
        <p class="card-text">{{ productDetail.description }}</p>
        <p class="card-text">Price:${{ productDetail.price }}</p>
        <div class="flex row ">
          <a href="#" class="btn btn-primary" @click="addToCart(productDetail)">Add to Cart</a>
          <a href="#" class="wishlist btn btn-outline-danger"
            :class="[activeTab === productDetails.indexOf(productDetail) ? 'active' : undefined]"
            @click="activeButton(productDetail)">Add to Wishlist</a>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import NavigationBar from "@/components/NavigationBar.vue";
import product from "../types/product"
import router from '@/router';
import { defineComponent, onMounted, ref } from 'vue';
import ProductList from "../assets/products.json";
export default defineComponent({
  components: {
    NavigationBar
  },
  setup() {
    onMounted(() => {
      const getDetails = localStorage.getItem("user-info")
      if (!getDetails) router.push({ name: 'home' })
    })


    const productDetails = ref<product[]>(ProductList)
    const cart = ref<product[]>([])
    const wishlist = ref<product[]>([])
    const activeTab = ref(0)

    const addToCart = (productDetail: product) => {

      if (cart.value.indexOf(productDetail) > -1) {
        productDetail["quantity"]?productDetail["quantity"] +=1:null;

      } else {
        productDetail["quantity"] = 1
        cart.value.push(productDetail)
      }
      localStorage.setItem('cart-item', JSON.stringify(cart.value))
    }


    function activeButton(arg: any) {
      let index = wishlist.value.indexOf(arg)
      activeTab.value = index;
      if (index > -1) {
        wishlist.value.splice(index, 1);


      } else {
        wishlist.value.push(arg)
      }
      localStorage.setItem('wishlist-item', JSON.stringify(wishlist.value))

      // let btns = document.querySelectorAll('.wishlist');
      // btns.forEach(filter => {
      //     filter.addEventListener('click', function () {
      //     console.log("call the function")
      //     btns.forEach(flt => flt.classList.remove('active'));
      //     filter.classList.add('active')      
      //     });
      // });
    }

    return { productDetails, addToCart, activeButton, activeTab }
  }
});
</script>
<style>
.active {
  background-color: brown;
}
</style>