<script setup>
import { ref, onMounted, watch } from 'vue'
import Letter from './components/Letter.vue'
import Popup from './components/Popup.vue'

const words = ref(["adventure", "flower", "jungle", "mountain", "river", "sunset", "ocean", "forest", "beach", "desert"])
const selectedWord = ref ("")
const scrambledword = ref("")

const userInput = ref([])
const mistakes = ref([])

const showPopup = ref(false)
const popupSuccess = ref(false)
const popupMessage = ref("")
const popupResult = ref("")

function initGame () {
  mistakes.value = []
  userInput.value = []
  const randomIndex = Math.floor(Math.random() * words.value.length)
  selectedWord.value = words.value[randomIndex]

  scrambledword.value = selectedWord.value.split('').sort(() => Math.random() - 0.5).join('')

  for(let i=0; i<selectedWord.value.length; i++) {
    userInput.value.push("")
  }
}

function reset() {
  mistakes.value = []
  userInput.value = Array.from({ length: selectedWord.value.length }, () => "")
}


function handleRestart() {
  showPopup.value = false
  initGame()
}

watch(userInput, (newvalue) => {
  for (let i = 0; i < newvalue.length; i++) {
    const char = newvalue[i]
    if (char !== "") {
      const lowerChar = char.toLowerCase()
      const word = selectedWord.value.toLowerCase()
      if (!word.includes(lowerChar)) {
        mistakes.value.push(lowerChar)
        userInput.value[i] = ""
      }
    }
  }

  // Loss condition
  if (mistakes.value.length >= 5) {
    popupSuccess.value = false
    popupMessage.value = "Le mot correct était : " + selectedWord.value.toUpperCase()
    showPopup.value = true
  }

  // Win condition
  const guess = newvalue.join("").toLowerCase()
  if (guess === selectedWord.value.toLowerCase()) {
    popupSuccess.value = true
    popupMessage.value = "Tu as trouvé le mot correct !"
    showPopup.value = true
  }

}, { deep: true }) // L'option deep se met à la toute fin


onMounted(() => {
  initGame()
})
</script>


<template>
  <main class="min-h-screen flex justify-center items-center bg-[url('../src/assets/bg-guess-the-word-small.jpg')] bg-no-repeat bg-cover bg-center">
    <div class="w-[350px] p-[20px] bg-[#171e30] text-[#fff] rounded-lg flex flex-col items-center">
      <img src="../src/assets/word-scramblle-logo.svg" alt="title">
      <div class="w-full h-[55px] mt-[15px] mb-[10px] rounded flex items-center justify-center tracking-widest bg-[#4a5567] border-none text-xl"  >{{ scrambledword.split('').join(' ') }}</div>
      <div class="flex justify-between text-[14px] w-full">
          <div class="">Tries({{ mistakes.length }}/5): <span class="text-[#c951e7]">{{ "• ".repeat(5 - mistakes.length) }}</span></div>
          <div class="">Mistakes: {{ mistakes.join(', ') }}</div>
      </div>
      <div class=" mt-[30px] mb-[20px] flex rounded-lg justify-center flex-wrap">
        <Letter 
        v-for="(letter, index) in userInput" 
        :key="index"
        v-model="userInput[index]" />
      </div>
      <Popup v-if="showPopup" :success="popupSuccess" :message="popupMessage" @restart="handleRestart" />
      <div class="flex justify-center gap-4 items-center mt-[30px] font-medium text-sm ">
        <button class="p-2 pl-[35px] pr-[35px] bg-[#c951e7] border-none text-[#fff] rounded-md cursor-pointer hover:bg-[#b040cf] transition-colors" @click="initGame()">Random</button>
        <button class="p-2 pl-[35px] pr-[35px] bg-[#c951e7] border-none text-[#fff] rounded-md cursor-pointer hover:bg-[#b040cf] transition-colors" @click="showPopup=false; reset()">Reset</button>
      </div>
    </div>
  </main>
</template>