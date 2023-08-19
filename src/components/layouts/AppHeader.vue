<script setup>


</script>

<template>
  <header class="">
    <nav class="navbar navbar-expand navbar-light shadow shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="/logo.png" alt="logo" height="40">
          <span class="brand-name fw-bold" translate="no">Pizza Wunderbar</span>
        </a>


        <div class="row justify-content-end">
          <div class="collapse navbar-collapse" id="navbarText">
            <span class="pi pi-bars bars"></span>
          </div>
        </div>


      </div>
    </nav>
  </header>
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
</style>