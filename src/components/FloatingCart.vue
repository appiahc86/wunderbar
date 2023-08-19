<script setup>


</script>

<template>
  <button class="floating-button" data-bs-toggle="" data-bs-target="#cartButton" aria-controls="offcanvasBottom">
    <span>
    <span class="pi pi-shopping-cart"></span>
      <sup class="text-light fw-bold">&nbsp;3</sup>
  </span>
  </button>

  <div class="offcanvas offcanvas-bottom h-100" tabindex="-1" id="cartButton" aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel">Your Order</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body small">
      Big screen cart Button triggered
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