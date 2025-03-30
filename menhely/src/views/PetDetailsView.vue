<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/Button.vue';
import PawFooter from '@/components/PawFooter.vue';
import VisitPopup from '@/components/VisitPopup.vue';

const showVisitPopup = ref(false);

const openVisitPopup = () => {
  showVisitPopup.value = true;
};

const closeVisitPopup = () => {
  showVisitPopup.value = false;
};
</script>

<template>
  <div class="pet-details">
    <div class="left-container">
      <div class="image-card">
        <img src="../assets/allatkep.png" alt="Kiskutya" />
        <div class="specs">
          <div class="spec-row"><span>Fajtája</span> <span>Sztárforsíp terrier kutyuska</span></div>
          <div class="spec-row"><span>Színe</span> <span>Sötét- és világosbarna</span></div>
          <div class="spec-row"><span>Chippeltetve?</span> <span>Igen</span></div>
          <div class="spec-row"><span>Ivartalanított?</span> <span>Nem</span></div>
          <div class="spec-row"><span>Útlevél?</span> <span>Nem</span></div>
        </div>
      </div>
    </div>

    <div class="right-container">
      <div class="info-card">
        <h2 class="pet-name">Sztárforsíp Terijer kiskutyuska</h2>
        
        <div class="info-content">
          <section>
            <h3>Bekerülés körülménye</h3>
            <p>Idős család kutyája volt előzőleg, viszont nem tudtak már rá egészségi okok miatt tovább vigyázni és inkább leadták menhelyünkre.</p>
          </section>

          <section>
            <h3>Betegségek</h3>
            <ul>
              <li>Cukorbeteg</li>
              <li>Asztma</li>
              <li>Rák</li>
            </ul>
          </section>

          <section>
            <h3>Egyéb</h3>
            <ul>
              <li>Más kutyákkal tartható, valamint macskákkal is jól kijön és kisgyerekekkel is.</li>
              <li>Főként lakásban tartandó, eddig abban élt előző gazdájával.</li>
            </ul>
          </section>
        </div>

        <div class="action-buttons">
          <Button class="visit-btn" @click="openVisitPopup">Meglátogatás</Button>
          <RouterLink to="/petadoption">
            <Button class="adopt-btn">Örökbefogadás</Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <PawFooter :is-sticky="true"/>
  
  <VisitPopup v-if="showVisitPopup" @close="closeVisitPopup" />
</template>

<style scoped>
.pet-details {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1600px; 
  margin: 2rem auto;
  padding: 0 1rem;
}


.left-container {
  flex: 1;
  min-width: 280px;
  border: 1px solid black; 
  border-radius: 20px; 
}


.right-container {
  flex: 3;
  min-width: 320px;
}

.image-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.image-card img {
  width: 100%;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
}

.specs {
  padding: 0.5rem;
  border-radius: 12px 12px 20px 20px;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  border-bottom: 1px solid #e0e0e0; 
  font-size: 0.9rem;
}

.spec-row:last-child {
  border-bottom: none;
}
.spec-row:nth-child(even) {
  background-color: #f8f9fa;
}

.spec-row span:first-child {
  font-weight: 600;
}

.info-card {
  background: #FED7AA;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.pet-name {
  font-weight: 600;
  text-align: center;
  font-size: 1.8rem;
  background-color: #FDBA74;
  padding: 1rem;
  margin: 0;
  border-radius: 12px 12px 0 0;
}

.info-content {
  padding: 1.5rem;
  flex-grow: 1;
}

section {
  margin-bottom: 1.5rem;
}

h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding-bottom: 0.5rem;
}

p, ul {
  font-size: 1rem;
  color: #333;
  margin: 0.5rem 0;
}

ul {
  padding-left: 1.25rem;
  list-style-type: disc;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
}

.visit-btn, .adopt-btn {
  background-color: #FF6F3C;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  text-align: center; 
  display: flex;
  align-items: center;
  justify-content: center; 
}

.visit-btn:hover, .adopt-btn:hover {
  background-color: #e05a2a;
}


@media (max-width: 768px) {
  .pet-details {
    flex-direction: column;
  }
  
  .left-container, .right-container {
    flex: 1 1 100%;
    width: 100%;
  }

  .action-buttons {
    justify-content: center;
  }
}


@media (min-width: 1800px) {
  .pet-details {
    max-width: 85%; 
  }
}
</style>