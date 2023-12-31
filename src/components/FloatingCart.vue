<script setup>
import {useCartStore} from "@/store/cart";
import {currency, formatNumber} from "@/functions";
import {useHomeStore} from "@/store/home";
import {useComponentStore} from "@/store/componentStore";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import axios from "@/axios";

const store = useHomeStore();
const componentStore = useComponentStore();
const cartStore = useCartStore();
const router = useRouter();

const loading = ref(false);
const error = ref("");
const formData = reactive({
   note: "",
  deliveryAddress: {
    street: '', houseNumber: '', postCode: '', town: '',
    floor: '', phone: ''
  }

})

//Load zipcode
const getZipcode = async () => {
  try {

    const response = await  axios.post('/zipcode',
        JSON.stringify({zipcode: formData.deliveryAddress.postCode}),
        {
          headers: { 'Authorization': `Bearer ${store.user.token}`}
        }
    )

    if (response.status === 200){
      return  {
        zipcode: response.data.zipcode,
        error: null
      }
    }

  }catch (e) {

    return {
      zipcode:null,
      error: 'Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal'
    }
  }

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


if (store?.user?.deliveryAddress?.phone){
  formData.deliveryAddress.street = store.user.deliveryAddress.street;
  formData.deliveryAddress.houseNumber = store.user.deliveryAddress.houseNumber;
  formData.deliveryAddress.postCode = store.user.deliveryAddress.postCode;
  formData.deliveryAddress.floor = store.user.deliveryAddress.floor;
  formData.deliveryAddress.town = store.user.deliveryAddress.town;
  formData.deliveryAddress.phone = store.user.deliveryAddress.phone;
}

const validate = async () => {
  try {

    if (!store.isLoggedIn){
      componentStore.setDefaults();
      componentStore.authDialog = true;
    }

    loading.value = true;
    error.value = "";
    cartStore.zipcodeId = null;
    cartStore.deliveryData = null;
    cartStore.deliveryFee = 0;

    const zipcode = await getZipcode();

    if (zipcode.error){
      return error.value = zipcode.error
    }
    if (!zipcode.zipcode.length){
      //Sorry, we do not deliver to this address
      return error.value = 'Leider liefern wir nicht an diese Adresse';
    }
    if (parseFloat(zipcode.zipcode[0].minOrder) > cartStore.subTotal){ //Minimum order value is
      return error.value = `Der Mindestbestellwert beträgt ${formatNumber(zipcode.zipcode[0].minOrder)} ${currency}`
    }


    cartStore.zipcodeId = zipcode.zipcode[0].id;
    cartStore.deliveryFee = zipcode.zipcode[0].deliveryFee;
    formData.deliveryAddress.town = zipcode.zipcode[0].town;
    cartStore.deliveryData = formData;
    componentStore.setDefaults();
    router.push({name: "checkout"});

  }catch (e) {
    return error.value = "Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal";
  }finally { loading.value = false }

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


          </div>

        </div>

      </div>

      <div class="row">
        <form @submit.prevent="validate">

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
                <input type="number" placeholder="Postleitzahl eingeben" min="0"
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
                       class="form-control shadow-none" v-model="formData.deliveryAddress.town">
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
                <input type="number" placeholder="Telefonnummer" required
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


        <div class="text-center text-danger" v-if="error">
          <h6>{{ error }}</h6>
        </div>

        <div class="text-center">
          <button class="btn btn-primary" disabled v-if="loading">
            <span class="spinner-border spinner-border-sm"></span> Zur Kasse gehen</button>
          <button class="btn btn-primary" v-else>
            Zur Kasse gehen</button>
        </div>

        </form>
        <br>




      </div>

    </div>


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