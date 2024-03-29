<script setup>
import Button from "primevue/button";
import {reactive, ref} from "vue";
import axios from "@/axios";
import {useHomeStore} from "@/store/home";
import {useComponentStore} from "@/store/componentStore";

const store = useHomeStore();
const componentStore = useComponentStore();
const loading = ref(false);
const error = ref('');

const loginData = reactive({email: '', password: ''});

const resetLoginData = () => {
  loginData.email = ''; loginData.password = '';
}


//Login
const login = async () => {
  try {
    error.value = "";
    loading.value = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //Validation
    if (!loginData.email.trim()) return error.value = "Bitte E-Mail-Adresse angeben";
    if (!loginData.email.match(emailRegex)) return error.value = "Bitte geben Sie eine gültige E-Mail-Adresse ein";
    if (!loginData.password.trim())  return error.value = "Bitte Passwort eingeben";


    //Send Data To Server
    const response = await  axios.post(
        '/users/auth/login',
        JSON.stringify({
          email: loginData.email.toLowerCase(),
          password: loginData.password
        })
    )

    //If user is not verified
    if (response.status === 206) {
      store.verificationEmail = loginData.email;
      componentStore.setDefaults();
      componentStore.emailVerificationDialog = true;
    }

    //Successful login
    if (response.status === 200) {

      const payload = {
        name: response.data.user.name,
        email: response.data.user.email,
        deliveryAddress: response.data.user.deliveryAddress,
        token: response.data.token
      }

      store.setUser(payload);
      resetLoginData();
      componentStore.authDialog = false;
      return toast.add({severity:'success', detail: 'Erfolg', life: 4000});
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


const openPasswordResetDialog = () => {
  componentStore.setDefaults();
  componentStore.passwordResetDialog = true;
}




/* pass value to captcha  */
const inputValue = ref(null);
const captchaCode = ref('');
const isValidCaptchaCode = ref(false);

const getCaptchaCode = (value) => {
  /* you can access captcha code */
  captchaCode.value = value.toLowerCase();
};
const checkValidCaptcha = (value) => {
  /* expected return boolean if your value and captcha code are same return True otherwise return False */
  if (inputValue.value && captchaCode.value){
    isValidCaptchaCode.value = (inputValue.value.toLowerCase() === captchaCode.value.toLowerCase());
  }else isValidCaptchaCode.value = false;

};

</script>

<template>
<div class="">
  <form @submit.prevent="login">

    <div class="input-group mb-3">
      <div class="input-group-text"><span class="pi pi-envelope"></span></div>
      <input type="email" class="form-control shadow-none"
             placeholder="E-Mail-Adresse" v-model.trim="loginData.email">
    </div>

    <div class="input-group mb-2">
      <div class="input-group-text"><span class="pi pi-lock"></span></div>
      <input type="password" class="form-control shadow-none"
             placeholder="Passwort" v-model="loginData.password">
    </div>
    <p>Passwort vergessen?
      <span class="text-primary" @click="openPasswordResetDialog" style="cursor: pointer;">
        klicken Sie hier</span>
    </p>


    <div class="sample-captcha text-center">
      <input type="text" v-model="inputValue" class="shadow-none mb-1" autocomplete="off"/>

      <VueClientRecaptcha
          :showCapitalCaseLetters="false"
          :value="inputValue"
          @getCode="getCaptchaCode"
          @isValid="checkValidCaptcha"
      />
    </div>

    <div class="text-danger text-center" v-if="error"><small>{{ error }}</small></div>

    <div class="text-center">
      <Button label="Einloggen" type="submit" :loading="loading"
              class="p-button  p-button-rounded my-4 px-4 py-2"
              icon="pi pi-lock-open" :disabled="!isValidCaptchaCode"/>
    </div>
  </form>
</div>
</template>

<style scoped>
@import url("/node_modules/vue-client-recaptcha/dist/style.css");
</style>