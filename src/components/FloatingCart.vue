<script setup>
import {useCartStore} from "@/store/cart";
import {currency, formatNumber} from "@/functions";
import {useHomeStore} from "@/store/home";
import {useComponentStore} from "@/store/componentStore";
import {onBeforeRouteLeave, useRouter} from "vue-router";


const componentStore = useComponentStore();
const cartStore = useCartStore();
const router = useRouter()


//Increment
const increment = (data) => {
  cartStore.increment(data);
}

//decrement
const decrement = (data) => {
  cartStore.decremet(data);
  if (!cartStore.cart.length){
    componentStore.setDefaults()
  }
}

const goToCheckout = () => {
  componentStore.setDefaults();
  router.push({name: 'checkout'});
}

</script>

<template>

    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col">
          <h5 class="text-center fw-bold">Warenkorb</h5>
          <div class="container-fluid">

            <template v-for="(item, index) in cartStore.cart" :key="index">
              <div class="row" style="font-size: 0.8em">
                <div class="col-2"><b>{{ item.qty }}x</b></div>
                <div class="col">
                  <span class="text-capitalize">{{ item.name }} </span><br>
                  <small class="text-muted" v-if="item.selectedChoice">{{ item.selectedChoice }}</small>
                  <small class="text-light" v-else>.</small>
                </div>
                <div class="col" style="text-align: right;">
                  {{ formatNumber(item.price * item.qty) }} {{ currency }}
                </div>
              </div>
              <div class="row">
                <div class="col-2">
                  <img src="/img/minus.svg" style="cursor: pointer;" alt="minus-icon"
                       @click="decrement(item)">
                </div>
                <div class="col"></div>
                <div class="col" style="text-align: right;">
                  <img src="/img/plus.svg" style="cursor: pointer;" alt="plus-icon"
                       @click="increment(item)">
                </div>
              </div>
              <hr>

            </template>

            <br>
            <table class="table" style="font-size: 0.9em;">
              <tr>
                <td>Zwischensumme</td> <!-- Subtotal -->
                <td class="float-end">{{ formatNumber(cartStore.subTotal) }} {{ currency }}</td> <!-- Delivery cost -->
              </tr>

              <tr>
                <td>Lieferkosten</td> <!-- Delivery cost -->
                <td class="float-end">{{ formatNumber(cartStore.deliveryFee) }} {{ currency }}</td>
              </tr>

              <tr>
                <th>Gesamt</th> <!-- Total -->
                <td class="float-end fw-bold">{{ formatNumber(cartStore.total) }} {{ currency }}</td>
              </tr>

            </table>

            <div class="text-center">
              <button class="btn btn-primary" @click="goToCheckout">
                Zur Kasse gehen</button>
            </div>



          </div>

        </div>


      </div>
    </div>


</template>

<style scoped>

</style>