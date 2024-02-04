<script setup>
import Button from "primevue/button";
import {ref} from "vue";
import axios from "@/axios";
import {useHomeStore} from "@/store/home";
import CryptoJS from "crypto-js";
import {onBeforeRouteLeave, useRouter} from "vue-router"
import {useComponentStore} from "@/store/componentStore";

const router = useRouter();
const store = useHomeStore();
const loading = ref(false);
const error = ref("");
const verificationCode = ref("");
const componentStore = useComponentStore();


//Resend SMS
const resendSms = async () => {
  try {
    loading.value = true;
    error.value = "";
    store.smsVerified = false;

    const response = await axios.post("/sms",
        {phone: '02343432432'}
    )

    if (response.status === 200){
      store.sms = response.data.code
    }

  }catch (e) {
    if (e.response) return error.value = `${e.response.data}`;

    return console.clear();
  }finally { loading.value = false; }
}

//Verify SMS
const verify = async () => {

  try {
    loading.value = true;
    const bytes = CryptoJS.AES.decrypt(store.sms, 'secretKey@');
    const decryptedData = parseInt(bytes.toString(CryptoJS.enc.Utf8));

    if (verificationCode?.value?.toString() === decryptedData?.toString()){
      store.smsVerified = true;
      router.push({name: 'checkout'});
    }else return error.value = "Leider haben Sie den falschen Code eingegeben";

  }catch (e) {
    console.clear();
  }finally { loading.value = false; }

}

onBeforeRouteLeave(() => {
  componentStore.setDefaults();
})


</script>

<template>
  <div class="">

    <p>Bitte geben Sie den per SMS erhaltenen Code ein</p>

    <form @submit.prevent="verify">

      <div class="input-group mb-3">
        <div class="input-group-text"><span class="pi pi-question"></span></div>
        <input type="tel" class="form-control shadow-none" maxlength="6" required
               placeholder="" v-model.number="verificationCode">
      </div>

      <p class="resend-sms" v-if="!loading"
         @click="resendSms">SMS erneut senden</p>

      <div class="text-center my-4">
        <div class="text-danger mb-1" v-if="error"><small>{{ error }}</small></div>
        <Button label="Einreichen" type="submit" :loading="loading" :disabled="loading"
                class="p-button  p-button-rounded px-4 py-2"
                icon="pi pi-send"/>
      </div>
    </form>
  </div>

</template>

<style scoped>
.resend-sms {
  cursor: pointer;
  color: #6a1a21;
}
.resend-email:hover {
  color: inherit;
}
</style>