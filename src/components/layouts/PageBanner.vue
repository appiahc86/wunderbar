<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  }
});
</script>


<template>
  <div class="banner-container">
    <div class="banner" style="background-image: url('/img/271_italian_pizza_107.webp')">
      <div class="title">
        <span>
          <router-link :to="{name: 'home'}" class="text-decoration-none text-white">MENÜKARTE</router-link>
        </span>
        <span> / </span>
        <span class="fw-bold">{{ title }}</span>
      </div>
      <div class="banner-logo my-3">
        <img src="/img/logo_big.png" alt="logo" class="img-fluid rounded">
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  height: 20em;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: grey;
  background-blend-mode: multiply;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
}
@media screen and (max-width: 600px) {
  .banner {
    height: 18em;
  }
}
.title {
  padding: 0.6rem 2rem;
  background: #cccccc4c;
  border-radius: 20px;
}
.banner-logo img{
  width: 140px;
  height: 120px
}
</style>
