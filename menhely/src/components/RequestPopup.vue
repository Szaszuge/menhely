<script setup lang="ts">
/*
const props = defineProps({
    type: {
        type: String,
        required: false, 
        default: "Leadás",
    }
})
*/
</script>

<template>
<div class="request-popup-container">
      <div class="request-popup-content">
        <div class="request-close-button-container">
          <img src="../assets/close-dark.png" alt="Bezárás" class="request-close-icon" @click="$emit('closePopup')"/>
        </div>
        
        <div class="request-dog-details">
          <div class="request-image-container">
            <img src="../assets/allatkep.png" alt="Kutya" class="request-dog-image" />
          </div>
          
          <div class="request-details-content">
            <h2 class="request-dog-name">Sztárforsip terijer kiskutyus</h2>
            
            <div class="request-tags-container">
              <div class="request-tag">
                <img src="../assets/home_icon.png" alt="Otthon ikon" class="request-tag-icon" />
                <span>Otthonból</span>
              </div>
              
              <div class="request-tag">
                <img src="../assets/dog_icon.png" alt="Kutya ikon" class="request-tag-icon" />
                <span>Kutya</span>
              </div>
              
              <div class="request-tag">
                <img src="../assets/location_icon.png" alt="Hely ikon" class="request-tag-icon" />
                <span>Baja</span>
              </div>
            </div>
            
            <div class="request-info-section">
              <p class="request-info-label">Tervezett leadás időpontja:</p>
              <p class="request-info-value">2025-04-22</p>
            </div>
            
            <div class="request-info-section">
              <p class="request-info-label">Egyéb információ:</p>
              <div class="request-info-text">
                A híresebb sárga terrier kiskutya nagyon barátságos és játékos természetű. 
                Szereti a gyerekeket és jól kijön más kutyákkal is. Már be van oltva és 
                rendelkezik mikrochippel. Családi körülmények között nevelkedett, szobatiszta 
                és alapvető parancsokat ismer. Ideális egy aktív családnak, ahol sok figyelmet 
                és szeretetet kap.
                A híresebb sárga terrier kiskutya nagyon barátságos és játékos természetű. 
                Szereti a gyerekeket és jól kijön más kutyákkal is. Már be van oltva és 
                rendelkezik mikrochippel. Családi körülmények között nevelkedett, szobatiszta 
                és alapvető parancsokat ismer. Ideális egy aktív családnak, ahol sok figyelmet 
                és szeretetet kap.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style lang="css" scoped>

.request-popup-container {
  background: #FED7AA;
  border-radius: 15px;
  width: calc(100vw - 25px);
  max-width: 800px;  
  margin: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  max-height: 95vh;  
  overflow-y: auto;
}

.request-popup-content {
  padding: 1.5rem;
  position: relative;
}

.request-close-button-container {
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 10;
}

.request-close-icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.request-dog-details {
  display: flex;
  flex-direction: column;
}

.request-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.request-dog-image {
  width: 240px;
  height: 260px;
  object-fit: cover;
  border: 3px solid #E85B44;
  border-radius: 8px;
  margin-top: 6.5rem;
}

.request-details-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.request-dog-name {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.request-info-section {
  margin-bottom: 1rem;
}

.request-info-label {
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.request-info-value {
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
}

.request-info-text {
  background-color: #FDBA74;
  padding: 0.5rem;
  border-radius: 8px;
  max-height: 200px;
  line-height: 1.5;
  overflow-y: auto;
}


.request-tags-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
}

.request-tag {
  display: flex;
  align-items: center;
  background-color: #FDBA74;
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
}

.request-tag-icon {
  width: 20px;
  height: 20px;
  margin-right: 6px;
}

@media (min-width: 768px) {
  .request-dog-details {
    flex-direction: row;
    gap: 2rem;
  }
  
  .request-image-container {
    flex: 0 0 250px;
    margin-bottom: 0;
  }
  
  .request-dog-name {
    text-align: left;
  }
  
  .request-info-value {
    text-align: left;
  }
}

@media (max-width: 768px) {
  
  .request-tags-container {
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .request-dog-image {
    margin-top: 1rem;
  }
  
}
</style>