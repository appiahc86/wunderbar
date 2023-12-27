<script setup>
import AppHeader from "@/components/layouts/AppHeader.vue";
import AppFooter from "@/components/layouts/AppFooter.vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import FloatingCart from "@/components/FloatingCart.vue";
import Dialog from "primevue/dialog";
import {useComponentStore} from "@/store/componentStore";
import {useCartStore} from "@/store/cart";
import {useHomeStore} from "@/store/home";
import {useRoute} from "vue-router";

const route = useRoute()
const store = useHomeStore();
const componentStore = useComponentStore();
const cartStore = useCartStore();
window.toast = useToast();

store.loadMenu();


</script>

<template>

<AppHeader />

  <router-view></router-view>

<AppFooter />

  <button class="floating-button" v-if="cartStore.cart.length && route.name !== 'checkout'"
          @click="componentStore.cartDialog = true;">
    <span>
    <span class="pi pi-shopping-cart"></span>
      <sup class="text-light fw-bold">&nbsp;{{ cartStore.getLength }}</sup>
  </span>
  </button>

  <!--  Cart dialog-->
  <Dialog v-model:visible="componentStore.cartDialog" header="Warenkorb" :style="{width: '60vw'}"
          :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
          position="center" :modal="true">
    <FloatingCart />

  </Dialog>

  <Toast position="top-right" style="padding: 0;" class="my-toast"/>
</template>

<style scoped>
.logo {
  width: 5em;
}

.register-btn {
  font-size: 0.9em;
}
.register-btn:hover {
  background: #ccc !important;
}


@media screen and (max-width: 500px){
  .my-toast{
    font-size: 0.5em !important;
  }
}

@media screen and (max-width: 300px){
  .hide-on-sm{
    display: none;
  }
}


</style>
