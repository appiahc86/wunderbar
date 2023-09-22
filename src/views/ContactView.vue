<script setup>
import PageBanner from "@/components/layouts/PageBanner.vue";
</script>

<template>
<div class="">
  <PageBanner  title="KONTAKTDATEN"/>
  <br>

  <div class="container">
    <div class="row">

      <div class="col-lg-6">
        <div class="section-title">
          <h2>KONTAKT</h2>
          <h3>INFORMATIONEN</h3>
        </div>
        <div class="text-center">
          <address class="fst-italic">
            Pizza Wunderbar <br>
            Frankfurter Straße 10 <br>
            38122 Braunschweig <br>
          </address>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="section-title">
          <h2>LIEFER</h2>
          <h3>ZEITEN</h3>
        </div>

        <div class="table-responsive">
          <table class="table table-borderless">
            <tr>
              <th class="float-end">Montag</th>
              <td>15:45 - 23:00</td>
            </tr>
            <tr>
              <th class="float-end">Dienstag</th>
              <td>16:30 - 23:00</td>
            </tr>
            <tr>
              <th class="float-end">Mittwoch</th>
              <td>16:30 - 23:00</td>
            </tr>
            <tr>
              <th class="float-end">Donnerstag</th>
              <td>16:30 - 23:00</td>
            </tr>
            <tr>
              <th class="float-end">Freitag</th>
              <td>16:30 - 03:00</td>
            </tr>
            <tr>
              <th class="float-end">Samstag</th>
              <td>16:30 - 23:00</td>
            </tr>
            <tr>
              <th class="float-end">Sonntag</th>
              <td>Geschlossen</td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  </div>


</div>
</template>

<style scoped>
.section-title {
  text-align: center;
  margin: auto auto 40px auto;
}
.section-title h2 {
  color: #dae1e6;
  opacity: 0.8;
  text-transform: uppercase;
  font-size: 3.5em;
  text-align: center;
  line-height: 42px;
}

.section-title h3 {
  margin-top: -25px;
  font-size: 2em;
  text-transform: uppercase;
  z-index: 1;
  position: relative;
  line-height: 35px;
}

th, td {
  padding-top: 0;
  padding-bottom: 0;
}
</style>