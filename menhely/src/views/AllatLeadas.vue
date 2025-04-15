<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import CustomInput from '@/components/CustomInput.vue';
import Button from '@/components/Button.vue';
import PawFooter from '@/components/PawFooter.vue';
import { useUserStore } from '@/stores/user';
import { AnimalService } from '@/service/animal.service';
import { MailService } from "@/service/mail.service";

const auth = useUserStore();
const animal = new AnimalService();
let mail = new MailService();

const emit = defineEmits(['submit']);

const allatNeve = ref('');
const honnan = ref('');
const faj = ref('');
const telepules = ref('');
const ev = ref('');
const ho = ref('');
const nap = ref('');
const egyebInfo = ref('');
let kep = null;
const visszajelzes = ref('A csillaggal jelölt mezők kitöltése kötelező!');

const fileName = ref("")

function changeFileName(event) {
   if (event.target.files[0] != null) {
    fileName.value = event.target.files[0].name;
   } else  fileName.value = "";
}

function uploadImage(event){
  document.getElementById("image-file-input").click()
}
function imageAdded(event){
  kep = event.target.files[0] ?? null;
}
function send(event:Event) {
  const info = {
    type: 'surrender',
    user: auth.loggedUser().id,
    details: {
      name: allatNeve.value,
      from: honnan.value,
      type: faj.value,
      city: telepules.value,
      year: ev.value,
      month: ho.value,
      day: nap.value,
      other: egyebInfo.value,
    }
  }
  const formData = new FormData();
  formData.append("file", kep);
  formData.append("data", JSON.stringify(info));

  const formDataEntries = Array.from(formData.entries());
  console.log(formDataEntries);

  animal.requestSurrender(formData).then((res) => {
    console.log(res.data.message)
    visszajelzes.value = res.data.message

    let data = {"to": auth.loggedUser().email,
        "subject": "GazdiRadar Regisztráció",
        "content": {
            "userName": auth.loggedUser().userName,
            "link": `http://localhost:5173/newpassword/${auth.loggedUser().id}`,
            "year": info.details.year,
            "month": info.details.month,
            "day": info.details.day,
            },
        "template": "AnimalSent"
        };

  }); // Jegyzet: SOHA NE KÓDÓLJ BETEGEN!
  
}
</script>

<template>
  <div class="form-container">
    <div class="form-title-container">
      <h2>Állat leadása</h2>
    </div>
    <div class="form-content">
    <p class="info-text">{{visszajelzes }}</p>
      <label for="honnan">Állat neve</label>
    <CustomInput class="inputs" v-model="allatNeve" placeholder="Pl. Morzsi" />

    <label for="honnan">Állat fajtája*</label>
    <select id="faj" v-model="faj" class="custom-select">
      <option value="">Válassz egy lehetőséget</option>
      <option value="dog">Kutya</option>
      <option value="cat">Macska</option>
    </select>

    <label for="honnan">Honnan származik (otthon/talált)*</label>
    <select id="honnan" v-model="honnan" class="custom-select">
      <option value="">Válassz egy lehetőséget</option>
      <option value="home">Otthonból</option>
      <option value="found">Talált</option>
    </select>

    <label for="honnan">Település neve*</label>
    <CustomInput class="inputs" v-model="telepules" placeholder="Pl. Bajaszentistván" />

    <label for="lead-idopont">Leadás időpontja*</label>
    <div class="date-container">
      <select v-model="ev" class="date-select">
        <option value="">Év</option>
        <option v-for="year in 3" :key="year" :value="2025 + year - 1">{{ 2025 + year - 1 }}</option>
      </select>
      <select v-model="ho" class="date-select">
        <option value="">Hó.</option>
        <option v-for="month in 12" :key="month" :value="month">{{ month }}</option>
      </select>
      <select v-model="nap" class="date-select">
        <option value="">Nap</option>
        <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
      </select>
    </div>

    <label for="honnan">Egyéb információ</label>
    <CustomInput class="inputs" v-model="egyebInfo" placeholder="Pl. Más állatokkal jól kijön" />



    <div class="button-container">
      <p id="filename">{{ fileName }}</p>
      <Button class="imguploadbtn" @click="uploadImage">Kép feltöltése</Button>
      <input hidden type="file" accept="image/png, image/jpeg" id="image-file-input" v-on:change="imageAdded" @change="changeFileName">
      
      <Button class="submit-button" v-if="auth.isLoggedIn()" @click="send">Leadás igénylése</Button>
      <Button class="submit-button-disabled " v-if="!auth.isLoggedIn()" disabled>Jelentkezzen be!</Button>
    </div>
    </div> 

    
  </div>
  <PawFooter :is-sticky="true"/>
</template>

<style scoped>
#filename{
  color: #ff5722;
  font-weight: 600;
  font-size: 24;
  max-width: 230px;
  padding-right: 10px;
}
.form-container {
  background: #FED7AA;
  border-radius: 15px;
  width: calc(100vw - 25px);
  max-width: 635px; 
  margin: auto;
  margin-top: 3rem;
}
.form-content{
  padding: 1.5rem;
}

.info-text {
  font-size: 0.9rem;
  font-weight: 600; 
  color: #b33;
  text-align: left; 
  margin-bottom: 0.5rem;
}

.form-title-container{
    font-weight: 600;
    text-align: center;
    font-size: 2rem;
    background-color: #FDBA74;
    padding: 0.5rem;
    border-radius: 15px 15px 0 0;
}

label {
  display: block;
  font-weight: bold;
  margin-top: 10px;
}

.custom-select, .date-select {
  width: 100%;
  padding: 10px;
  border: 3px solid #6a7282;
  border-radius: 15px;
  background: #f8f4f4;
  font-size: 1rem;
  margin-top: 5px;
}

.date-container {
  display: flex;
  justify-content: space-between;
}

.date-select {
  width: 30%;
}

.button-container {
  display: flex;
  justify-content: flex-end; 
  margin-top: 15px;
  gap: 1rem;
}

.submit-button {
  background: #ff5722;
  color: white;
    width: 160px;
  font-size: 1.1rem;

}
.submit-button-disabled {
  background-color: #6a7282;
  color: white;
    width: 160px;
  font-size: 1.1rem;
}
.submit-button-disabled:hover {
  background-color: #6a7282;
  cursor: default;
}
.inputs{
  width: calc(100vw - 65px);
  max-width: 587px;
}
.imguploadbtn{
  width: 160px;
  font-size: 1.1rem;
}
</style>