<script setup>
import FilterMenuItems from "@/components/menuItems/FilterMenuItems.vue";
import Menu from "@/components/menu/Menu.vue";
import {onBeforeRouteLeave} from "vue-router";
import {useComponentStore} from "@/store/componentStore";

const componentStore = useComponentStore();
onBeforeRouteLeave(() => {
  componentStore.setDefaults();
})
</script>

<template>

    <div class="container-fluid" role="main">
      <div class="row">

        <div class="col-lg-3 d-none d-lg-block d-flex d-lg-block card shadow">

          <Menu />

        </div><!--Col-lg-3-->


        <div class="col-lg-9 g-0">

          <FilterMenuItems />

        </div>

      </div><!--Row-->

    </div><!--Container-->

    <br><br><br><br>

</template>

<style scoped>

</style>