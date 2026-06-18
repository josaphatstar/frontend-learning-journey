<script setup>
import Time from "./components/Time.vue"
import { ref } from "vue"

const timeData = ref({
	Days: 5,
	Hour: 12,
	Minutes: 30,
	Secondes: 45
})

</script>


<template>
  <main>
    <div class="container">
      <h3>WE'RE LAUNCHING SOON</h3>
      <div class="time">
        <Time
        :Days="timeData.Days"
        :Hour="timeData.Hour"
        :Minutes="timeData.Minutes"
        :Secondes="timeData.Secondes"/>
      </div>
      <div class="icons">
        <div class="facebook"> <img src="./assets/icon-facebook.svg" alt="facebook icon"> </div>
        <div class="pinterest"><img src="./assets/icon-pinterest.svg" alt="pinterest icon"></div>
        <div class="Instagram"><img src="./assets/icon-instagram.svg" alt="instagram icon"></div> 
      </div>
    </div>
  </main>
</template>

<style scoped>
  main{
    color: #fff;
    height: 100vh;
    background-image: url("./assets/bg-stars.svg");
    background-image: url("./assets/pattern-hills.svg");
    background-position:bottom;
    background-repeat: no-repeat;
    background-color: #1f1d2a;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h3{
    color: #fff;
    font-weight: 400;
  }

  .time{
    border: solid;
    height: 200px;
  }

  .icons{
    display: flex;
    justify-content: center;
    gap: 25px;
    cursor:pointer;
  }
 
  /* .icons:hover > div {
    background-color: #d35070;
  } */
</style>