<script setup>

import {useRouter} from "vue-router";
import Sidebar from "primevue/sidebar";
import {ref} from "vue";

const router = useRouter();
const visibleTop = ref(false);

</script>

<template>
  <header class="">
    <nav class="navbar navbar-expand navbar-light shadow shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand" @click="router.push({naem: 'home'})">
          <img src="/logo.png" alt="logo" height="40">
          <span class="brand-name fw-bold" translate="no">Pizza Wunderbar</span>
        </a>


        <div class="row justify-content-end">
          <div class="collapse navbar-collapse">
            <span class="pi pi-bars bars" @click="visibleTop = true"></span>
          </div>
        </div>


      </div>
    </nav>


<!--  sideBar  -->
    <Sidebar v-model:visible="visibleTop" position="top" class="h-50">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-sm-4">
            <div class="text-center">
              <ul class="list-group text-center fw-bold navbar-menu">
                <li class="list-group-item menu-list border-0">heim</li>
                <li class="list-group-item menu-list border-0">Anmelden / Account erstellen</li>
                <li class="list-group-item menu-list border-0">Über uns</li>
                <li class="list-group-item menu-list border-0">Kontaktiere uns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>

  </header>
</template>

<style scoped>
.bars {
  font-size: 1.5em;
  cursor: pointer;
  padding: 7px;
  z-index: 100;
}
.bars:hover {
  background: rgba(208, 208, 208, 0.46);
  border-radius: 50px;
}

.navbar-menu li:hover {
  background: #0c4128;
  color: white;
  cursor: pointer;
}
</style>