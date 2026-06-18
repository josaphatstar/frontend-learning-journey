<script setup>
defineProps({
    success: Boolean,
    message: String,
})

const restart = defineEmits(["restart"])

</script>


<template>
  <div class="fixed inset-0 bg-[#0b0f19]/20 flex items-center justify-center z-50 backdrop-blur-sm">
    
    <div class="bg-[#171e30] border-2 border-[#2e303a] p-8 rounded-xl text-center w-[320px] flex flex-col items-center shadow-2xl gap-4">
      
      <h2 class="text-2xl font-bold mb-4 !text-white">
        {{ success ? 'Victoire ! 🎉' : 'Game Over ! 😢' }}
      </h2>
            
      <p class="text-sm text-[#9ca3af] mb-10">{{ message }}</p>
      
      <button 
        @click="$emit('restart')" 
        class="p-2 pl-[35px] pr-[35px] bg-[#c951e7] border-none text-[#fff] rounded-md cursor-pointer hover:bg-[#b040cf] transition-colors font-medium text-sm outline-none"
      >
        Rejouer
      </button>
    </div>
  </div>
</template>