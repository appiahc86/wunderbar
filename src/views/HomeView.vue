<script setup>
import MenuItems from "@/components/menuItems/MenuItems.vue";
import Menu from "@/components/menu/Menu.vue";
import {onBeforeRouteLeave} from "vue-router";
import {useComponentStore} from "@/store/componentStore";

const componentStore = useComponentStore();
// onBeforeRouteLeave(() => {
//   componentStore.setDefaults();
// })
</script>

<template>
<div class="">
<div class="container-fluid" role="main">
  <div class="row">

    <div class="col-lg-3 d-none d-lg-block d-lg-block card shadow">

      <Menu/>

    </div><!--Col-lg-3-->


    <div class="col-lg-9 g-0">

      <MenuItems />

    </div>

  </div><!--Row-->

</div><!--Container-->

  <br><br><br><br>

</div>
</template>


<style scoped>

.menu-bg{
  height: 6em;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: grey;
  width: 100%
}

@media screen and (min-width: 800px) {
  .menu-bg {
    height: 10em;
  }
}


</style>
