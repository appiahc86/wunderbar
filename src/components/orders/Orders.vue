<script setup>
import {ref} from "vue";
import axios from "@/axios";
import {useHomeStore} from "@/store/home";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import moment from "moment";
import Dialog from "primevue/dialog";
import {currency, formatNumber} from "@/functions";

const store = useHomeStore();
const loading = ref(false);
const detailsLoading = ref(false);
const orderDetailsDialog = ref(false);
const orders = ref([]);
const orderDetails = ref([]);

//load orders
const loadOrders = async () => {

  try {

    loading.value = true;

    const response = await  axios.get(
        '/orders',

        {
          headers: {
            'Authorization': `Bearer ${store.user.token}`
          }
        }
    )

    if (response.status === 200) {
      orders.value = response.data.orders;
    }

  }catch (e) {
    if (e.response) return toast.add({severity:'warn', detail: e.response.data, life: 4000});

    if (e.request && e.request.status === 0)
      return toast.add({severity:'warn', detail: `Leider wurde die Verbindung zum Server abgelehnt. Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut`, life: 4000});

    return toast.add({severity:'warn', detail: 'Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal', life: 4000});
  }finally {
    loading.value = false;
  }

}
loadOrders();


//View order details
const viewOrderDetails = async (id) => {
  try {

    orderDetailsDialog.value = true;
    orderDetails.value = [];
    detailsLoading.value = true;

    const response = await axios.get('/orders/details',
        {
          params: { id },
          headers: {'Authorization': `Bearer ${store.user.token}`}
        }
    )
    if (response.status === 200){
      orderDetails.value = response.data.order;
    }

  }catch (e) {
    if (e.response) return toast.add({severity:'warn', detail: e.response.data, life: 4000});

    if (e.request && e.request.status === 0)
      return toast.add({severity:'warn', detail: `Leider wurde die Verbindung zum Server abgelehnt. Bitte überprüfen Sie Ihre Internetverbindung oder versuchen Sie es später erneut`, life: 4000});

    return toast.add({severity:'warn', detail: 'Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es später noch einmal', life: 4000});
  }finally {
    detailsLoading.value = false;
  }
}


//Get status in German
const getStatus = (payload) => {
  let returnValue = "warten"
  switch (payload) {
    case "waiting": returnValue = "warten";
    break;
    case "delivering": returnValue = "liefern";
    break;
    case "delivered": returnValue = "Geliefert";
    break;
    case "canceled": returnValue = "Abgesagt";
      break;
  }
  return returnValue;
}

</script>

<template>

  <div class="container mt-3 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="table-responsive mt-2">
          <!--        Table -->
          <DataTable :value="orders" :paginator="true" :rows="10" dataKey="id" :loading="loading"
                     class="p-datatable-sm p-datatable-striped p-datatable-hoverable-rows p-datatable-gridlines"
                     paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport
                   RowsPerPageDropdown" responsiveLayout="scroll" filterDisplay="menu" :rowsPerPageOptions="[10, 15, 25]"
                     currentPageReportTemplate="Zeigt {first} bis {last} von {totalRecords} Einträgen">

            <template #empty>
              Kein Daten gefunden.
            </template>

            <template #loading>
              <h6 class="text-white fw-bold">Daten werden geladen. Bitte warten. <span class="spinner-border spinner-border-sm"></span></h6>
            </template>
            <Column field="id" header="Auftragsnummer" sortable class="data-table-font-size">
              <template #body="{data}">
                <td>
                  {{ data.id }}
                </td>
              </template>
            </Column>

            <Column field="orderDate" header="Datum"  class="data-table-font-size">
              <template #body="{data}">
                <td>
                  {{ moment(data.orderDate).format("YYYY-MM-DD h:mm:ss a") }}
                </td>
              </template>
            </Column>

            <Column field="total" header="Gesamt"  class="data-table-font-size">
              <template #body="{data}">
                <td class="text-capitalize">{{ formatNumber(data.total) }} {{ currency }}</td>
              </template>
            </Column>

            <Column field="deliveryStatus" header="Lieferstatus"  class="data-table-font-size">
              <template #body="{data}">
                <td class="text-capitalize">{{ getStatus(data.deliveryStatus) }}</td>
              </template>
            </Column>

            <Column field="numberOfItems" header="Anzahl der Teile"  class="data-table-font-size">
              <template #body="{data}">
                <td>{{ data.numberOfItems }}</td>
              </template>
            </Column>

            <Column header="Details anzeigen" class="data-table-font-size">
              <template #body="{data}">
                <td>
                <span class="pi pi-eye" @click="viewOrderDetails(data.id)"  style="cursor: pointer;"
                      title="Details anzeigen"></span>
                </td>
              </template>
            </Column>

          </DataTable>
        </div>
      </div>
    </div>
  </div>


<!-- order details dialog-->
  <Dialog v-model:visible="orderDetailsDialog" header="Bestelldetails" :style="{ width: '60vw' }"
          :breakpoints="{ '960px': '75vw', '641px': '100vw' }" position="center" :modal="true">
    <div class="container-fluid">

      <div v-if="detailsLoading">
        <h5 class="text-center my-4"><span class="spinner-border"></span></h5>
      </div>

<!--      Else -->
      <div v-else>

        <div class="order-status text-center">
          <h2><span>
            <img src="/img/folded-hands-emoji-48.png" alt="" v-if="orderDetails[0].deliveryStatus === 'waiting'">
            <img src="/img/motor-scooter-48.png" alt="" v-if="orderDetails[0].deliveryStatus === 'delivering'">
            <img src="/img/handshake-48.png" alt="" v-if="orderDetails[0].deliveryStatus === 'delivered'">
            <img src="/img/cross-mark-48.png" alt="" v-if="orderDetails[0].deliveryStatus === 'canceled'">
          </span>
            {{ getStatus(orderDetails[0].deliveryStatus) }}</h2>
          
          <p>{{ moment(orderDetails[0].orderDate).format("YYYY-MM-DD")}}
            | {{ moment(orderDetails[0].orderDate).format("h:mm:ss a") }}</p>
        </div>


        <template v-if="orderDetails.length">
        <h5 class="mb-2 fw-bold">Deine Bestellung</h5>
        <template v-for="order in orderDetails" :key="order.orderDetailsId">
          <div class="row">
            <div class="col-2"><b>{{ order.qty }}x</b></div>
            <div class="col">
              <span class="text-capitalize">{{ order.menuItemName }} </span><br>
              <small class="text-muted" v-if="order.choiceOf">{{ order.choiceOf }}</small>
              <small class="text-light" v-else>.</small>
            </div>
            <div class="col" style="text-align: right;">
                        {{ formatNumber(order.price * order.qty) }} {{ currency }}
            </div>
          </div>
          <hr>
        </template>

        <div class="row">
          <h5 class="mb-2 fw-bold">Lieferdetails</h5>
          <address class="fst-italic">
           <span class="pi pi-map-marker"></span>
            <b>Straße: </b>{{ orderDetails[0].deliveryAddress.street }}<br>
            <b>Hausnummer: </b>{{ orderDetails[0].deliveryAddress.houseNumber }}<br>
            <b>Postleitzahl: </b>{{ orderDetails[0].deliveryAddress.postCode }} <br>
            <b>Stadt: </b>{{ orderDetails[0].deliveryAddress.town }} <br>
            <b>Etage: </b>{{ orderDetails[0].deliveryAddress.floor }} <br>
            <b>Telefonnummer: </b>{{ orderDetails[0].deliveryAddress.phone }} <br>
            <b>Notiz: </b>{{ orderDetails[0].note }} <br>

          </address>
        </div>

<!--        Summary -->
        <div class="py-4 px-3 mt-3" style="background: #f3f0f0;">
          <h5 class="mb-2 fw-bold">Zusammenfassung</h5>
          <div class="row mb-2">
            <div class="col">Produkte</div>
            <div class="col" style="text-align: right;">
              {{ formatNumber(orderDetails[0].total - orderDetails[0].deliveryFee) }} {{ currency }}
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">Lieferkosten</div>
            <div class="col" style="text-align: right;">
              {{ formatNumber(orderDetails[0].deliveryFee) }} {{ currency }}
            </div>
          </div>
          <div class="row mb-2">
            <div class="col"><b>Gesamt</b></div>
            <div class="col" style="text-align: right;">
              <b>{{ formatNumber(orderDetails[0].total) }} {{ currency }}</b>
            </div>
          </div>
        </div>

        </template>
      </div><!--      ./Else -->


    </div>
  </Dialog>


</template>

<style scoped>

</style>