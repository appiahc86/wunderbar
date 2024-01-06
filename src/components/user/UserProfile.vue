<script setup>
import Button from "primevue/button";
import {onMounted, reactive, ref} from "vue";
import axios from "@/axios";
import {useHomeStore} from "@/store/home";
import {useComponentStore} from "@/store/componentStore";

const store = useHomeStore();
const componentStore = useComponentStore();
const loading = ref(false);
const error = ref("");

const formData = reactive({
  name: store.user.name,
  email: store.user.email,
         deliveryAddress: {
           street: '',
           houseNumber: '',
           postCode: '',
           town: '',
           floor: '',
           phone: store.user.phone
  }
})



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
      store.user.phone = formData.phone;
      store.user.deliveryAddress = response.data.deliveryAddress;
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
            <small class="fw-bold float-start">Stadt</small>
            <div class="input-group">
              <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
              <input type="text" placeholder="Braunschweig" disabled
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
              <input type="text" placeholder="Telefonnummer" required
                     class="form-control shadow-none" v-model="formData.deliveryAddress.phone"
                     @input="">
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