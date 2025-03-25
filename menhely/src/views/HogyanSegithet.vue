<script setup lang="ts">
import Supportcard from "@/components/Supportcard.vue";
import PawFooter from "@/components/PawFooter.vue";
import Button from "../components/Button.vue";
import CustomInput from "@/components/CustomInput.vue";
import { ref } from "vue";

const buttonText = ref("Jelentkezem");
const valami = ref(true);

function gonb() {
  if (buttonText.value === "Jelentkezem") {
    buttonText.value = "Vissza";
  } else {
    buttonText.value = "Jelentkezem";
  }

  valami.value = !valami.value;
}

const jelentkezesEv = ref('');
const jelentkezesHonap = ref('');
const jelentkezesNap = ref('');

function kuldes() {
  console.log("Bekuldes placeholder");
}
</script>

<template>
  {{ jelentkezesEv }}
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
    <Supportcard title="Adományozzon!">
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
        <h3>
          Itt tudja leadni jelentkezését önkéntes munkára hozzánk!
          Jelentkezzenek bátran!
        </h3>
        <h1>Év:</h1>
        <CustomInput
          type="text"
          placeholder="Év"
          v-model="jelentkezesEv"
        ></CustomInput>
        <h1>Hónap:</h1>
        <CustomInput
          type="text"
          placeholder="Hónap"
          v-model="jelentkezesHonap"
        ></CustomInput>
        <h1>Nap:</h1>
        <CustomInput
          type="text"
          placeholder="Nap"
          v-model="jelentkezesNap"
        ></CustomInput>
        <h3>Munka ideje (órában):</h3>
        <!-- itt lesz a dualrangeslider -->
        <h1>Mit szeretnél nálunk dolgozni?</h1>
        <CustomInput type="text" placeholder="Anyad"></CustomInput>
        <Button id="bekuldes" @="kuldes">Küldés</Button>
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
</style>
