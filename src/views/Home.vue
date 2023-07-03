<script setup>
import Button from "primevue/button";
import {onMounted} from "vue";

onMounted(()=> {

var navbar = document.getElementById('navbar-example2');
var bounding = navbar.getBoundingClientRect();
var sticky = navbar.offsetTop;
window.addEventListener('scroll', function() {

  if (window.pageYOffset > sticky) {
    navbar.classList.add("fixed-top");
  } else if (bounding.top > -1) {
    navbar.classList.remove("fixed-top");
  }
});


})
</script>

<template>
<div class="">
<div class="container-fluid d-flex overflow-hidden" role="main">
  <div class="row">
    <div class="col-lg-9 g-0 left-section" style="width: calc(100% - 350px);">

            <section>

              <div class="">
                <!--          Menu Item-->
                <div class="card shadow mb-4 d-flex">
                  <div class="banner">  </div>
                  <div class="px-2 px-lg-5">
                    <h4 translate="no" class="mt-3">Pizza Wunderbar</h4>
                    <p>
                      <span class="pi pi-clock"></span>&nbsp;
                      <small>Lieferung ab 14:00</small>

                      <span class="d-none d-md-inline">
                   <span class=""> &#10038;</span>
                <span class=""> &#127949; <small>3.00 €&nbsp;</small></span>
                <span class="pi pi-shopping-bag"></span>
                <span class=""><small>&nbsp;Min. 30.00 €</small></span>
                </span>

                    </p>
                    <p>
                      <small>
                        Bei diesem Restaurant kannst du Stempel sammeln. Stelle beim Bestellabschluss
                        bitte sicher, dass du dich für unseren Newsletter angemeldet hast,
                        um deine Stempel per E-Mail zu erhalten.
                      </small>

                    </p>

                    <!--         scrollspy     -->
                    <nav id="navbar-example2" class="mb-2 w-100" style="background: white">
                      <ul class="nav nav-pills">
                        <li class="nav-item">
                          <a class="nav-link category text-decoration-none text-secondary"
                             href="#Beliebt">Beliebt</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link category text-decoration-none text-secondary"
                             href="#Pizza">Pizza </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link category text-decoration-none text-secondary"
                             href="#Calzone">Calzone </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link category text-decoration-none text-secondary"
                             href="#Kindergerichte">Kindergerichte </a>
                        </li>

                        <li class="nav-item">
                          <a class="nav-link category text-decoration-none text-secondary"
                             href="#Alkoholfreie">Alkoholfreie Getränke </a>
                        </li>


                      </ul>
                    </nav>


                  </div>
                </div>


                <div data-bs-spy="scroll" data-bs-target="#navbar-example2"
                     data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true"
                     class="scrollspy-example p-3 rounded-2 content mx-lg-5" tabindex="0">
                  <h4 class="fw-bold" id="Beliebt">Beliebt</h4>
                  <!-- Menu Item -->
                  <div class="card mb-3 menu-card">
                    <div class="container-fluid">
                      <div class="row">
                        <div class="col-10">
                          <div class="">
                            <h3 class="item-name mt-3">
                              Pizza Hawai &nbsp;
                              <span class="pi pi-exclamation-circle"></span>
                            </h3>
                            <div class="menu-item-body">
                              mit Schinken und Ananas<br>
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


                  <div class="py-3 cat-bg" style="background-image: url('/img/Pizza.avif')">

                    <!--              <img src="/img/pizza.avif" alt="pizza" class="img-fluid">-->
                  </div>

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


                  <div class="py-3 cat-bg" style="background-image: url('/img/Calzone.avif')">

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


                  <div class="py-3 cat-bg" style="background-image: url('/img/Kindergerichte.avif')">
                    <!--              <img src="/img/Kindergerichte.avif" alt="pizza" class="img-fluid">-->
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

                  <div class="py-3 cat-bg" style="background-image: url('/img/Alkoholfreie.avif')">
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
                        <div class="col-2" style="display: flex; justify-content: center; align-items: center">
                          <p>
                            <img src="/img/coke.avif" alt="coke" class="img-fluid">
                          </p>
                        </div>
                        <div class="col-1">
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

    <div class="col-lg-3 d-none d-lg-block card shadow" style="width: 344px !important;">

        <aside class="">
          <h4 class="text-center fw-bold" style="margin-top: 70px;">Warenkorb</h4>
        <h1 class="text-center mt-5"><span class="pi pi-shopping-bag" style="font-size: 0.7em;"></span></h1>
          <h4 class="mt-3 text-center fw-bold">Fülle deinen Warenkorb</h4>
          <p class="text-center">
            Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.
          </p>
        </aside>

    </div>


  </div>

</div>
  <br><br><br><br>
</div>
</template>


<style scoped>
.banner{
  height: 12em;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #fff;
  background-image: url("/public/img/271_italian_pizza_107.avif");
}
@media screen and (min-width: 800px) {
  .banner{
    height: 20em;
  }
}

.left-section {
  flex: 1 1 auto;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}
.left-section::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Opera */
}
aside {
  flex: 0 0 auto;
  position: fixed;
  top: 0;
}

.fixed-top {
  padding: 10px 5px 10px 30px;
}
@media screen and (max-width: 700px) {
  .fixed-top {
    padding-left: 5px;
  }
}

.category.active {
  background: rgba(0, 0, 0, 0.77);
  color: white !important;
  padding: 5px !important;
  border-radius: 40px;
}



.cat-bg{
  height: 6em;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: grey;
  width: 100%
}

@media screen and (min-width: 800px) {
  .cat-bg {
    height: 10em;
  }
}

</style>
