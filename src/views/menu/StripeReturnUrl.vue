<script setup>

import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute();
const paymentIntent = ref(route.params.payment_intent);

console.log(paymentIntent.value)

</script>

<template>
<div class="">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit. A beatae culpa cum cumque debitis delectus
  doloremque illum, in inventore, maiores minima molestiae natus nemo quidem quo quod reprehenderit tempore
  vel veniam voluptas. Architecto atque consectetur dicta error id iure maiores nam obcaecati odit quae
  quaerat, qui quia similique, ut voluptas voluptatem voluptatum?
  Accusamus accusantium ad aliquam asperiores aspernatur at consequuntur cumque, eaque id iusto laudantium
  <br><br><br>
  <h2>{{ paymentIntent }}</h2>
</div>
</template>

<style scoped>

</style>