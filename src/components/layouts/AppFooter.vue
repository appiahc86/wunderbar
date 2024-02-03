<script setup>

</script>

<template>
<div class="pt-4">
<footer class="py-4">

  <div class="container">
    <div class="row">

      <div class="col-md-6">
        <div class="text-center">
          <h2>KONTAKT</h2>
          <div class="fst-italic">
            Pizza Wunderbar <br>
            Frankfurter Straße 10 <br>
            38122 Braunschweig <br>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="text-center">
          <h2>INFO</h2>
          <div>
            <a class="text-decoration-none text-white" style="cursor: pointer;"
                @click="router.push({name: 'colofon'})">Impressum</a> <br>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div class="text-center my-5" translate="no">&copy; 2024 Pizza-Wunderbar</div>
</footer>
</div>
</template>

<style scoped>
footer {
  background: #0a3847;
  color: white;
}
</style>