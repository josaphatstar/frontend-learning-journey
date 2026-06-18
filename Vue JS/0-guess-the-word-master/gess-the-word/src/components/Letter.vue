<script setup>
const letter = defineModel()

</script>



<template>
  <div class="border-2 h-[20px] w-[20px] flex justify-center items-center p-[20px] m-[3px] rounded-sm ">
    <input type="text" maxlength="1" v-model="letter" class="border-[#4a5567] h-[45px] w-[45px] m-[3px] rounded-md text-center bg-transparent text-white lowcase outline-none focus:border-[#c951e7] transition-colors" />
  </div>    
</template>
