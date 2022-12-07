<template>
  <div class="home">
    <SignupPage/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SignupPage from '@/views/SignupPage.vue'; 

export default defineComponent({
  name: 'HomeView',
  components: {
    SignupPage,
  },
});
</script>
