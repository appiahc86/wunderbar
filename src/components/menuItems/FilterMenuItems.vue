<script setup>
import Skeleton from "primevue/skeleton";
import {computed, reactive, ref, watch} from "vue";
import Paginator from "primevue/paginator";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { formatNumber, currency } from "@/functions";
import {filterMenuItems} from "@/requests/menuItems/filterMenuItems";
import { useHomeStore } from "@/store/home";
import {useCartStore} from "@/store/cart";
import {useComponentStore} from "@/store/componentStore";
import Menu from "@/components/menu/Menu.vue";
import {useRoute} from "vue-router";

const route = useRoute();
const cartStore = useCartStore();
const componentStore = useComponentStore();
const page = ref(1);
const loading = ref(false);
const pageSize = ref(8);
const totalRecords = ref(0);
const menuItems = ref([]);
const path = ref('');
const description = ref('');
const addToCartData = reactive({
  name: '', id: null, price: 0, menu: '', menuId: null,
  choiceOf: [], image: '', qty: 1, selectedChoice: null
})

//reset Add to cart Data
const resetAddToCartData = () => {
  addToCartData.name = ''; addToCartData.id = null; addToCartData.price = 0;
  addToCartData.menu = ''; addToCartData.menuId = null; addToCartData.choiceOf = [];
  addToCartData.image = ''; addToCartData.qty = 1; addToCartData.selectedChoice = null;
}

//Open Add to cart dialog
const openAddToCartModal = (menuItem) => {
  resetAddToCartData();
  componentStore.setDefaults();
  addToCartData.name = menuItem.name; addToCartData.id = menuItem.id;
  addToCartData.price = menuItem.price; addToCartData.menu = menuItem.menu;
  addToCartData.menuId = menuItem.menuId; addToCartData.choiceOf = JSON.parse(menuItem.choiceOf);
  addToCartData.image = menuItem.image;
  componentStore.addToCartDialog = true;
}

//Add to Cart total
const addToCartTotal = computed(() => {
  if (addToCartData.selectedChoice)
    return parseFloat(addToCartData.qty) * parseFloat(addToCartData.selectedChoice.price);
  else return parseFloat(addToCartData.qty) * parseFloat(addToCartData.price);
})

//load menu items
const fetchMenuItems = async () => {
  loading.value = true;
  const data = await filterMenuItems(
      route.params.id,
      page.value,
      pageSize.value);
  if (data.error) return console.log(data.error);
  // if (data.error) return toast.add({severity:'warn', detail: `${data.error}`, life: 4000});
  menuItems.value = data.menuItems;
  path.value = data.path;
  totalRecords.value = data.totalRecords;
  loading.value = false;
  window.scrollTo({top: 50})
}

  fetchMenuItems();

watch(() => route.params.slug, () => {
  fetchMenuItems();
})



// Show item description
const showDescription = (e, des) => {
  e.stopPropagation();
  description.value = ''
  description.value = des;
  componentStore.setDefaults();
  componentStore.descriptionDialog = true;
}

const onPage = (event) => {
  page.value = event.page + 1;
  fetchMenuItems();
};

//Select Choice
const selectChoice = (e, choice) => {
  addToCartData.selectedChoice = null;
  const choices = document.querySelectorAll(".choice");
  for (const choice of choices) {
    choice.classList.remove('choice-active');
  }

  if (e.target.classList.contains("float-end")){
    e.target.parentNode.classList.add('choice-active');
  }else  e.target.classList.add('choice-active');

  addToCartData.selectedChoice = choice
}

//Add to cart
const addToCart = () => {
  cartStore.addToCart({...addToCartData, choiceOf: undefined, image: undefined});
  componentStore.setDefaults();
  resetAddToCartData();
}


</script>

<template>
  <div>

    <div class="container-fluid">
      <div class="d-lg-none mb-2 mt-3 card shadow p-2"><Menu/></div>

      <div class="fw-bold my-4 text-center" v-if="loading">
        <Skeleton style="width: 150px;" class="mx-auto"></Skeleton>
      </div>

      <div class="fw-bold my-4 text-center" v-else>
        <mark class="text-capitalize">{{ menuItems[0]?.menu || 'Kein Eintrag gefunden' }}</mark>
      </div>


      <div class="row my-3">

        <!--  If loading is complete  -->
        <template v-if="!loading">
          <template v-if="menuItems.length">
            <div class="col-md-6 mb-3" v-for="menuItem in menuItems" :key="menuItem.id">
              <div class="card shadow shadow-sm h-100 menu-item-card" @click="openAddToCartModal(menuItem)">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs fw-bold mb-1 text-capitalize" style="font-size: 0.9em;">
                        {{ menuItem.name }}
                        <span class="pi pi-info-circle menu-item-info" v-if="menuItem.description"
                              title="Weitere Informationen anzeigen" style="z-index: 100;"
                              @click="showDescription($event, menuItem.description)"></span>
                      </div>
                      <div class="h6 mb-0 fw-bold">
                        <small class="text-muted" style="font-size: 0.85em;" :title="menuItem.shortDescription"
                               v-if="menuItem.shortDescription.length > 40">
                          {{ menuItem.shortDescription.substring(0,40) }}...
                        </small>
                        <small class="text-muted" style="font-size: 0.85em;" v-else>
                          {{ menuItem.shortDescription.substring(0,40) }}
                        </small>
                      </div>
                    </div>
                    <div class="col-auto">
                      <img :src="path + menuItem.image" alt="image"
                           class="rounded-3 menu-item-img" v-if="menuItem.image">
                      <img src="/img/dummy_200x200.svg" alt="image"
                           class="rounded-3 menu-item-img" v-else>
                    </div>
                  </div>
                  <br>
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="h6 mb-0 fw-bold" style="font-size: 0.9em;">
                        {{ formatNumber(menuItem.price) }} {{ currency }}</div>
                    </div>
                    <div class="col-auto">
                      <img src="/img/plus.svg" alt="plus icon" class="mt-0">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>   <!--  ./ If loading is complete  -->


        <template v-if="menuItems.length < 2 && !loading">
          <div style="margin-bottom: 10rem;"></div>
        </template>



        <template v-if="!loading">
          <Paginator :rows="pageSize" :totalRecords="totalRecords" @page="onPage($event)"
              :alwaysShow="false" :class="{'invisible': loading}"></Paginator>
        </template>


        <!--  If loading   -->
        <template v-if="loading">
          <template v-for="num in 4" :key="num">
            <div class="col-md-6 mb-3">
              <div class="card shadow shadow-sm h-100 menu-item-cad">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs fw-bold mb-1 text-capitalize" style="font-size: 0.9em;">
                        <Skeleton class="mb-2 w-25"></Skeleton>
                      </div>
                      <div class="h6 mb-0 fw-bold">
                        <small class="text-muted">
                          <Skeleton class="mb-2 w-50"></Skeleton>
                        </small>
                      </div>
                    </div>
                    <div class="col-auto">
                      <Skeleton class="mb-2 menu-item-img"></Skeleton>
                    </div>
                  </div>
                  <br>
                  <div class="row no-gutters align-items-center">
                    <Skeleton class="w-100"></Skeleton>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>


        <!--    description dialog    -->
        <Dialog v-model:visible="componentStore.descriptionDialog" header=" " :style="{ width: '50vw' }"
                :breakpoints="{ '960px': '75vw', '641px': '100vw' }" position="bottomleft">
          <div class="container-fluid">
            <div class="row">
              <div class="col">
                <div v-html="description"></div>
              </div>
            </div>
          </div>
        </Dialog>


        <!--    Add to Cart dialog    -->
        <Dialog v-model:visible="componentStore.addToCartDialog" header=" " :style="{ width: '80vw' }"
                :breakpoints="{ '960px': '85vw', '641px': '100vw' }" position="center"
                :modal="true">
          <div class="container-fluid container-lg">
            <div class="row justify-content-center">
              <div class="col-md-7" v-if="addToCartData.choiceOf.length">
                <template v-if="addToCartData.choiceOf.length">
                  <h5>verfügbare Auswahlmöglichkeiten</h5>
                  <template v-for="(choice, index) in addToCartData.choiceOf" :key="index">
                    <h6 class="border border-1 p-2 choice" @click="selectChoice($event, choice)">
                      {{ choice.name }}
                      <span class="float-end">{{ formatNumber(choice.price) }} {{ currency }}</span>
                    </h6>
                  </template>
                </template>

              </div>
              <div class="col-md-5">
                <div class="text-center">
                  <img v-if="addToCartData.image" :src="path + addToCartData.image"
                       alt="image"  class="img-fluid rounded-3">
                  <img v-else src="/img/dummy_200x200.svg" alt="image" class="img-fluid rounded-3">
                </div>
                <br>
                <h5 class="fw-bold text-capitalize mb-2">{{ addToCartData.name }}</h5>
                <h6>{{ formatNumber(addToCartData.price) }} {{ currency }}</h6><br>

                <div class="text-center">
                  <div class="d-inline-flex" style="font-size: 2em;">
                    <img src="/img/minus.svg" alt="minus-icon" class="image-buttons"
                         :class="{'inactive-image-button': addToCartData.qty < 2}"
                         @click="addToCartData.qty >1 ? addToCartData.qty-- : ''">&nbsp;
                    <h6 class="m-auto">{{ addToCartData.qty }}</h6>&nbsp;
                    <img src="/img/plus.svg" alt="plus-icon" class="image-buttons"
                         @click="addToCartData.qty++">
                  </div>
                  <br>
                  <Button :label="`addiere ${addToCartData.qty} für ${formatNumber(addToCartTotal)} ${currency}`"
                          type="button" class="p-button  p-button-rounded mt-2 px-4 py-2"
                          @click="addToCart"/>
                </div>

              </div>
            </div>
          </div>
        </Dialog>



      </div>
    </div>
  </div>

</template>

<style scoped>
.menu-item-card:hover {
  cursor: pointer;
  background: #f5f4f4;
}
.menu-item-img {
  width: 60px !important;
  height: 60px !important;
}
.menu-item-info {
  font-size: 1.3em;
  z-index: 10;
}

.image-buttons {
  cursor: pointer;
}
.inactive-image-button {
  filter: grayscale(100%);
  opacity: 0.9;
  cursor: auto !important;
}

.choice {
  cursor: pointer;
}
.choice:hover {
  opacity: 0.7;
}
.choice-active {
  background: indianred;
  color: white;
}

</style>