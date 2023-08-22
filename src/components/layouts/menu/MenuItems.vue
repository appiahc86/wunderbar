<script setup>
import Skeleton from "primevue/skeleton";
import Upper from "@/components/layouts/Upper.vue";
</script>

<template>
  <div>

    <Upper />

    <div class="container-fluid">

      <div class="row mb-3">

        <h4 class="text-black-50 my-3"><b>Menu Items</b></h4>


        <div class="col-md-6 mb-3">
          <div class="card shadow shadow-sm h-100 menu-item-card">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs fw-bold mb-1" style="font-size: 0.9em;">
                    Pizza Pastirma &nbsp; <span class="pi pi-info-circle menu-item-info"></span>
                  </div>
                  <div class="h6 mb-0 fw-bold">
                    <small class="text-muted" style="font-size: 0.85em;">mit Pastirma, Feta, Zwiebeln</small>
                  </div>
                </div>
                <div class="col-auto">
                  <img src="/img/classic.jpg" alt="image" class="rounded-3 menu-item-img">
                </div>
              </div>
              <br>
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="h6 mb-0 fw-bold" style="font-size: 0.9em;">10,50 €</div>
                </div>
                <div class="col-auto">
                  <img src="/img/plus.svg" alt="plus icon" class="mt-0">
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="col-md-6 mb-3">
          <div class="card shadow shadow-sm h-100 menu-item-card">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs fw-bold mb-1" style="font-size: 0.9em;">
                    Pizza Mozzarella &nbsp; <span class="pi pi-info-circle menu-item-info"></span>
                  </div>
                  <div class="h6 mb-0 fw-bold">
                    <small class="text-muted" style="font-size: 0.85em;">mit Mozzarella, Tomaten und Getrockneten Basilikum</small>
                  </div>
                </div>
                <div class="col-auto">
                  <img src="/img/classic.jpg" alt="image" class="rounded-3 menu-item-img">
                </div>
              </div>
              <br>
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="h6 mb-0 fw-bold" style="font-size: 0.9em;">9,90 €</div>
                </div>
                <div class="col-auto">
                  <img src="/img/plus.svg" alt="plus icon" class="mt-0">
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="col-md-6 mb-3">
          <div class="card shadow shadow-sm h-100 menu-item-card">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs fw-bold mb-1" style="font-size: 0.9em;">
                    Pizza Quattro Stagioni &nbsp; <span class="pi pi-info-circle menu-item-info"></span>
                  </div>
                  <div class="h6 mb-0 fw-bold">
                    <small class="text-muted" style="font-size: 0.85em;">mit Salami, Schinken, Paprika und Pilzen</small>
                  </div>
                </div>
                <div class="col-auto">
                  <img src="/img/classic.jpg" alt="image" class="rounded-3 menu-item-img">
                </div>
              </div>
              <br>
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="h6 mb-0 fw-bold" style="font-size: 0.9em;">9,90 €</div>
                </div>
                <div class="col-auto">
                  <img src="/img/plus.svg" alt="plus icon" class="mt-0">
                </div>
              </div>
            </div>
          </div>
        </div>

<!--        <Skeleton class="mb-2"></Skeleton>-->
<!--        <Skeleton width="10rem" class="mb-2"></Skeleton>-->
<!--        <Skeleton width="5rem" class="mb-2"></Skeleton>-->
<!--        <Skeleton height="2rem" class="mb-2"></Skeleton>-->
<!--        <Skeleton width="10rem" height="4rem"></Skeleton>-->

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
  width: 60px;
  height: 60px;
}
.menu-item-info {
  font-size: 1.3em;
  z-index: 10;
}
</style>