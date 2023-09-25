<script setup>
import Button from "primevue/button";
import {reactive, ref} from "vue";
import axios from "@/axios";
import {useComponentStore} from "@/store/componentStore";
import {useHomeStore} from "@/store/home";

const store = useHomeStore();
const componentStore = useComponentStore();
const loading = ref(false);
const passwordResetCode = ref(false);
const error = ref("");
const email = ref("");
const passwordResetData = reactive({
  password: "", confirmPassword: "", resetCode: ""
})

//Request Password reset Code
const requestCode = async () => {
  try {
    error.value = "";
    loading.value = true;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //Validation
    if (!email.value.trim()) return error.value = "Bitte E-Mail-Adresse angeben";
    if (!email.value.match(emailRegex)) return error.value = "Bitte geben Sie eine gültige E-Mail-Adresse ein";


    //Send Data To Server
    const response = await  axios.post(
        '/users/auth/password-reset-code',
        JSON.stringify({
          email: email.value.toLowerCase(),
        })
    )

    if (response.status === 200) {
      passwordResetCode.value  = true;
      toast.add({severity:'success', detail: 'E-Mail zum Zurücksetzen des Passworts gesendet', life: 4000});
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


//Reset Password
const resetPassword = async () => {
  try {
    error.value = "";
    loading.value = true;

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordResetData.password.trim())  return error.value = "Bitte Passwort eingeben";
    if (passwordResetData.password !== passwordResetData.confirmPassword) return error.value = "Passwörter stimmen nicht überein";
    if (!passwordResetData.password.match(passRegex)) return error.value = "Passwort entspricht nicht der Anforderungen";
    if (!passwordResetData.resetCode.trim()) return error.value = "Bitte geben Sie den Code zum Zurücksetzen des Passworts ein";



    //Send Data To Server
    const response = await  axios.post(
        '/users/auth/reset-password',
        JSON.stringify({
          email: email.value.toLowerCase(),
          passwordResetCode: passwordResetData.resetCode,
          password: passwordResetData.password
        })
    )

    if (response.status === 200) {
      error.value = "";
      passwordResetData.resetCode = "";
      componentStore.setDefaults();
      componentStore.authDialog = true;
      return toast.add({severity:'success', detail: 'Sie können sich mit dem neuen Passwort anmelden', life: 4000});
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
  <div class="" v-if="passwordResetCode">
    <form @submit.prevent="resetPassword">
      <div class="text-danger text-center" v-if="error"><small>{{ error }}</small></div>

      <div class="input-group mb-2">
        <div class="input-group-text"><span class="pi pi-lock"></span></div>
        <input type="password" class="form-control shadow-none" placeholder="Neu Passwort"
               v-model="passwordResetData.password">
      </div>

      <div class="input-group mb-2">
        <div class="input-group-text"><span class="pi pi-lock"></span></div>
        <input type="password" class="form-control shadow-none" placeholder="Passwort bestätigen"
               v-model="passwordResetData.confirmPassword">
      </div>


      <div class="input-group">
        <div class="input-group-text"><span class="pi pi-hashtag"></span></div>
        <input type="text" class="form-control shadow-none" placeholder="Passwortzurücksetzungscode"
               v-model="passwordResetData.resetCode">
      </div>
      <small class="mb-2 text-success mt-0">Bitte überprüfen Sie Ihre E-Mail auf diesen Code!</small>


      <p style="line-height: 0.8em" class="mt-3">
        <small class="text-muted" style="font-size: 0.8em;">
          <span class="pi pi-info-circle">&nbsp;</span>
          Das Passwort muss mindestens 6 Zeichen lang sein und mindestens einen Großbuchstaben enthalten.
          ein Kleinbuchstabe und eine Ziffer.
        </small>
      </p>

      <div class="text-center">
        <Button label="Einreichen" type="submit" :loading="loading"
                class="p-button  p-button-rounded my-4 px-4 py-2"
                icon="pi pi-save"/>
      </div>
    </form>
  </div>


  <div class="" v-else>
    <form @submit.prevent="requestCode">
      <div class="text-danger text-center" v-if="error"><small>{{ error }}</small></div>
      <div class="input-group mb-3">
        <div class="input-group-text"><span class="pi pi-envelope"></span></div>
        <input type="email" class="form-control shadow-none"
               placeholder="E-Mail-Adresse" v-model.trim="email">
      </div>


      <div class="text-center">
        <Button label="Einreichen" type="submit" :loading="loading"
                class="p-button  p-button-rounded my-4 px-4 py-2"
                icon="pi pi-send"/>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>