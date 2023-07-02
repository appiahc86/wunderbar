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
    <div class="col-lg-9 g-0 left-section">
      <section>

        <div class="">

<!--          Menu Item-->
          <div class="card shadow mb-4 d-flex">
            <div class="banner">
            </div>
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
               class="scrollspy-example bg-light p-3 rounded-2 content" tabindex="0">
            <h4 id="Beliebt">Beliebt</h4>
            <!-- Menu Item -->
            <div class="card menu-card">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-10">
                    <div class="">
                      <h3 class="item-name mt-3">
                        Pizza BTSV &nbsp;
                        <span class="pi pi-exclamation-circle"></span>
                      </h3>
                      <div class="menu-item-body">
                        mit Thunfisch und Zwiebeln <br>
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

            <h4 id="Pizza">Pizza</h4>
            <!-- Menu Item -->
            <div class="card menu-card">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-10">
                    <div class="">
                      <h3 class="item-name mt-3">
                        Pizza BTSV &nbsp;
                        <span class="pi pi-exclamation-circle"></span>
                      </h3>
                      <div class="menu-item-body">
                        mit Thunfisch und Zwiebeln <br>
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

            <h4 id="Calzone">Calzone</h4>
            <!-- Menu Item -->
            <div class="card menu-card">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-10">
                    <div class="">
                      <h3 class="item-name mt-3">
                        Pizza BTSV &nbsp;
                        <span class="pi pi-exclamation-circle"></span>
                      </h3>
                      <div class="menu-item-body">
                        mit Thunfisch und Zwiebeln <br>
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

            <h4 id="Kindergerichte">Kindergerichte</h4>
            <!-- Menu Item -->
            <div class="card menu-card">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-10">
                    <div class="">
                      <h3 class="item-name mt-3">
                        Pizza BTSV &nbsp;
                        <span class="pi pi-exclamation-circle"></span>
                      </h3>
                      <div class="menu-item-body">
                        mit Thunfisch und Zwiebeln <br>
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

            <h4 id="Alkoholfreie">Alkoholfreie Getränke</h4>
            <!-- Menu Item -->
            <div class="card menu-card">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-10">
                    <div class="">
                      <h3 class="item-name mt-3">
                        Pizza BTSV &nbsp;
                        <span class="pi pi-exclamation-circle"></span>
                      </h3>
                      <div class="menu-item-body">
                        mit Thunfisch und Zwiebeln <br>
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
          </div>










        </div>

      </section>
    </div>

    <div class="col-lg-3 d-none d-lg-block">
      <aside class="h-100" onscroll="return false;">
        <h4 class="text-center" style="margin-top: 70px;">Warenkorb</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
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

</style>
