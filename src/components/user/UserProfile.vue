<script setup>
import Button from "primevue/button";
import {onMounted, reactive, ref, watch} from "vue";
import axios from "@/axios";
import vSelect from 'vue-select';
import {useHomeStore} from "@/store/home";
import {useComponentStore} from "@/store/componentStore";

const store = useHomeStore();
const componentStore = useComponentStore();
const loading = ref(false);
const error = ref("");
const zipcodes = ref([]);
const selectedPostCode = ref(null);


const formData = reactive({
  name: store.user.name,
  email: store.user.email,
         deliveryAddress: {
           street: '',
           houseNumber: '',
           postCode: '',
           town: '',
           floor: '',
           phone: ''
  }
})


//watch Selected Postcode
watch(selectedPostCode, (value) => {
  if (value) {
    formData.deliveryAddress.postCode = value.zipCode;
    formData.deliveryAddress.town = value.town;
  }else {
    formData.deliveryAddress.postCode = "";
    formData.deliveryAddress.town = "";
  }
})

const validatePhoneNumber = (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, '');
  e.target.value = e.target.value.replace(/(\..*)\./g, '$1');
}

//onMounted Hook
onMounted(() => {
  if (store?.user?.deliveryAddress){
    formData.deliveryAddress = store.user.deliveryAddress;
  }
})

//Update User
const updateUser = async () => {

  try {
    error.value = "";
    loading.value = true;

    //Validation
    if (formData.name.trim().length < 4) return error.value = "Der Name muss mindestens vier Zeichen lang sein";



    //Send Data To Server
    const response = await  axios.post(
        '/users/update',
        JSON.stringify({
          name: formData.name,
          deliveryAddress: formData.deliveryAddress
        }),
        {
          headers: {
            'Authorization': `Bearer ${store.user.token}`
          }
        }
    )

    if (response.status === 200) {
      store.user.name = formData.name;
      store.user.deliveryAddress = response?.data?.deliveryAddress;
      componentStore.setDefaults();
      return toast.add({severity:'success', detail: 'Erfolg', life: 4000});
    }

  }catch (e) {
    if (e.response) return error.value = e.response.data;
    if (e.request && e.request.status === 0)
      return error.value = `Leider wurde die Verbindung zum Server abgelehnt. Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut`;

    return error.value = 'Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal';
  }finally {
    loading.value = false;
  }

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
        for (const zipcode of zipcodes.value) {
          if (zipcode.zipCode.toString() === store?.user?.deliveryAddress?.postCode) {
            selectedPostCode.value = zipcode
          }
        }
      }
    }

  }catch (e) {

    if (e.response) return error.value = `${e.response.data}`;

    if (e.request && e.request.status === 0)
      return console.clear();

    return console.clear();

  }finally { loading.value = false }
})()


</script>

<template>
<div class="">

        <form @submit.prevent="updateUser">

          <small>Name</small>
          <div class="input-group mb-3">
            <div class="input-group-text"><span class="pi pi-user"></span></div>
            <input type="text" class="form-control shadow-none" placeholder="Name"
                   v-model.trim="formData.name" required>
          </div>

          <small>Email</small>
          <div class="input-group mb-3">
            <div class="input-group-text"><span class="pi pi-envelope"></span></div>
            <input type="email" class="form-control shadow-none"
                   v-model.trim="formData.email" disabled>
          </div>

          <h5 class="text-center mt-3 text-decoration-underline">Lieferadresse</h5>

                        <!--Delivery Address-->
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

            <!-- Zip Code-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Postleitzahl
                <span class="text-danger">*</span></small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-map-marker"></span></div>

                <v-select :options="zipcodes" label="zipCode" style="padding: 0 !important;"
                          placeholder="" class="form-control shadow-none" v-model="selectedPostCode">
                  <template #no-options="">
                    Keine Daten verfügbar
                  </template>
                  <template #search="{attributes, events}">
                    <input
                        class="vs__search"
                        :required="!selectedPostCode"
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
              <input type="text" placeholder="" disabled
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
              <input type="text"  placeholder="z.B. 1521123456788" required
                     class="form-control shadow-none" v-model.number="formData.deliveryAddress.phone"
                     @input="validatePhoneNumber" maxlength="15">
            </div>
          </div>

</div><!-- // ./row  -->

          <div class="text-danger text-center" v-if="error">
            <small>{{ error }}</small></div>

          <div class="text-center">
            <Button label="Einreichen" type="submit" :loading="loading"
                    class="p-button  p-button-rounded my-4 px-4 py-2"
            />
          </div>
        </form>

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