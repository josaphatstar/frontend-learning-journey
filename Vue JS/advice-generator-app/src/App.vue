<template>
  <main class="app-container">
    <div class="advice-card">
      <h1 class="advice-id">ADVICE #{{ adviceId }}</h1>
      <p class="advice-quote">{{ adviceText }}</p>

      <picture class="divider">
        <source media="(min-width: 768px)" srcset="./assets/pattern-divider-desktop.svg">
        <img src="./assets/pattern-divider-mobile.svg" alt="divider">
      </picture>

      <button class="dice-button" @click="getAdvice">
        <img src="./assets/icon-dice.svg" alt="dice icon">
      </button>
    </div>
  </main>
</template>

<script>
export default{
  data(){
    return{
      adviceId: 117,
      adviceText: "it is easy to sit up and take notice, what's difficult is getting up and taking action.",
      isLoading: false
    }
  }, 

  methods : {
    async getAdvice(){
      this.isLoading = true;
      try{
        const reponse = await fetch('https://api.adviceslip.com/advice?t=' + Date.now());
        const data = await reponse.json();
        this.adviceId = data.slip.id;
        this.adviceText = data.slip.advice;
      }catch(error){
        this.adviceId = null
        this.adviceText = "Oups! Impossible de charger un conseil.";
        console.error(error)
      }finally{
        this.isLoading = false;
      }
    }
  }
}

</script>

<style scoped>
  .app-container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px;
   }

  .advice-card{
    background-color: var(--neutral-dark-grayish-blue);
    border-radius: 15px;
    padding: 48px;
    width: 90%;
    max-width: 540px;
    position: relative;
    text-align: center;
    box-shadow: 30px 50px 80px rgba(0, 0, 0, 0.2);
  }

 .advice-id {
  color: var(--primary-neon-green); /* C'était en cyan dans ton code */
  font-size: 11px; /* Plus petit */
  letter-spacing: 4px; /* Très important pour le style */
  text-transform: uppercase;
  margin-bottom: 24px; /* Un peu moins d'espace */
  font-weight: 800;
}

.advice-quote {
  color: var(--primary-light-cyan);
  font-size: 28px;
  line-height: 1.3;
  margin-bottom: 40px;
  font-weight: 800;
}

.divider {
  width: 100%;
}

.dice-button{
  background-color: var(--primary-neon-green);
  border: none;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  bottom: -32px; 
  left: 50%;
  transform: translateX(-50%);
  transition: box-shadow 0.3s ease;
}

.dice-button:hover {
  box-shadow: 0 0 40px var(--primary-neon-green);
}


@media (max-width: 375px) {
  .advice-card {
    padding: 40px 24px;
    font-size: 24px;
  }
}

</style>