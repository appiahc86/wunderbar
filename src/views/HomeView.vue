<script setup>
import {onMounted} from "vue";
import FloatingCart from "@/components/FloatingCart.vue";
import MenuItems from "@/components/layouts/menu/MenuItems.vue";

onMounted(() => {


})
</script>

<template>
<div class="">
<div class="container-fluid d-flex overflow-hidden" role="main">
  <div class="row">

    <div class="col-lg-3 d-none d-flex d-lg-block card shadow">

      <aside class="" style="max-height: 200px;">
        <h4 class="text-center fw-bold" style="margin-top: 40px;">Menü</h4>   <!-- Menu -->
        <div style="max-height: 50px !important; font-size: 0.9em;">

          <ul class="list-group text-center fw-bold">
            <li class="list-group-item menu-list" aria-current="true">Angebot</li>
            <li class="list-group-item menu-list">Pizza</li>
            <li class="list-group-item menu-list">Calzone</li>
            <li class="list-group-item menu-list">Pizzabrötchen</li>
            <li class="list-group-item menu-list">Kinder Pizza</li>
            <li class="list-group-item menu-list">Alkoholfreie Getränke</li>
          </ul>

        </div>

      </aside>



    </div><!--Col-lg-3-->


    <div class="col-lg-9 g-0">

      <MenuItems />

    </div>

  </div><!--Row-->

</div><!--Container-->

  <br><br><br><br>

  <FloatingCart />
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
