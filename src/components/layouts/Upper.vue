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
      <span class="badge text-bg-secondary">Angebot</span>&nbsp;
      <span class="badge text-bg-secondary">Pizza</span>&nbsp;
      <span class="badge text-bg-secondary">Calzone</span>&nbsp;
      <span class="badge text-bg-secondary">Pizzabrötchen</span>&nbsp;
      <span class="badge text-bg-secondary">AngebotAngebot</span>&nbsp;
      <span class="badge text-bg-secondary">Alkoholfreie Getränke</span>&nbsp;
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