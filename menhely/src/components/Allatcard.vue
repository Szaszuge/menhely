<script setup lang="ts"></script>

<template>
    <div class="image-container">
      <img src="../assets/allatkep.png" alt="" class="allatkep">
      <div class="white-rectangle">
        <h2>Sztárforsíp terijer kiskutyuska</h2>
        <div class="igazitas">
            <p class="text-slate-500">Nőstény, 2 hónapos</p>
            <img src="../assets/forwardbutton.png" alt="" class="forwardbutton">
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .image-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }
  
  .image-container img:first-child {
    display: block;
  }
  
  .white-rectangle {
    width: 440px;
    background-color: white;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.4);
  }
  
  .allatkep {
    width: 440px;
    height: 490px;
    border-radius: 40px 40px 0px 0px;
  }
  
  .forwardbutton {
    position: relative;
    width: 90px;
    height: 90px;
    right: -20px;
  }
  h2 {
  font-weight: bold;
  font-size: 1.6rem;
  align-items: center;
  margin-bottom: 10px;
  }  
.igazitas{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 365px;
}
p{
    font-size: 1.4rem;
    font-weight: 600;
}
</style>