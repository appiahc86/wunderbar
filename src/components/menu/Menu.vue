<script setup>
import {ref} from "vue";
import {listMenu} from "@/requests/menu";
import {useHomeStore} from "@/store/home";

const homeStore = useHomeStore()
const menu = ref([]);

const fetchMenu = async () => {
  const data = await listMenu(homeStore.token);
  if (data.error) return toast.add({severity:'warn', detail: `${data.error}`, life: 4000});
  menu.value = data.menu;
}
fetchMenu();

</script>

<template>
  <aside class="d-none d-lg-block" >
    <h4 class="text-center fw-bold" style="margin-top: 40px;">Menü</h4>   <!-- Menu -->
    <div style=" font-size: 0.9em;" class="mb-3">

      <ul class="list-group text-center fw-bold">
          <router-link :to="{name: 'menu', params: {slug: men.slug}}"
                       v-for="men in menu" :key="men.name"
            class="text-decoration-none  menu-list list-group-item text-capitalize">
            {{ men.name }}
          </router-link>

      </ul>

    </div>

  </aside>

  <div class="d-inline d-lg-none px-2">
    <template v-for="men in menu" :key="men.name">
      <router-link :to="{name: 'menu', params: {slug: men.slug}}" class="text-decoration-none">
        <span class="badge text-bg-secondary text-capitalize" style="cursor: pointer;"
        >{{ men.name }}</span>&nbsp;
      </router-link>
    </template>
  </div>

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
  color: white;
}
</style>