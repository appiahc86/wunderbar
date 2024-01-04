<script setup>
import Button from "primevue/button";
import {ref} from "vue";
import axios from "@/axios";
import {useComponentStore} from "@/store/componentStore";
import {useHomeStore} from "@/store/home";

const store = useHomeStore();
const componentStore = useComponentStore();
const loading = ref(false);
const error = ref("");
const verificationCode = ref("");

//Verify Email
const verify = async () => {
  try {
    error.value = "";
    loading.value = true;

    //Send Data To Server
    const response = await  axios.post(
        '/users/auth/verify-email',
        JSON.stringify({
          email: store.verificationEmail,
          verificationCode: verificationCode.value
        })
    )

    if (response.status === 200) {
      store.verificationEmail = "";
      const payload = {
        name: response.data.user.name,
        email: response.data.user.email,
        deliveryAddress: response.data.user.deliveryAddress,
        token: response.data.token
      }
      store.setUser(payload);
      toast.add({severity:'success', detail: 'Du bist eingeloggt', life: 4000}); //You are logged in
      componentStore.setDefaults();
    }


  }catch (e) {
    if (e.response) return error.value = e.response.data;
    if (e.request && e.request.status === 0)
      return error.value = "Leider wurde die Verbindung zum Server abgelehnt. Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut";

    return error.value = 'Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal';

  }finally {
    loading.value = false;
  }
}


//Resend Email verification code
const resendEmailVerificationCode = async () => {
  try {
    error.value = "";
    loading.value = true;

    //Send Data To Server
    const response = await  axios.post(
        '/users/auth/resend-verification-code',
        JSON.stringify({
          email: store.verificationEmail
        })
    )

    if (response.status === 200) {
      toast.add({severity:'success', detail: 'Der Bestätigungscode wurde gesendet', life: 4000});
    }


  }catch (e) {
    if (e.response) return error.value = e.response.data;
    if (e.request && e.request.status === 0)
      return error.value = "Leider wurde die Verbindung zum Server abgelehnt. Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut";

    return error.value = 'Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal';

  }finally {
    loading.value = false;
  }
}


</script>

<template>
  <div class="">
    <form @submit.prevent="verify">
      <div class="text-danger text-center" v-if="error"><small>{{ error }}</small></div>
      <div class="input-group mb-3">
        <div class="input-group-text"><span class="pi pi-question"></span></div>
        <input type="text" class="form-control shadow-none" maxlength="10" required
               placeholder="Bestätigungscode" v-model.trim="verificationCode">
      </div>

<!--      <p class="resend-email" >Resend email</p>-->
      <p class="resend-email" v-if="!loading"
         @click="resendEmailVerificationCode">Resend email</p>

      <div class="text-center">
        <Button label="Einreichen" type="submit" :loading="loading"
                class="p-button  p-button-rounded my-4 px-4 py-2"
                icon="pi pi-send"/>
      </div>
    </form>
  </div>

</template>

<style scoped>
.resend-email {
  cursor: pointer;
  color: #6a1a21;
}
.resend-email:hover {
  color: inherit;
}
</style>