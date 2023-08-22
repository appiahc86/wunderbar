<script setup>
import Button from "primevue/button";

</script>

<template>
  <button class="floating-button" data-bs-toggle="offcanvas" data-bs-target="#cartButton" aria-controls="offcanvasBottom">
    <span>
    <span class="pi pi-shopping-cart"></span>
      <sup class="text-light fw-bold">&nbsp;3</sup>
  </span>
  </button>

  <div class="offcanvas offcanvas-bottom h-100" tabindex="-1" id="cartButton" aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header text-center">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel"></h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body small">
     <div class="container-fluid container-lg">
       <div class="row justify-content-center">
         <div class="col-lg-6">
           <h5 class="text-center fw-bold">Deine Bestellung</h5>
           <div class="container-fluid">
             <div class="row">
               <div class="col-2"><b>2x</b></div>
               <div class="col">
                 Pizza Sucuk <br>
                 <small class="text-muted">mit Sucuk, Jalapenos und Feta</small>
               </div>
               <div class="col" style="text-align: right;">9,90 €</div>
             </div>
             <div class="row">
               <div class="col-2">
                 <img src="/img/minus.svg" style="cursor: pointer;" alt="minus-icon">
               </div>
               <div class="col"></div>
               <div class="col" style="text-align: right;">
                 <img src="/img/plus.svg" style="cursor: pointer;" alt="plus-icon">
               </div>
             </div>
             <hr>

             <div class="row">
               <div class="col-2"><b>2x</b></div>
               <div class="col">
                 Pizza Funghi <br>
                 <small class="text-muted">mit frischen Champignons</small>
               </div>
               <div class="col" style="text-align: right;">9,00 €</div>
             </div>
             <div class="row">
               <div class="col-2">
                 <img src="/img/minus.svg" style="cursor: pointer;" alt="minus-icon">
               </div>
               <div class="col"></div>
               <div class="col" style="text-align: right;">
                 <img src="/img/plus.svg" style="cursor: pointer;" alt="plus-icon">
               </div>
             </div>  <hr>

             <div class="row">
               <div class="col-2"><b>1x</b></div>
               <div class="col">
                 Pizza Tuna <br>
                 <small class="text-muted">mit Thunfisch und Zwiebeln</small>
               </div>
               <div class="col" style="text-align: right;">10,50 €</div>
             </div>
             <div class="row">
               <div class="col-2">
                 <img src="/img/minus.svg" style="cursor: pointer;" alt="minus-icon">
               </div>
               <div class="col"></div>
               <div class="col" style="text-align: right;">
                 <img src="/img/plus.svg" style="cursor: pointer;" alt="plus-icon">
               </div>
             </div>  <hr>


             <div class="text-center">
               <Button label="Weitermachen" type="button" :loading="loading"
                       class="p-button  p-button-rounded my-4 px-4 py-2"/>
             </div>


           </div>

         </div>
       </div>
     </div>
    </div>
  </div>
</template>

<style scoped>
.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: grey;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>