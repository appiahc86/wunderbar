<script setup>
import Button from "primevue/button";
import {reactive, ref} from "vue";
import axios from "@/axios";
import {useHomeStore} from "@/store/home";
import {useComponentStore} from "@/store/componentStore";

const store = useHomeStore();
const componentStore = useComponentStore();
const loading = ref(false);
const error = ref("");

const formData = reactive({
  name: store.user.name, email: store.user.email,
  phone: store.user.phone, deliveryAddress: store.user.deliveryAddress
})
//Update User
const updateUser = async () => {

  try {
    error.value = "";
    loading.value = true;


    //Send Data To Server
    const response = await  axios.post(
        '/users/update',
        JSON.stringify({
          name: formData.name,
          phone: formData.phone,
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
      store.user.deliveryAddress = formData.deliveryAddress;
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
    <div class="text-danger text-center" v-if="error">
      <small>{{ error }}</small></div>

    <small>Name</small>
    <div class="input-group mb-3">
      <div class="input-group-text"><span class="pi pi-user"></span></div>
      <input type="text" class="form-control shadow-none" placeholder="Name"
             v-model.trim="formData.name">
    </div>

    <small>Email</small>
    <div class="input-group mb-3">
      <div class="input-group-text"><span class="pi pi-envelope"></span></div>
      <input type="email" class="form-control shadow-none"
             v-model.trim="formData.email" disabled>
    </div>

    <small>Telefonnummer</small>
    <div class="input-group mb-3">
      <div class="input-group-text"><span class="pi pi-phone"></span> +49</div>
      <input type="number" class="form-control shadow-none" placeholder=""
             v-model.number="formData.phone">
    </div>

    <small>Lieferadresse</small>
    <div class="input-group mb-2">
      <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
      <input type="text" class="form-control shadow-none" placeholder=""
             v-model="formData.deliveryAddress">
    </div>


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