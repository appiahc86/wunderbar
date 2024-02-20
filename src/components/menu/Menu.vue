<script setup>
import {useHomeStore} from "@/store/home";
import Skeleton from "primevue/skeleton";

const store = useHomeStore();

</script>

<template>
  <aside class="d-none d-lg-block" >
    <h4 class="text-center fw-bold" style="margin-top: 40px;">Menü</h4>   <!-- Menu -->
    <div style=" font-size: 0.9em;" class="mb-3">

      <template v-if="store.menuLoading">
        <ul class="list-group text-center fw-bold">
          <li v-for="men in 5" :key="men"
                       class="text-decoration-none  menu-list list-group-item text-capitalize">
            <Skeleton class="w-50 mx-auto"></Skeleton>
          </li>
        </ul>
      </template>

      <template v-else>
        <ul class="list-group text-center fw-bold">
          <router-link :to="{name: 'menu', params: {id: men.id, slug: men.slug}}"
                       v-for="men in store.menu" :key="men.name"
                       class="text-decoration-none  menu-list list-group-item text-capitalize">
            {{ men.name }}
          </router-link>
        </ul>
      </template>

    </div>

  </aside>


<!-- For smaller screens -->
  <template v-if="store.menuLoading">
    <div class="d-inline d-lg-none px-2">
      <template v-for="men in 5" :key="men">
        <span class="text-decoration-none">
        <span class="badge text-capitalize" style="cursor: pointer;">
         <Skeleton :style="{width: '10vw'}"></Skeleton>
        </span>&nbsp;
        </span>
      </template>
    </div>
  </template>

  <template v-else>
    <div class="d-inline d-lg-none px-2">
      <template v-for="men in store.menu" :key="men.name">
        <router-link :to="{name: 'menu', params: {id: men.id, slug: men.slug}}" class="text-decoration-none">
        <span class="badge text-bg-secondary text-capitalize" style="cursor: pointer;"
        >{{ men.name }}</span>&nbsp;
        </router-link>
      </template>
    </div>
  </template>

</template>

<style scoped>
aside {
  height: inherit !important;
}

.menu-list {
  cursor: pointer;
}
.menu-list:hover {
  background: saddlebrown;
  color: white !important;
}
</style>