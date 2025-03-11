<script setup lang="ts">

</script>


<template>
    <div class="filter-container">
        <h2 class="filter-title">Szűrők</h2>
        <div class="bg-orange-300 filter-box">
            <div class="filter-section">
                <p class="section-title">Neme</p>
                <div class="input-group">
                    <div class="input-row">
                        <input type="radio" id="him" name="neme" value="him"> 
                        <label for="him">Hím</label>
                    </div>   
                    <div class="input-row">
                        <input type="radio" id="nosteny" name="neme" value="nosteny"> 
                        <label for="nosteny">Nőstény</label>
                    </div>  
                </div>
            </div>
    
            <div class="filter-section">
                <p class="section-title">Fontosabb adatok</p>
                <div class="input-group">
                    <div class="input-row">
                        <input type="checkbox" id="chip" name="chip" value="chip">
                        <label for="chip">Chippeltetve</label>
                    </div>
                    <div class="input-row">
                        <input type="checkbox" id="oltas" name="oltas" value="oltas">
                        <label for="oltas">Oltás</label>
                    </div>
                    <div class="input-row">
                        <input type="checkbox" id="ivartalanitott" name="ivartalanitott" value="ivartalanitott">
                        <label for="ivartalanitott">Ivartalanított</label>
                    </div>
                    <div class="input-row">
                        <input type="checkbox" id="utlevelezett" name="utlevelezett" value="utlevelezett">
                        <label for="utlevelezett">Útlevél</label>
                    </div>
                </div>
            </div>
            
            <div class="filter-section">
                <p class="section-title">Jellemvonások</p>
                <div class="input-group">
                    <div class="input-row">
                        <input type="checkbox" id="baratsagos" name="baratsagos" value="baratsagos">
                        <label for="baratsagos">Barátságos</label>
                    </div>
                    <div class="input-row">
                        <input type="checkbox" id="jatekos" name="jatekos" value="jatekos">
                        <label for="jatekos">Játékos</label>
                    </div>
                    <div class="input-row">
                        <input type="checkbox" id="okos" name="okos" value="okos">
                        <label for="okos">Okos</label>
                    </div>
                    <div class="input-row">
                        <input type="checkbox" id="fuggetlen" name="fuggetlen" value="fuggetlen">
                        <label for="fuggetlen">Független</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.filter-container {
    min-width: 300px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.filter-title {
    margin-top: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
}

.filter-box {
    padding: 0.5rem 1.5rem;
    border: 1.5px solid black;
    border-radius: 1.8rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.filter-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.section-title {
    font-size: 1.1rem;
    font-weight: 600;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 1rem;
}

.input-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: transform 0.2s ease;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.input-row:hover {
    transform: translateX(5px);
}


input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    cursor: pointer;
    background: white;
    border-radius: 50%;
    position: relative;
}

input[type="checkbox"]:checked {
    background: white;
}

input[type="checkbox"]:checked::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 4px;
    width: 6px;
    height: 12px;
    border: solid #fed7aa;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}


input[type="radio"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 22px;
    height: 22px;
    cursor: pointer;
    background: white;
    border-radius:  4px;
    position: relative;
}

input[type="radio"]:checked {
    background: white;
}

input[type="radio"]:checked::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 4px;
    width: 6px;
    height: 12px;
    border: solid #fed7aa;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}


input[type="radio"]:checked + label {
    font-weight: 600;
    transform: scale(1.02);
    transition: all 0.2s ease;
}

input[type="checkbox"]:checked + label {
    font-weight: 600;
    transform: scale(1.02);
    transition: all 0.2s ease;
}

label {
    cursor: pointer;
    font-size: 1rem;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
</style>