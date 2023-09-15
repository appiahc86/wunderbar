<script setup>

import {useRouter} from "vue-router";
import Sidebar from "primevue/sidebar";
import {ref} from "vue";
import Dialog from "primevue/dialog";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Avatar from "primevue/avatar";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import {useComponentStore} from "@/store/componentStore";
import {useHomeStore} from "@/store/home";
import PasswordReset from "@/components/auth/PasswordReset.vue";
import UserProfile from "@/components/user/UserProfile.vue";

const router = useRouter();
const store = useHomeStore();
const componentStore = useComponentStore();

//Open Auth dialog
const openAuth = () => {
  componentStore.setDefaults();
  componentStore.authDialog = true;
}

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
            <span v-if="store.isLoggedIn">
<!--              <Avatar icon="pi pi-user" class="mr-2" size="small" shape="circle" style="cursor: pointer;" />-->
              <div class="dropdown dropstart">
                 <Avatar icon="pi pi-user" class="me-3" data-bs-toggle="dropdown" aria-expanded="false"
                         size="small" shape="circle" style="cursor: pointer;" />
                <ul class="dropdown-menu">
                  <li><h6 class="dropdown-item">
<!--                    <span></span>-->
                    <b class="single-line">&nbsp;
                      {{ store.user.name.length > 10 ? store.user.name.slice(0, 10) + '...' : store.user.name }}</b>
                  </h6></li>
                  <li>

                    <a class="dropdown-item" style="cursor: pointer;"
                       @click="componentStore.setDefaults(); componentStore.userProfileDialog = true;">
                       <span>&#128100;</span>
                      &nbsp;Profil</a>
                  </li>
                    <li><a class="dropdown-item" style="cursor: pointer;">
                    <span class="pi pi-thumbs-up"></span>
                    &nbsp; Aufträge
                  </a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" style="cursor: pointer;" @click="store.logout()">
                    <span class="pi pi-sign-out"></span>
                    &nbsp; Ausloggen
                  </a></li>
                </ul>
              </div>
            </span>

            <span class="pi pi-bars bars" @click="componentStore.navigationDialog = true"></span>
          </div>
        </div>

      </div>
    </nav>


<!--  sideBar  -->
    <Sidebar v-model:visible="componentStore.navigationDialog" position="top" class="h-50">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-sm-4">
            <div class="text-center">
              <ul class="list-group text-center fw-bold navbar-menu">
                <li class="list-group-item menu-list border-0">heim</li>
                <li class="list-group-item menu-list border-0" v-if="!store.isLoggedIn"
                    @click="openAuth">Anmelden / Account erstellen</li>
                <li class="list-group-item menu-list border-0">Über uns</li>
                <li class="list-group-item menu-list border-0">Kontaktiere uns</li>
                <li class="list-group-item menu-list border-0"
                v-if="store.isLoggedIn">Hey! Innocent</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  </header>

<!-- Auth dialog-->
  <Dialog v-model:visible="componentStore.authDialog" header=" " :style="{ width: '50vw' }"
          :breakpoints="{ '960px': '75vw', '641px': '100vw' }" position="center" :modal="true">
    <div class="container-fluid container-lg">
      <div class="row">
        <TabView>
          <TabPanel header="Anmelden">
            <Login />
          </TabPanel>
          <TabPanel header="Account erstellen">
            <Register />
          </TabPanel>
        </TabView>
      </div>
    </div>
  </Dialog>

<!--  Password Reset Dialog-->
  <Dialog v-model:visible="componentStore.passwordResetDialog" header=" " :style="{ width: '50vw' }"
          :breakpoints="{ '960px': '75vw', '641px': '100vw' }" position="center" :modal="true">
    <div class="container-fluid container-lg">
      <div class="row">
        <PasswordReset />
      </div>
    </div>
  </Dialog>


  <!--  User profile Dialog-->
  <Dialog v-model:visible="componentStore.userProfileDialog" header="Profil" :style="{ width: '50vw' }"
          :breakpoints="{ '960px': '75vw', '641px': '100vw' }" position="center" :modal="true">
    <div class="container-fluid container-lg">
      <div class="row">
        <UserProfile />
      </div>
    </div>
  </Dialog>

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

.single-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>