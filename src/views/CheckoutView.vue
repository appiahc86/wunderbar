<script setup>
import Button from "primevue/button";
import {useCartStore} from "@/store/cart";
import {currency, formatNumber} from "@/functions";
import {onMounted, ref} from "vue";
import {useHomeStore} from "@/store/home";
import axios from "@/axios";
import {useComponentStore} from "@/store/componentStore";
import {useRouter} from "vue-router";

const componentStore = useComponentStore();
const cartStore = useCartStore();
const store = useHomeStore();
const router = useRouter()
const loading = ref(false);
const ccActivated = ref(false);
const paying = ref(false);
const confirmDialog = ref();

const stripePublicKey = "pk_test_1phpKcUQ5qWMKWm0ah9tdv5S00cuLwizxy";

const error = ref("");


if(!cartStore.deliveryData.deliveryAddress.postCode && store.smsVerified) {
  router.push({name: "home"});
}



// *********** Pay with cash **************
const processOrder = async () => {
  try {

    confirmDialog.value.close();
    paying.value = true;
    error.value = "";

    const response = await  axios.post('/orders',
        {
          cart: cartStore.cart,
          note: cartStore.deliveryData?.note,
          deliveryAddress: cartStore.deliveryData?.deliveryAddress,
          paymentMethod: "cash"
        },
        {
          headers: {
            'Authorization': store?.user?.token ? `Bearer ${store?.user?.token}` : ""
          }
        }
    )


    if (response.status === 201){
      componentStore.setDefaults();
      cartStore.clearCart();
      router.push({name: "home"});
      toast.add({severity:'success', detail: 'Danke schön. Ihre Bestellung wurde zur Bearbeitung eingegangen', life: 4000});
    }


  }catch (e) {
    if (e.response)
      return toast.add({severity:'warn', detail: `${e.response.data}`, life: 4000});
    if (e.request && e.request.status === 0) {
      return toast.add({severity:'error',
        detail: `Leider wurde die Verbindung zum Server abgelehnt. Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut`,
        life: 4000});
    }

    return toast.add({severity:'warn', detail: 'Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal',
      life: 4000});
  }finally {
    paying.value = false;
  }

} // ./process Order



//********* Pay with paypal **********
onMounted(async () => {

  if (!store.smsVerified === true) {
    router.back();
  }
  if (!cartStore?.deliveryData?.deliveryAddress?.postCode) {
    router.back();
  }


  window.paypal
      .Buttons({
        style: {
          shape: "rect",
          layout: "vertical",
        },
        async createOrder() {


          try {

            //****************************** VALIDATION GOES HERE *****************************

            const response = await fetch(`${axios.defaults.baseURL}/orders`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": store?.user?.token ? `Bearer ${store?.user?.token}` : ""
              },
              // use the "body" param to optionally pass additional order information
              // like product ids and quantities
              body: JSON.stringify({
                cart: cartStore.cart,
                note: cartStore.deliveryData?.note,
                deliveryAddress: cartStore.deliveryData?.deliveryAddress,
                paymentMethod: "paypal"
              }),
            });

            const orderData = await response.json();

            if (orderData.id) {
              return orderData.id;
            } else {
              const errorDetail = orderData?.details?.[0];
              const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

              throw new Error(errorMessage);
            }
          } catch (error) {
            // console.error(error);
            //Could not initiate paypal checkout
            toast.add({severity:'error', detail: 'PayPal-Kaufabwicklung konnte nicht gestartet werden', life: 6000});
          }
        },
        async onApprove(data, actions) {
          try {

            const response = await fetch(`${axios.defaults.baseURL}/orders/capture/${data.orderID}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": store?.user?.token ? `Bearer ${store?.user?.token}` : ""
              },

              body: JSON.stringify({
                cart: cartStore.cart,
                note:  cartStore.deliveryData?.note,
                deliveryAddress: cartStore.deliveryData?.deliveryAddress,
                paymentMethod: "paypal"
              }),

            });

            const orderData = await response.json();
            // Three cases to handle:
            //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            //   (2) Other non-recoverable errors -> Show a failure message
            //   (3) Successful transaction -> Show confirmation or thank you message

            const errorDetail = orderData?.details?.[0];

            if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
              // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
              return actions.restart();
            } else if (errorDetail) {
              // (2) Other non-recoverable errors -> Show a failure message
              throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
            } else if (!orderData.purchase_units) {
              throw new Error(JSON.stringify(orderData));
            } else {
              // (3) Successful transaction -> Show confirmation or thank you message
              // Or go to another URL:  actions.redirect('thank_you.html');
              componentStore.setDefaults();
              cartStore.clearCart();
              router.push({name: "home"});
              toast.add({severity:'success', detail: 'Danke schön. Ihre Bestellung wurde zur Bearbeitung eingegangen', life: 7000});

            }
          } catch (error) {
            console.clear();
            toast.add({severity:'error', detail: 'Leider konnte Ihre Transaktion nicht verarbeitet werden', life: 6000});
            // resultMessage(
            //     `Sorry, your transaction could not be processed...<br><br>${error}`,
            // );
          }
        },

        onCancel: function (data) {
          // Show a cancel page or return to cart
          console.clear();
        },

        onError: function (e){
          console.clear();
        },

      })
      .render("#paypal-button-container");


}) // ./OnMounted



const sendDataToServer = async (paymentMethod, extReference) => {
  try {

    let err = "";

    const response = await axios.post(`${axios.defaults.baseURL}/orders`,

        JSON.stringify({
          cart: cartStore.cart,
          extReference,
          note:  cartStore.deliveryData.note,
          deliveryAddress:  cartStore.deliveryData.deliveryAddress,
          paymentMethod
        }),
        {
          headers: {
            "Authorization": store?.user?.token ? `Bearer ${store?.user?.token}` : ""
          },
        }
    )

    if (response.status === 201){
      return err
    }else {
      err = "Error Occurred";
      return err;
    }
  }catch (e) {

    let err = "";
    if (e.response) err = e.response.data;

    else if (e.request && e.request.status === 0) {
      err = `Leider wurde die Verbindung zum Server abgelehnt. Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut`;
    }else err = 'Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal';

    return err;
  }
}


// *************** Pay with Credit Card ******************

//Initiate Stripe checkout form
const initaiteStripeCcheckout = async () => {
  try {
    loading.value = true;

    const stripe = Stripe(stripePublicKey);

    const response = await axios.post("/payment-intent",
        JSON.stringify({
          cart: cartStore.cart,
          deliveryAddress:  cartStore.deliveryData.deliveryAddress,
          note: cartStore.deliveryData.note,
        }),
        {
          headers: {
            "Authorization": store?.user?.token ? `Bearer ${store?.user?.token}` : ""
          }
        }
    );



    const options = {
      clientSecret: response.data.clientSecrete,
      // Fully customizable with appearance API.
    };

// Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in a previous step
    const elements = stripe.elements(options);
    elements.update({locale: 'de'});

// Create and mount the Payment Element
    const paymentElement = elements.create('payment',{
      paymentMethodOrder: [ 'card']
    });
    paymentElement.mount('#payment-element');


    loading.value = false;
    ccActivated.value = true;

    const form = document.getElementById('payment-form');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();


      const { error, paymentIntent } = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payments/${response.data.paymentIntentId}`,
        },
        redirect: 'if_required',
      });

      paying.value = false;

      if (error) {
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Show error to your customer (for example, payment
        // details incomplete)

        console.log(error.message)


      } else {



        //Send purchase order to backend
        paying.value = true;
        const err = await sendDataToServer('cc', response.data.paymentIntentId);

        if (err){
          paying.value = false;
          return toast.add({severity:'error', detail: err, life: 6000});
        }


        paying.value = false;
        cartStore.clearCart();
        router.push({name: "home"})
        toast.add({severity:'success', detail: 'Danke schön. Ihre Bestellung wurde zur Bearbeitung eingegangen', life: 7000});
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    });


  }catch (e) {

  }
}


</script>

<template>

  <div class="container-fluid mt-5">
    <div class="row justify-content-center">


      <div class="col-lg-7">

        <h4 class="mb-2">Lieferadresse</h4>

        <form @submit.prevent="processOrder">

          <!-- ...........    delivery address ...............   -->
          <div class="row">

            <!-- Name-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Name
                <span class="text-danger">*</span></small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
                <input type="text" required disabled class="form-control shadow-none"
                       :value="cartStore?.deliveryData?.deliveryAddress?.name">
              </div>
            </div>

            <!--Street Name-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Straße
                <span class="text-danger">*</span></small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
                <input type="text" required disabled class="form-control shadow-none"
                       :value="cartStore?.deliveryData?.deliveryAddress?.street">
              </div>
            </div>

            <!--House Number-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Hausnummer
                <span class="text-danger">*</span></small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-home"></span></div>
                <input type="text" class="form-control shadow-none" required disabled
                       :value="cartStore?.deliveryData?.deliveryAddress?.houseNumber">
              </div>
            </div>

            <!--PostCode-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Postleitzahl
                <span class="text-danger">*</span></small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
                <input type="text" disabled
                       class="form-control shadow-none"  required
                       :value="cartStore?.deliveryData?.deliveryAddress?.postCode">
              </div>
            </div>

            <!--City-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Stadt
                <span class="text-danger">*</span></small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
                <input type="text" disabled
                       class="form-control shadow-none" :value="cartStore?.deliveryData?.deliveryAddress?.town">
              </div>
            </div>

            <!--Floor-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Etage</small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
                <input type="text" disabled
                       class="form-control shadow-none" :value="cartStore?.deliveryData?.deliveryAddress?.floor">
              </div>
            </div>

            <!--Phone-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Telefonnummer
                <span class="text-danger">*</span></small>
              <div class="input-group">
                <div class="input-group-text">+49</div>
                <input type="text" required disabled
                       class="form-control shadow-none" :value="cartStore?.deliveryData?.deliveryAddress?.phone">
              </div>
            </div>


            <!--Note-->
            <div class="col-lg-6 mb-3">
              <small class="fw-bold float-start">Anmerkung hinzufügen (freiwillig)</small>
              <div class="input-group">
                <div class="input-group-text"><span class="pi pi-map-marker"></span></div>
                <input type="text" disabled
                       class="form-control shadow-none" :value="cartStore?.deliveryData?.note">
              </div>
            </div>

          </div>

        </form>
        <br>
      </div>



      <div class="col-lg-5">
        <h5 class="text-center fw-bold">Warenkorb</h5>
        <div class="container-fluid">

          <template v-for="(item, index) in cartStore.cart" :key="index">
            <div class="row" style="font-size: 0.8em">
              <div class="col-1"><b>{{ item.qty }}x</b></div>
              <div class="col">
                <span class="text-capitalize">{{ item.name }} </span><br>
                <small class="text-muted" v-if="item.selectedChoice">{{ item.selectedChoice }}</small>
                <small class="text-light" v-else>.</small>
              </div>
              <div class="col" style="text-align: right;">
                {{ formatNumber(item.price * item.qty) }} {{ currency }}
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

    </div> <!--  ./row    -->


    <div class="row justify-content-center my-3">
      <div class="col-lg-6">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8">

              <Button label="Barzahlung" :disabled="paying"
                      :loading="loading" type="button" @click="confirmDialog.showModal()"
                      class="p-button p-button-success w-100 my-3 px-4 py-2"/>
              <br>

              <div id="paypal-button-container" v-show="!paying"></div>

              <Button label="Kreditkarte" :disabled="paying" v-if="!ccActivated"
                      :loading="loading" type="button" @click="initaiteStripeCcheckout"
                      class="p-button w-100 my-3 px-4 py-2" icon="pi pi-credit-card"/>

            </div>
          </div>




          <form id="payment-form">
            <br>
            <div id="payment-element">
              <!-- Elements will create form elements here -->
            </div>
            <div class="text-center" v-if="ccActivated">
              <button id="submit" type="submit" class="btn btn-primary my-3" v-if="!loading" :disabled="paying">
               <span v-if="paying" class="spinner-border spinner-border-sm"></span>
                Bezahlen ({{ formatNumber(cartStore.total) }} {{ currency }})
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>


      <!--    Confirm Dialog  -->
    <dialog ref="confirmDialog" style="border: none;" class="p-5">
    <h6 class="text-center my3">Barzahlung bestätigen?</h6>
    <div class="text-center">
      <button class="btn btn-secondary btn-sm mx-3" @click="confirmDialog.close()">Stornieren</button>
      <button class="btn btn-primary btn-sm" @click="processOrder">Fortfahren</button>
    </div>
    </dialog>

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