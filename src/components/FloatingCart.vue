<script setup>
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";
import {useCartStore} from "@/store/cart";
import {currency, formatNumber, isValidPhoneNumberForCountry} from "@/functions";
import {onMounted, reactive, ref} from "vue";
import {useHomeStore} from "@/store/home";
import axios from "@/axios";
import {useComponentStore} from "@/store/componentStore";
import {AsYouType} from 'libphonenumber-js'


const componentStore = useComponentStore();
const cartStore = useCartStore();
const store = useHomeStore();
const loading = ref(false);


const error = ref("");
const formData = reactive({
  paymentMethod: 'cash', note: "",
  deliveryAddress: {
    street: '', houseNumber: '', postCode: '', city: 'Braunschweig',
    floor: '', phone: ''
  }

})



if (store.user.deliveryAddress && store.user.deliveryAddress.phone){
  formData.deliveryAddress.street = store.user.deliveryAddress.street;
  formData.deliveryAddress.houseNumber = store.user.deliveryAddress.houseNumber;
  formData.deliveryAddress.postCode = store.user.deliveryAddress.postCode;
  formData.deliveryAddress.floor = store.user.deliveryAddress.floor;
  formData.deliveryAddress.phone = store.user.deliveryAddress.phone;
}


//As you type
const formatPhoneNumber = () => {
  if (/^[0-9 ]*$/.test(formData.deliveryAddress.phone)){

    const asYouType = new AsYouType('DE')
    // console.log(asYouType.getNumber().number)
    formData.deliveryAddress.phone = asYouType.input(formData.deliveryAddress.phone);
  }else formData.deliveryAddress.phone = "";

}

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

// onBeforeRouteLeave(() => componentStore.setDefaults() )

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
      document.querySelector("#autocomplete").placeholder = "Adresse"
    }else {
      console.log(place)
    }
  })

}

onMounted(() => {
// initMap();
})

const processOrder = async () => {
  try {
    loading.value = true;
    error.value = "";
    //If phone number is not valid
   if(!isValidPhoneNumberForCountry(formData.deliveryAddress.phone, 'DE')){
     return error.value = "Bitte geben Sie eine gültige Telefonnummer ein";
   }

    const response = await  axios.post('/orders',
        {
          cart: cartStore.cart,
          deliveryFee: cartStore.deliveryFee,
          note: formData.note,
          deliveryAddress: formData.deliveryAddress,
          paymentMethod: formData.paymentMethod
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
      toast.add({severity:'success', detail: 'Erfolg', life: 4000});
    }

  }catch (e) {
    if (e.response)
      return toast.add({severity:'warn', detail: `${e.response.data}`, life: 4000});
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

    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-lg-5">
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

        <!--     Payment    -->
        <div class="col-lg-7">
          <div class="text-center"> <small class="text-muted">Bezahle mit</small></div>

          <form @submit.prevent="processOrder">

          <div class="d-flex justify-content-center mb-3">
            <div class="d-flex flex-wrap gap-3">
              <div class="flex align-items-center">
                <RadioButton v-model="formData.paymentMethod" inputId="p1" name="paymentMethod" value="cash" />
                <label for="p1" class="ms-1"> Barzahlung</label>
              </div>
              <div class="flex align-items-center">
                <RadioButton v-model="formData.paymentMethod" disabled
                             inputId="p2" name="paymentMethod" value="cc" />
                <label for="p2" class="ms-1"> Kreditkarte</label>
              </div>
            </div>
          </div>



            <!-- ...........    delivery address ...............   -->
          <div class="row">

                  <!--Street Name-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Straße
                <span class="text-danger">*</span></small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
                <input type="text" placeholder="Straßenname eingeben" required
                       class="form-control shadow-none"
                       v-model.trim="formData.deliveryAddress.street">
              </div>
            </div>

            <!--House Number-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Hausnummer
                <span class="text-danger">*</span></small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-home"></span></div>
                <input type="text"  class="form-control shadow-none" required
                       v-model.trim="formData.deliveryAddress.houseNumber"
                       placeholder="Hausnummer eingeben"
                      >
              </div>
            </div>

            <!--PostCode-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Postleitzahl
                <span class="text-danger">*</span></small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
                <input type="text" placeholder="Postleitzahl eingeben"
                       class="form-control shadow-none"  required
                       v-model.trim="formData.deliveryAddress.postCode">
              </div>
            </div>

            <!--City-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Stadt
                <span class="text-danger">*</span></small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
                <input type="text" placeholder="Stadtname eingeben" disabled
                       class="form-control shadow-none" v-model="formData.deliveryAddress.city">
              </div>
            </div>

            <!--Floor-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Etage (freiwillig)</small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
                <input type="text" placeholder="Etagennummer eingeben"
                       class="form-control shadow-none" v-model.trim="formData.deliveryAddress.floor">
              </div>
            </div>

            <!--Phone-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Telefonnummer
                <span class="text-danger">*</span></small>
              <div class="input-group">
                <div class="input-group-text">+49</div>
                <input type="text" placeholder="Telefonnummer" required
                       class="form-control shadow-none" v-model="formData.deliveryAddress.phone"
                  @input="formatPhoneNumber">
              </div>
            </div>


            <!--Note-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Anmerkung hinzufügen (freiwillig)</small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
                <input type="text" placeholder="Anmerkung hinzufügen"
                       class="form-control shadow-none" v-model.trim="formData.note">
              </div>
            </div>


          </div>






          <div class="text-center">
            <div class="text-danger" v-if="error">
              <small>{{ error }}</small>
            </div>
            <Button label="Weitermachen" type="submit" :loading="loading"
                    class="p-button  p-button-rounded my-4 px-4 py-2"/>
          </div>

          </form>



        </div>


      </div>
    </div>
<!--  </Dialog>-->

</template>

<style scoped>

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>