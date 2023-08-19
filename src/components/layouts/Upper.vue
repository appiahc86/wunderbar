<script setup>
import {onMounted} from "vue";

onMounted(() => {

})
</script>

<template>
  <div class="card shadow mb-4 d-flex">
    <div class="banner" style="background-image: url('/img/271_italian_pizza_107.webp')">  </div>
    <div class="px-2 px-lg-5">
      <h4 translate="no" class="mt-3">Pizza Wunderbar</h4>
      <p>
        <span class="pi pi-clock"></span>&nbsp;
        <small>Lieferung ab 14:00</small>

        <span class="d-none d-md-inline">
                   <span class=""> &#10038;</span>
                <span class=""> &#127949; <small>3.00 €&nbsp;</small></span>
                <span class="pi pi-shopping-bag"></span>
                <span class=""><small>&nbsp;Min. 30.00 €</small></span>
                </span>

      </p>
      <p>
        <small>
          Bei diesem Restaurant kannst du Stempel sammeln. Stelle beim Bestellabschluss
          bitte sicher, dass du dich für unseren Newsletter angemeldet hast,
          um deine Stempel per E-Mail zu erhalten.
        </small>

      </p>
    </div>

<!--    Menu   -->
    <div class="d-inline d-lg-none px-2 mb-2">
      <small class="fw-bold"><mark>Angebot</mark></small>&nbsp;
      <small><mark>Pizza</mark></small>&nbsp;
      <small class="fw-bold"><mark>Calzone</mark></small>&nbsp;
      <small><mark>Pizzabrötchen</mark></small>&nbsp;
      <small class="fw-bold"><mark>Kinder Pizza</mark></small>&nbsp;
      <small><mark>Alkoholfreie Getränke</mark></small>&nbsp;
    </div>

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