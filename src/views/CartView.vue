<script setup>
import {useCartStore} from "@/store/cart";
import {currency, formatNumber} from "@/functions";
import {useHomeStore} from "@/store/home";
import {useComponentStore} from "@/store/componentStore";
import {useRouter} from "vue-router";
import {ref, watch, onMounted} from "vue";
import vSelect from 'vue-select';
import axios from "@/axios";
import 'vue-select/dist/vue-select.css';
import Dialog from "primevue/dialog";
import Sms from "@/components/Sms.vue";

const store = useHomeStore();
const componentStore = useComponentStore();
const cartStore = useCartStore();
const router = useRouter();


const loading = ref(false);
const error = ref("");
const zipcodes = ref([]);


if (!cartStore.cart.length){
  router.push({name: 'home'});
}

//Watch Phone number for changes
watch(() => cartStore.deliveryData.deliveryAddress.phone, (value) => {

  if(typeof value !== "number"){
    cartStore.deliveryData.deliveryAddress.phone = "";
  }
  store.smsVerified = false;

})

//watch Selected Postcode
watch(() => cartStore.selectedPostCode, (value) => {
  if (value) {
    cartStore.deliveryData.deliveryAddress.postCode = value.zipCode;
    cartStore.deliveryData.deliveryAddress.town = value.town;
  }else {
    cartStore.deliveryData.deliveryAddress.postCode = "";
    cartStore.deliveryData.deliveryAddress.town = "";
  }
})


//Increment
const increment = (data) => {
  cartStore.increment(data);
}

//decrement
const decrement = (data) => {
  cartStore.decremet(data);
  if (!cartStore.cart.length){
    router.push({name: 'home'})
  }
}


if (store?.user?.deliveryAddress?.phone){
  cartStore.deliveryData.deliveryAddress.street = store.user.deliveryAddress.street;
  cartStore.deliveryData.deliveryAddress.houseNumber = store.user.deliveryAddress.houseNumber;
  // formData.deliveryAddress.postCode = store.user.deliveryAddress.postCode; //TODO fix it
  cartStore.deliveryData.deliveryAddress.floor = store.user.deliveryAddress.floor;
  cartStore.deliveryData.deliveryAddress.town = store.user.deliveryAddress.town;
  cartStore.deliveryData.deliveryAddress.phone = store.user.deliveryAddress.phone;
}


//Validate phone number
const validatePhoneNumber = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
  e.target.value = e.target.value.replace(/(\..*)\./g, '$1');
  store.smsVerified = false;
  store.sms = "";
}

//Request SMS
const requestSMS = async () => {
  try {

    loading.value = true;
    error.value = "";
    store.smsVerified = false;

    const response = await axios.post(
        '/sms',

        {phone: cartStore.deliveryData.deliveryAddress.phone}
    )

    if (response.status === 200){
      store.sms = response.data.code;
      componentStore.smsDialog = true;
    }

  }catch (e) {

    if (e.response) return error.value = `${e.response.data}`;

    return console.clear();

  }finally { loading.value = false }
}



const validate = async () => {
  try {

    loading.value = true;
    error.value = "";
    cartStore.deliveryFee = 0;

    if (!cartStore?.deliveryData?.deliveryAddress?.phone){
      return error.value = "Bitte geben Sie die Telefonnummer ein"
    }


    if (!cartStore.selectedPostCode?.zipCode){
      return error.value = "Es wurde keine Postleitzahl eingegeben"
    }

    if (parseFloat(cartStore?.selectedPostCode?.minOrder) > cartStore.subTotal){ //Minimum order value is
      return error.value =
          `Der Mindestbestellwert beträgt ${formatNumber(cartStore?.selectedPostCode?.minOrder)} ${currency}`
    }


    cartStore.deliveryFee = cartStore?.selectedPostCode?.deliveryFee;
    cartStore.deliveryData.deliveryAddress.town = cartStore?.selectedPostCode?.town;


    if (store.smsVerified) {
      router.push({name: 'checkout'});
    }else {
      await requestSMS();
    }


  }catch (e) {

     return error.value = "Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal";
// error.value = e.message
  }finally { loading.value = false }

}



//Load all zipcodes
(async () => {
  try {

    loading.value = true;
    error.value = "";

    const response = await axios.get(
        '/zipcodes',

        {
          headers: {
            'Authorization': `Bearer ${store.user.token}`
          }
        }
    )

    if (response.status === 200){
      zipcodes.value = response.data.zipcodes;
      //Find zipcode in store and update form input
      if (store?.user?.deliveryAddress?.postCode){
        for (const zip of zipcodes.value) {

          if (zip.zipCode === store?.user?.deliveryAddress?.postCode) {
            cartStore.selectedPostCode = zip
          }
        }
      }else cartStore.deliveryData.deliveryAddress.town = "";

      if (cartStore?.selectedPostCode?.zipCode){
        for (const zip of zipcodes.value) {

          if (zip.zipCode === cartStore?.selectedPostCode?.zipCode) {
            cartStore.selectedPostCode = zip
          }
        }
      }else cartStore.deliveryData.deliveryAddress.town = "";

    }

  }catch (e) {

    if (e.response) return error.value = `${e.response.data}`;

    if (e.request && e.request.status === 0)
      return console.clear();

      return console.clear();

  }finally { loading.value = false }
})()


//On mounted hook
onMounted(() => {
  componentStore.setDefaults();
})
</script>

<template>

  <div class="container mb-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <h5 class="text-center fw-bold my-4">Warenkorb</h5>
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
              <th>Zwischensumme</th> <!-- SubTotal -->
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
                     v-model.trim="cartStore.deliveryData.deliveryAddress.street">
            </div>
          </div>

          <!--House Number-->
          <div class="col-lg-6 mb-3">
            <small class="fw-bold float-start">Hausnummer
              <span class="text-danger">*</span></small>
            <div class="input-group">
              <div class="input-group-text"><span class="pi pi-home"></span></div>
              <input type="text"  class="form-control shadow-none" required
                     v-model.trim="cartStore.deliveryData.deliveryAddress.houseNumber"
                     placeholder="Hausnummer eingeben"
              >
            </div>
          </div>

          <!-- Zip Code-->
          <div class="col-lg-6 mb-3">
            <small class="fw-bold float-start">Postleitzahl
              <span class="text-danger">*</span></small>
            <div class="input-group">
              <div class="input-group-text"><span class="pi pi-map-marker"></span></div>

              <v-select :options="zipcodes" label="zipCode" style="padding: 0 !important;"
                        placeholder="" class="form-control shadow-none" v-model="cartStore.selectedPostCode">
                <template #no-options="">
                  Keine Daten verfügbar
                </template>
                <template #search="{attributes, events}">
                  <input
                      class="vs__search"
                      :required="!cartStore.selectedPostCode"
                      v-bind="attributes"
                      v-on="events"
                  />
                </template>
              </v-select>
            </div>
          </div>



          <!--City-->
          <div class="col-lg-6 mb-3">
            <small class="fw-bold float-start">Stadt</small>
            <div class="input-group">
              <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
              <input type="text" disabled
                     class="form-control shadow-none" v-model="cartStore.deliveryData.deliveryAddress.town">
            </div>
          </div>



          <!--Floor-->
          <div class="col-lg-6 mb-3">
            <small class="fw-bold float-start">Etage (freiwillig)</small>
            <div class="input-group">
              <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
              <input type="text" placeholder="Etagennummer eingeben"
                     class="form-control shadow-none" v-model.trim="cartStore.deliveryData.deliveryAddress.floor">
            </div>
          </div>

          <!--Phone-->
          <div class="col-lg-6 mb-3">
            <small class="fw-bold float-start">Telefonnummer
              <span class="text-danger">*</span></small>
            <div class="input-group">
              <div class="input-group-text">+49</div>
              <input type="text" placeholder="z.B. 1521123456788" required
                     class="form-control shadow-none" v-model.number="cartStore.deliveryData.deliveryAddress.phone"
                  @input="validatePhoneNumber" maxlength="15" minlength="8">
            </div>
          </div>


          <!--Note-->
          <div class="col-lg-6 mb-3">
            <small class="fw-bold float-start">Anmerkung hinzufügen (freiwillig)</small>
            <div class="input-group">
              <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
              <input type="text" placeholder="Anmerkung hinzufügen"
                     class="form-control shadow-none" v-model.trim="cartStore.deliveryData.note">
            </div>
          </div>


        </div>


        <div class="text-center text-danger" v-if="error">
          <h6>{{ error }}</h6>
        </div>

        <div class="text-center">
          <button class="btn btn-primary" type="button" disabled v-if="loading">
            <span class="spinner-border spinner-border-sm"></span> Zur Kasse gehen</button>
          <button class="btn btn-primary" v-else>
            Zur Kasse gehen</button>
        </div>

      </form>
      <br><br><br>

    </div>

<!-- SMS Dialog   -->
    <Dialog v-model:visible="componentStore.smsDialog" header=" " :style="{ width: '50vw' }"
            :breakpoints="{ '960px': '75vw', '641px': '100vw' }" position="center" :modal="true">
      <div class="container-fluid container-lg">
        <div class="row">
          <Sms />
        </div>
      </div>
    </Dialog>

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