<script setup>
import Button from "primevue/button";
import {reactive, ref} from "vue";
import {useComponentStore} from "@/store/componentStore";
import {useHomeStore} from "@/store/home";
import axios from "@/axios";

const store = useHomeStore();
const componentStore = useComponentStore()
const loading = ref(false);
const error = ref('');
const regData = reactive({
  name: '', email: '', password: '', confirmPassword: ''
})


const register = async () => {

  try {
    error.value = "";
    loading.value = true;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //Validation
    if (regData.name.trim().length < 4) return error.value = "Der Name muss mindestens vier Zeichen lang sein";
    if (!regData.email.trim()) return error.value = "Bitte E-Mail-Adresse angeben";
    if (!regData.email.match(emailRegex)) return error.value = "Bitte geben Sie eine gültige E-Mail-Adresse ein";
    if (!regData.password.trim())  return error.value = "Bitte Passwort eingeben";
    if (regData.password !== regData.confirmPassword) return error.value = "Passwörter stimmen nicht überein";
    if (!regData.password.match(passRegex)) return error.value = "Passwort entspricht nicht der Anforderungen";




    //Send Data To Server
    const response = await  axios.post(
        '/users/auth/register',
        JSON.stringify({
          name: regData.name,
          email: regData.email.toLowerCase(),
          password: regData.password
        })
    )

    if (response.status === 201) {
      store.verificationEmail = regData.email.toLowerCase();
      componentStore.setDefaults();
      componentStore.emailVerificationDialog = true;
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
    <form @submit.prevent="register">

      <div class="input-group mb-3">
        <div class="input-group-text"><span class="pi pi-user"></span></div>
        <input type="text" class="form-control shadow-none" placeholder="Name"
        v-model.trim="regData.name">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-text"><span class="pi pi-envelope"></span></div>
        <input type="email" class="form-control shadow-none" placeholder="E-Mail-Adresse"
        v-model.trim="regData.email">
      </div>

      <div class="input-group mb-2">
        <div class="input-group-text"><span class="pi pi-lock"></span></div>
        <input type="password" class="form-control shadow-none" placeholder="Passwort"
        v-model="regData.password">
      </div>

      <div class="input-group mb-2">
        <div class="input-group-text"><span class="pi pi-lock"></span></div>
        <input type="password" class="form-control shadow-none" placeholder="Passwort bestätigen"
        v-model="regData.confirmPassword">
      </div>

      <p style="line-height: 0.8em" class="mt-3">
        <small class="text-muted" style="font-size: 0.8em;">
          <span class="pi pi-info-circle">&nbsp;</span>
          Das Passwort muss mindestens 6 Zeichen lang sein und mindestens einen Großbuchstaben enthalten.
          ein Kleinbuchstabe und eine Ziffer.
        </small>
      </p>

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

</style>