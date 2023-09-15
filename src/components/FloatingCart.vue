<script setup>
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";
import {useCartStore} from "@/store/cart";
import {currency, formatNumber} from "@/functions";
import {onBeforeRouteLeave} from "vue-router";
import {onMounted, ref} from "vue";
import {useHomeStore} from "@/store/home";
import GoogleAddressAutocomplete from 'vue3-google-address-autocomplete'
import axios from "@/axios";
import {useComponentStore} from "@/store/componentStore";
import Dialog from "primevue/dialog";
// import { loadScript } from "vue-plugin-load-script";


const address = ref('');

const callbackFunction = (place) => {
  console.log(place);
}

const componentStore = useComponentStore();
const cartStore = useCartStore();
const store = useHomeStore();
const paymentMethod = ref('cash')
const loading = ref(false);

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

onBeforeRouteLeave(() => componentStore.setDefaults() )

function initMap() {

  let autocomplete = new google.maps.places.Autocomplete(
      document.querySelector("#autocomplete"),
      {
        types: ['establishment'],
        componentRestrictions: { country: "de" },
        fields: ["address_components", "geometry", "icon", "name"]
      }
  )


  autocomplete.addListener('place_changed', () => {
    let place = autocomplete.getPlace();
    if (!place.geometry){
      document.querySelector("#autocomplete").placeholder = "Enter Place"
    }else {
      console.log(place.name)
    }
  })

}

onMounted(() => {

})

const processOrder = async () => {
  try {
    loading.value = true;

    const response = await  axios.post('/orders/create',
        {
          cart: cartStore.cart,
          deliveryFee: cartStore.deliveryFee,
          paymentMethod: paymentMethod.value
        },
        {
          headers: {
            'Authorization': `Bearer ${store.user.token}`
          }
        }
    )

    if (response.status === 201){
      componentStore.setDefaults();
      cartStore.clearCart();
    }

  }catch (e) {
    if (e.response) return toast.add({severity:'warn', detail: `${e.response.data}`, life: 4000});
    if (e.request && e.request.status === 0) {
      return toast.add({severity:'error',
        detail: `Leider wurde die Verbindung zum Server abgelehnt. Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut`,
        life: 4000});
    }

    return toast.add({severity:'warn', detail: 'Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal',
      life: 4000});
  }finally {
    loading.value = false;
  }

} // ./process Order

</script>

<template>
  <button class="floating-button" @click="componentStore.cartDialog = true;">
    <span>
    <span class="pi pi-shopping-cart"></span>
      <sup class="text-light fw-bold">&nbsp;{{ cartStore.getLength }}</sup>
  </span>
  </button>

<!--  <div class="offcanvas offcanvas-bottom h-100" tabindex="-1" id="cartButton" aria-labelledby="offcanvasBottomLabel">-->
<!--    <div class="offcanvas-header text-center">-->
<!--      <h5 class="offcanvas-title" id="offcanvasBottomLabel"></h5>-->
<!--      <button type="button" class="btn-close" data-bs-dismiss="offcanvas"-->
<!--              aria-label="Close" id="close-button"></button>-->
<!--    </div>-->
<!--    <div class="offcanvas-body small">-->
<!--     <div class="container-fluid container-lg">-->
<!--       <div class="row justify-content-center">-->
<!--         <div class="col-lg-6">-->
<!--           <h5 class="text-center fw-bold">Deine Bestellung</h5>-->
<!--           <div class="container-fluid">-->

<!--             <template v-for="(item, index) in cartStore.cart" :key="index">-->
<!--               <div class="row">-->
<!--                 <div class="col-2"><b>{{ item.qty }}x</b></div>-->
<!--                 <div class="col">-->
<!--                   <span class="text-capitalize">{{ item.name }} </span><br>-->
<!--                   <small class="text-muted" v-if="item.selectedChoice">{{ item.selectedChoice }}</small>-->
<!--                   <small class="text-light" v-else>.</small>-->
<!--                 </div>-->
<!--                 <div class="col" style="text-align: right;">-->
<!--                   {{ formatNumber(item.price * item.qty) }} {{ currency }}-->
<!--                 </div>-->
<!--               </div>-->
<!--               <div class="row">-->
<!--                 <div class="col-2">-->
<!--                   <img src="/img/minus.svg" style="cursor: pointer;" alt="minus-icon"-->
<!--                         @click="decrement(item)">-->
<!--                 </div>-->
<!--                 <div class="col"></div>-->
<!--                 <div class="col" style="text-align: right;">-->
<!--                   <img src="/img/plus.svg" style="cursor: pointer;" alt="plus-icon"-->
<!--                   @click="increment(item)">-->
<!--                 </div>-->
<!--               </div>-->
<!--               <hr>-->
<!--             </template>-->



<!--           </div>-->

<!--         </div>-->

<!--&lt;!&ndash;     Payment and shipping address    &ndash;&gt;-->
<!--         <div class="col-lg-6">-->
<!--           <div class="text-center"> <small class="text-muted">Pay With</small></div>-->

<!--             <div class="d-flex justify-content-center mb-3">-->
<!--               <div class="d-flex flex-wrap gap-3">-->
<!--                 <div class="flex align-items-center">-->
<!--                   <RadioButton v-model="paymentMethod" inputId="p1" name="paymentMethod" value="cash" />-->
<!--                   <label for="p1" class="ms-1"> Cash</label>-->
<!--                 </div>-->
<!--                 <div class="flex align-items-center">-->
<!--                   <RadioButton v-model="paymentMethod" inputId="p2" name="paymentMethod" value="cc" />-->
<!--                   <label for="p2" class="ms-1"> Credit Card</label>-->
<!--                 </div>-->
<!--               </div>-->
<!--             </div>-->


<!--           <div class="text-center">-->
<!--             <small class="text-center text-muted">Delivery Address</small><br>-->
<!--             <input type="text" ref="address" id="autocomplete" class="mb-2 form-control shadow-none">-->
<!--             <textarea cols="10" rows="5" class="form-control shadow-none"></textarea>-->

<!--&lt;!&ndash;             <GoogleAddressAutocomplete&ndash;&gt;-->
<!--&lt;!&ndash;                 apiKey="AIzaSyCqHwzNQBLQ1SRJEtNQUly6dJV9qIaAZwg"&ndash;&gt;-->
<!--&lt;!&ndash;                 v-model="address"&ndash;&gt;-->
<!--&lt;!&ndash;                 @callback="callbackFunction"&ndash;&gt;-->
<!--&lt;!&ndash;                 class="form-control"&ndash;&gt;-->
<!--&lt;!&ndash;                 placeholder="placeholder if you wish"&ndash;&gt;-->
<!--&lt;!&ndash;             />&ndash;&gt;-->
<!--           </div>-->

<!--           <div class="text-center">-->
<!--             <Button label="Weitermachen" type="button" :loading="loading"-->
<!--                     class="p-button  p-button-rounded my-4 px-4 py-2"-->
<!--                @click="proccessOrder"/>-->
<!--           </div>-->


<!--         </div>-->


<!--       </div>-->
<!--     </div>-->
<!--    </div>-->
<!--  </div>-->

  <Dialog v-model:visible="componentStore.cartDialog" maximizable
          header="Warenkorb" :style="{ width: '100vw' }" maximize
          position="left" :modal="true">
    <div class="container-fluid container-lg">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <h5 class="text-center fw-bold">Deine Bestellung</h5>
          <div class="container-fluid">

            <template v-for="(item, index) in cartStore.cart" :key="index">
              <div class="row">
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


          </div>

        </div>

        <!--     Payment and shipping address    -->
        <div class="col-lg-6">
          <div class="text-center"> <small class="text-muted">Pay With</small></div>

          <div class="d-flex justify-content-center mb-3">
            <div class="d-flex flex-wrap gap-3">
              <div class="flex align-items-center">
                <RadioButton v-model="paymentMethod" inputId="p1" name="paymentMethod" value="cash" />
                <label for="p1" class="ms-1"> Cash</label>
              </div>
              <div class="flex align-items-center">
                <RadioButton v-model="paymentMethod" inputId="p2" name="paymentMethod" value="cc" />
                <label for="p2" class="ms-1"> Credit Card</label>
              </div>
            </div>
          </div>


          <div class="text-center">
            <small class="text-center text-muted">Delivery Address</small><br>
            <input type="text" ref="address" id="autocomplete" class="mb-2 form-control shadow-none">
            <textarea cols="10" rows="5" class="form-control shadow-none"></textarea>

            <!--             <GoogleAddressAutocomplete-->
            <!--                 apiKey="AIzaSyCqHwzNQBLQ1SRJEtNQUly6dJV9qIaAZwg"-->
            <!--                 v-model="address"-->
            <!--                 @callback="callbackFunction"-->
            <!--                 class="form-control"-->
            <!--                 placeholder="placeholder if you wish"-->
            <!--             />-->
          </div>

          <div class="text-center">
            <Button label="Weitermachen" type="button" :loading="loading"
                    class="p-button  p-button-rounded my-4 px-4 py-2"
                    @click="processOrder"/>
          </div>


        </div>


      </div>
    </div>
  </Dialog>

</template>

<style scoped>
.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: grey;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>