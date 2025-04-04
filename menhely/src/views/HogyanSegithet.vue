<script setup lang="ts">
import Supportcard from "@/components/Supportcard.vue";
import PawFooter from "@/components/PawFooter.vue";
import Button from "../components/Button.vue";
import CustomInput from "@/components/CustomInput.vue";
import DualRangeSlider from "../components/DualRangeSlider.vue"
import { ref } from "vue";
const buttonText = ref("Jelentkezem");
const valami = ref(true);
function gonb() {
  if (buttonText.value === "Jelentkezem") {
    buttonText.value = "Vissza";
    jelentkezesTitle.value = "Jelentkezés"
  } else {
    buttonText.value = "Jelentkezem";
        jelentkezesTitle.value = "Adományozzon!"
  }
  valami.value = !valami.value;
}
const jelentkezesEv = ref('');
const jelentkezesHonap = ref('');
const jelentkezesNap = ref('');
const jelentkezesOka = ref('');
const jelentkezesTitle = ref('Adományozzon!');
function kuldes() {
  console.log("Bekuldes placeholder");
}
</script>
<template>
  <div class="kontent">
    <Supportcard title="Jelentkezzen önkéntesnek!">
      <p>
        Menhelyünk meleg szívvel vár minden lelkes embert, aki segíteni szeretne
        kiskedvenceink foglalkoztatásával, ezzel is a menhely működését segítve.
      </p>
      <ul style="list-style-type: disc">
        <li>
          Naptárunkban látható lesz melyik napokon tudnak segíteni
          menhelyünknek.
        </li>
        <li>Egy adott napra maximum 2 embert bírunk foglalkoztatni.</li>
        <li>A gombra nyomva a mezőket töltse ki adatainak megfelelően!</li>
        <li>
          Ha elküldte jelentkezését email-ben fogjuk jelezni önnek ha felvettük.
        </li>
      </ul>
      <Button @click="gonb" id="jelentkezes">{{ buttonText }}</Button>
    </Supportcard>
    <img src="../assets/tamogatas.png" alt="Tamogatas" id="Tamogass" />
    <Supportcard v-bind:title="jelentkezesTitle">
      <template v-if="valami">
        <p>
          Segítsen, hogy még több kutyának és cicának adhassunk esélyt egy új,
          boldog életre! Minden adomány, legyen az egyszeri vagy rendszeres,
          hozzájárul ahhoz, hogy folytathassuk munkánkat. Hogyan támogathat
          minket?
        </p>
        <ul style="list-style-type: disc">
          <li>Pénzbeli adomány: Adjon online vagy banki átutalással.</li>
          <li>
            Rendszeres adomány: Havi hozzájárulással hosszú távon segíthet.
          </li>
          <li>Az adója 1%-át felajánlhatja menhelyünknek.</li>
          <li>Adószámunk: 12345678-9-10</li>
        </ul>
        <p>
          Minden segítség számít! Köszönjük, hogy velünk tart, és támogatja a
          rászoruló állatokat!
        </p>
      </template>
      <template v-else>
        <h3 class="font-semibold text-center">
  Itt tudja leadni jelentkezését önkéntes munkára hozzánk!
  Jelentkezzenek bátran!
</h3>
        <div class="date-inputs">
          <div class="date-input-container">
            <h1 class="font-semibold">Év:</h1>
            <CustomInput
              type="text"
              placeholder="Év"
              v-model="jelentkezesEv"
              class="narrow-input"
            ></CustomInput>
          </div>
          <div class="date-input-container">
            <h1 class="font-semibold">Hónap:</h1>
            <CustomInput
              type="text"
              placeholder="Hónap"
              v-model="jelentkezesHonap"
              class="narrow-input"
            ></CustomInput>
          </div>
          <div class="date-input-container">
            <h1 class="font-semibold">Nap:</h1>
            <CustomInput
              type="text"
              placeholder="Nap"
              v-model="jelentkezesNap"
              class="narrow-input"
            ></CustomInput>
          </div>
        </div>
        <h4 class="font-semibold">Munka ideje (órában):</h4>
        <DualRangeSlider></DualRangeSlider>
        <h1>Mit szeretnél nálunk dolgozni?</h1>
        <CustomInput type="text" placeholder="Mi az ok?" v-model="jelentkezesOka"></CustomInput>
        <Button id="bekuldes" @click="kuldes">Küldés</Button>
      </template>
    </Supportcard>
  </div>
  <PawFooter :is-sticky="true" />
</template>
<style scoped>
.kontent {
  width: 100vw;
  justify-content: space-evenly;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
}
img {
  width: 12rem;
  height: 12rem;
}
p {
  padding: 20px;
}
ul {
  padding: 0px 20px 20px 40px;
}
.date-inputs {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
.date-input-container {
  display: flex;
  flex-direction: column;
}
.narrow-input {
  width: 100px; /* Sets a narrower width for date inputs */
  max-width: 100%;
}
</style>