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
  <aside class="d-none d-lg-block" style="max-height: 200px;">
    <h4 class="text-center fw-bold" style="margin-top: 40px;">Menü</h4>   <!-- Menu -->
    <div style="max-height: 50px !important; font-size: 0.9em;">

      <ul class="list-group text-center fw-bold">
        <li class="list-group-item menu-list text-capitalize"
            v-for="men in menu" :key="men.name">{{ men.name }}</li>
      </ul>

    </div>

  </aside>

  <div class="d-inline d-lg-none px-2">
    <template v-for="men in menu" :key="men.name">
        <span class="badge text-bg-secondary text-capitalize" style="cursor: pointer;"
        >{{ men.name }}</span>&nbsp;
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