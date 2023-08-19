<script setup>
import Button from "primevue/button";
import Upper from "@/components/layouts/Upper.vue";
import {onMounted} from "vue";
import FloatingCart from "@/components/FloatingCart.vue";

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

            <section>

              <div class="">
                <!--          Menu Item-->

                <Upper />

                <div data-bs-root-margin="0px 0px -40%"
                     class="scrollspy-example p-3 rounded-2 content mx-lg-5" tabindex="0">
                  <h4 class="fw-bold" id="Beliebt">Beliebt</h4>
                  <!-- Menu Item -->
                  
                  
                  
                  
<!--                  <div class="card mb-3 menu-card">-->
<!--                    <div class="container-fluid">-->

<!--                      <div class="row g-0">-->
<!--                        <div class="col-4" style="width: 60px; height:60px;">-->
<!--                          <img src="/img/classic.jpg" class="img-fluid rounded-3 mt-3" alt="image">-->
<!--                        </div>-->
<!--                        <div class="col-8">-->
<!--                          <div class="card-body">-->
<!--                            <h3 class="item-name mt-">-->
<!--                              Pizza Salami [Ø 32cm] erdsfsd&nbsp;-->
<!--                            </h3>-->
<!--                            <div class="" style="">-->
<!--                              <p class="card-text" style="font-size: 0.9em">This is a wider card with a little bit longer.</p>-->
<!--                              <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>-->
<!--                            </div>-->

<!--                          </div>-->
<!--                        </div>-->
<!--                      </div>-->




<!--                      <div class="row">-->
<!--                        <div class="col mt-4">-->
<!--                          $ 20.99-->
<!--                        </div>-->
<!--                        <div class="col">-->
<!--                          <h1 class="float-end ">-->
<!--                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />-->
<!--                          </h1>-->
<!--                        </div>-->
<!--                      </div>-->
<!--                      -->
<!--                    </div>-->
<!--                  </div>-->
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Pizza Tuna
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              mit Thunfisch und Zwiebeln <br>
                            </div>
                            <div class="menu-item-body">
                              Wahl aus: Ø 28cm, Ø 32cm oder Ø 40cm. <br>
                            </div>
                            <p class="item-price">10,50 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  
                  
                  
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Pizza Quattro Stagioni [Ø 32cm] &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              mit Salami, Schinken, Paprika und Pilzen <br>
                            </div>
                            <p class="item-price">14,50 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Calzone Stagioni &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              mit Salami, Schinken, Paprika und Champignons <br>
                            </div>
                            <p class="item-price">11,00 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div class="py-3 menu-bg" style="background-image: url('/img/pizza.webp')"></div>

                  <h4 id="Pizza" class="fw-bold">Pizza</h4>
                  <!-- Menu Item -->
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Pizza Salami&nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              Wahl aus: Ø 28cm, Ø 32cm oder Ø 40cm. <br>
                            </div>
                            <p class="item-price">9,00 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Pizza Margherita&nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              Wahl aus: Ø 28cm, Ø 32cm oder Ø 40cm. <br>
                            </div>
                            <p class="item-price">8,00 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Pizza Schinken&nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              Wahl aus: Ø 28cm, Ø 32cm oder Ø 40cm. <br>
                            </div>
                            <p class="item-price">9,00 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Pizza Salami und Schinken&nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              Wahl aus: Ø 28cm, Ø 32cm oder Ø 40cm. <br>
                            </div>
                            <p class="item-price">9,00 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Pizza Quattro Stagioni&nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              mit Salami, Schinken, Paprika und Pilzen <br>
                              Wahl aus: Ø 28cm, Ø 32cm oder Ø 40cm.
                            </div>
                            <p class="item-price">9,90 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div class="py-3 menu-bg" style="background-image: url('/img/calzone.webp')">

                    <!--              <img src="/img/calzone.avif" alt="pizza" class="img-fluid">-->
                  </div>

                  <h4 id="Calzone" class="fw-bold">Calzone</h4>
                  <!-- Menu Item -->
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Calzone Käse Bombe &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              mit Gouda, Feta,Mozzarella <br>

                            </div>
                            <p class="item-price">10,40 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Calzone Salami und Schinken &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              <br>

                            </div>
                            <p class="item-price">10,40 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Calzone Stagioni &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              mit Salami, Schinken, Paprika und Champignon<br>

                            </div>
                            <p class="item-price">11,00 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Calzone Veggie &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              mit Broccoli, Mais, Zwiebeln und Champignons, Gouda<br>

                            </div>
                            <p class="item-price">10,40 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div class="py-3 menu-bg" style="background-image: url('/img/Kindergerichte.webp')">
                  </div>

                  <h4 id="Kindergerichte" class="fw-bold">Kindergerichte</h4>
                  <!-- Menu Item -->
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Pizza Salami &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              mit Salami, Tomatensauce und Käse <br>

                            </div>
                            <p class="item-price">5,40 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Pizza Salami &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              mit Salami, Tomatensauce und Käse <br>

                            </div>
                            <p class="item-price">5,40 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Pizza Salami &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              mit Salami, Tomatensauce und Käse <br>

                            </div>
                            <p class="item-price">5,40 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Pizza Salami &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              mit Salami, Tomatensauce und Käse <br>
                            </div>
                            <p class="item-price">5,40 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="py-3 cat-bg" style="background-image: url('/img/Alkoholfreie.webp')">
                  </div>

                  <h4 class="fw-bold" id="Alkoholfreie">Alkoholfreie Getränke</h4>
                  <!-- Menu Item -->
                  <div class="card menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Coca-Cola 0,33l (EINWEG) &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              Coca-Cola steht für einzigartigen Geschmack, Erfrischung und Momente voller Lebensfreude. Die 0,33l <br>
                              Mehrwegflasche für die perfekte Erfrischung für jeden Tag - allein oder zu zweit.
                            </div>
                            <p class="item-price">3,65 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-9">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Coca-Cola 0,33l (EINWEG) &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              Coca-Cola steht für einzigartigen Geschmack, Erfrischung und Momente voller Lebensfreude. Die 0,33l <br>
                              Mehrwegflasche für die perfekte Erfrischung für jeden Tag - allein oder zu zweit.
                            </div>
                            <p class="item-price">3,65 €</p>
                          </div>
                        </div>

                        <div class="col-3">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                          <div style="justify-content: center; align-items: center">
                            <p>
                              <img src="/img/coke.webp" alt="coke" class="img-fluid">
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Coca-Cola 0,33l (EINWEG) &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              Coca-Cola steht für einzigartigen Geschmack, Erfrischung und Momente voller Lebensfreude. Die 0,33l <br>
                              Mehrwegflasche für die perfekte Erfrischung für jeden Tag - allein oder zu zweit.
                            </div>
                            <p class="item-price">3,65 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Coca-Cola 0,33l (EINWEG) &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              Coca-Cola steht für einzigartigen Geschmack, Erfrischung und Momente voller Lebensfreude. Die 0,33l <br>
                              Mehrwegflasche für die perfekte Erfrischung für jeden Tag - allein oder zu zweit.
                            </div>
                            <p class="item-price">3,65 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Coca-Cola 0,33l (EINWEG) &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              Coca-Cola steht für einzigartigen Geschmack, Erfrischung und Momente voller Lebensfreude. Die 0,33l <br>
                              Mehrwegflasche für die perfekte Erfrischung für jeden Tag - allein oder zu zweit.
                            </div>
                            <p class="item-price">3,65 €</p>
                          </div>
                        </div>
                        <div class="col-2">
                          <h1 class="float-end ">
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined class="mt-2" />
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  </div>
                </div>

            </section>




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
