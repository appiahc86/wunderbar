<script setup>
import Menu from "@/components/menu/Menu.vue";
</script>

<template>
  <div class="card shadow mb-4 d-flex">
    <div class="banner" style="background-image: url('/img/271_italian_pizza_107.webp')">  </div>
    <div class="px-2 px-lg-5">

      <p class="mt-3">
        <span class="pi pi-clock"></span>&nbsp;
        <small>Lieferung ab 14:00</small>

        <span class="d-none d-md-inline">
                   <span class=""> &#10038;</span>
                <span class=""> &#127949; <small>3.00 €&nbsp;</small></span>
                </span>

      </p>

    </div>

<!--    Menu   -->
    <div class="d-lg-none mb-2"><Menu /></div>


  </div>
</template>

<style scoped>
.banner{
  height: 12em;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  //background-image: url("../../../public/img/271_italian_pizza_107.webp");
}

@media screen and (min-width: 800px) {
  .banner{
    height: 20em;
  }
}
</style>