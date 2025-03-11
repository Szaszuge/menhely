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

    <div class="info-container">
      <h2>Sztárforsíp Terijer kiskutyuska</h2>
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

      <!-- Buttons -->
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
  gap: 20px;
  padding: 20px;


}

.image-container {
  flex: 1;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}



.image-container img {
    width: 100%;
    border-radius: 10px 10px 0 0;
}

.details {
  text-align: left;
  padding: 10px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

.detail-row span {
  font-weight: bold;
}


.info-container {
  flex: 2;
  background: #FFE3C2;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #DA8233;
  margin-bottom: 10px;
  font-weight: 600px;
  font-size: 2rem;
  text-align: center;
}

h3 {
  margin-top: 10px;
  color: #B35A2F;
}

p, ul {
  font-size: 14px;
  color: #333;
}

ul {
  padding-left: 20px;
}

.button-container {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.visit {
  background-color: #FF6F3C;
  color: white;
}

.adopt {
  background-color: #FF3C3C;
  color: white;
}
</style>
