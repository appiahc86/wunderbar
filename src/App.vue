<script setup>
import { ref } from "vue";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

</script>

<template>

<AppHeader />

  <router-view></router-view>


<AppFooter />

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
