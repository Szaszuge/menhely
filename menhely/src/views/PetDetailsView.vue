<script setup lang="ts">
import Button from '@/components/Button.vue';
import PawFooter from '@/components/PawFooter.vue';
</script>

<template>
  <div class="container">
    <div class="image-container">
      <img class="no-padding-image" src="../assets/allatkep.png" alt="Kiskutya" />
      <div class="details">
        <div class="detail-row"><span>Fajtája</span> Sztárforsíp terrier kutyuska</div>
        <div class="detail-row"><span>Színe</span> Sötét- és világosbarna</div>
        <div class="detail-row"><span>Chippeltetve?</span> Igen</div>
        <div class="detail-row"><span>Ivartalanított?</span> Nem</div>
        <div class="detail-row"><span>Útlevél?</span> Nem</div>
      </div>
    </div>
    <div id="second">
      <div class="info-container">
      <h2 class="title">Sztárforsíp Terijer kiskutyuska</h2>
      <div class="content">
      <h3>Bekerülés körülménye</h3>
      <p>Idős család kutyája volt előzőleg, viszont nem tudtak már rá egészségi okok miatt tovább vigyázni és inkább leadták menhelyünkre.</p>

      <h3>Betegségek</h3>
      <ul>
        <li>Cukorbeteg</li>
        <li>Asztma</li>
        <li>Rák</li>
      </ul>

      <h3>Egyéb</h3>
      <ul>
        <li>Más kutyákkal tartható, valamint macskákkal is jól kijön és kisgyerekekkel is.</li>
        <li>Főként lakásban tartandó, eddig abban élt előző gazdájával.</li>
      </ul>
      </div>

    </div>
      <div class="button-container">
        <Button class="visit">Meglátogatás</Button>
        <Button class="adopt">Örökbefogadás</Button>
      </div>
    </div>
    
  </div>

  <PawFooter />
</template>

<style scoped>
.container {
  display: flex;
  gap: 70px;
  padding: 20px;
}
#second {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.image-container {
  flex: 1;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid black; 
}

.image-container img {
  width: 100%;
  border-radius: 10px 10px 0 0;
}

.details {
  text-align: left;
  padding: 10px;
  border-radius: 0 0 10px 10px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 10px; 
  border-bottom: 1px solid black;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row:nth-child(even) {
  background-color: #e8ecf4;
}

.detail-row span {
  font-weight: bold;
}

.info-container {
  flex: 2; 
  background: #FED7AA;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.content {
  
  padding: 30px;
}
.title {
  font-weight: 600;
    text-align: center;
    font-size: 2rem;
    background-color: #FDBA74;
    padding: 0.5rem;
    border-radius: 15px 15px 0 0;
}

h3 {
  margin-top: 2rem;
  font-size: 1.4rem;
  font-weight: 600;
}

p, ul {
  font-size: 16px;
  color: #333;
}

ul {
  padding-left: 20px;
  list-style-type: disc;
}

.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-top: 20px;

}

.visit {
  background-color: #FF6F3C;
  color: white;
  width: 170px;
  height: 60px;
  font-size: 1.2rem;
}

.adopt {
  background-color: #FF6F3C;
  color: white;
  width: 170px;
  height: 60px;
  font-size: 1.2rem;
}
</style>