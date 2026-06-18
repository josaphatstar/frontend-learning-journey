<script setup>

</script>



<template>
<main class="flex flex-col items-center">
  <h2>IP Address Tracker</h2>
  <div class="input">
    <input type="text" class="mt-[30px]">
    <button> <img src="./assets/icon-arrow.svg" alt="button"></button>
  </div>
  <div class="flex justify-center border mt-[50px] p-[20px] rounded-xl">
    <div class="ml-[20px] mr-[60px] font-bold">
      <small>IP ADDRESS</small> <br> 
      192.212.174.101
    </div> <hr>
<div class="ml-[20px] mr-[60px]">
      <small>LOCATION</small> <br>
      <span>Brooklyn, NY</span> <br>
      <span>10001</span>
    </div> <hr>
    <div class="ml-[20px] mr-[60px] font-bold">
      <small>TIMEZONE</small> <br>
       UTC-05:00
    </div> <hr>
    <div class="ml-[20px] mr-[60px] font-bold">
      <small>ISP</small> <br>
      SpaceX  <br>Starlink
    </div>
  </div>
</main>

</template>