<template>
  <main id="app">
    <header class="header">
      <div class="logo">
        <img src="./assets/logo.svg" alt="Rock Paper Scissors Logo" />
      </div>
      <div class="score-card">
        <span class="score-label">SCORE</span>
        <span class="score-value">{{ score }}</span>
      </div>
    </header>

    <section class="game-stage" v-if="!gameStarted">
      <div class="selection-triangle">
        <img src="./assets/bg-triangle.svg" alt="" class="triangle-bg">
        <button class="choice-btn paper" @click="play('paper')">
          <div class="icon-wrapper">
            <img src="./assets/icon-paper.svg" alt="paper">
          </div>
        </button>

        <button class="choice-btn rock" @click="play('rock')">
          <div class="icon-wrapper">
            <img src="./assets/icon-rock.svg" alt="rock">
          </div>
        </button>
        
        <button class="choice-btn scissors" @click="play('scissors')">
          <div class="icon-wrapper">
            <img src="./assets/icon-scissors.svg" alt="scissors">
          </div>
        </button>

      </div>
    </section>

    <section class="result-stage" v-else>
      <div class="result-container">
        <!-- Joueur -->
        <div class="user-pick">
          <p>YOU PICKED</p>
          <div :class="['choice-btn', userChoice, { 'winner': result === 'YOU WIN' }]">
            <div class="icon-wrapper">
              <img :src="getImageUrl(userChoice)" :alt="userChoice">
            </div>
          </div>
        </div>

        <div class="result-message" v-if="result">
          <h2>{{ result }}</h2>
          <button class="play-again-btn" @click="resetGame">PLAY AGAIN</button>
        </div>

        <!-- Ordinateur -->
        <div class="computer-pick">
          <p>THE HOUSE PICKED</p>
          <div v-if="!computerChoice" class="pick-placeholder"></div>
          <div v-else :class="['choice-btn', computerChoice, { 'winner': result === 'YOU LOSE' }]">
            <div class="icon-wrapper">
              <img :src="getImageUrl(computerChoice)" :alt="computerChoice">
            </div>
          </div>
        </div>
      </div>
    </section>

    <button class="rules-btn" @click="ShowRules = true">RULES</button>

    <div class="modal-overlay" v-if="ShowRules">
      <div class="modal-content">
        <div class="modal-header">
          <h2>RULES</h2>
          <button class="close-btn" @click="ShowRules = false">
            <img src="./assets/icon-close.svg" alt="Close">
          </button>
        </div>
        <img src="./assets/image-rules.svg" alt="Rules" class="rules-img">
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      score: 0,
      ShowRules: false,
      userChoice: null,
      gameStarted: false,
      computerChoice: null,
      result: ''
    }
  },
  methods: {
    getImageUrl(name) {
      if (!name) return '';
      return new URL(`./assets/icon-${name}.svg`, import.meta.url).href;
    },
    play(choice) {
      this.userChoice = choice;
      this.gameStarted = true;
      this.computerChoice = null;
      this.result = '';

      setTimeout(() => {
        const choices = ['paper', 'rock', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        this.computerChoice = choices[randomIndex];

        this.checkWinner();
      }, 1500);
    },
    checkWinner(){
      const user = this.userChoice;
      const computer = this.computerChoice;

      if (user === computer) {
        this.result = 'DRAW';
      }else if(
        (user === 'rock' && computer === 'scissors') ||
        (user === 'paper' && computer === 'rock') ||
        (user === 'scissors' && computer === 'paper')
      ){
        this.result = 'YOU WIN';
        this.score++;
      } else {
        this.result = 'YOU LOSE';
        if (this.score > 0) {
          this.score--;
        }
      }
    },
    resetGame(){
      this.gameStarted = false;
      this.userChoice = null;
      this.computerChoice = null;
      this.result = '';
    }
  }
}
</script>

<style>
.header {
  width: 100%;
  max-width: 700px;
  border: 3px solid var(--header-outline);
  border-radius: 15px;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.logo img {
  height: 100px; /* Taille approximative du logo */
}

.score-card {
  background-color: var(--white);
  border-radius: 8px;
  padding: 1rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.score-label {
  color: var(--score-text);
  font-size: 1rem;
  letter-spacing: 2px;
  font-weight: 600;
}

.score-value {
  color: var(--dark-text);
  font-size: 4rem;
  font-weight: 700;
  line-height: 1;
}

.rules-btn {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background: transparent;
  border: 1px solid var(--white);
  color: var(--white);
  padding: 0.8rem 2.5rem;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.2s;
}

.rules-btn:hover {
  background: var(--white);
  color: var(--dark-text);
}

.modal-overlay{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content{
  background-color: var(--white);
  padding: 2rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-header {
  color: var(--dark-text);
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}

.close-btn{
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0.5;
}

.close-btn:hover{
  opacity: 1;
}

.rules-img {
  width: 100%;
  height: auto;
}

.game-stage {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
}

.selection-triangle{
  position: relative;
  width: 100%;
  height: 280px;
}

.choice-btn{
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border:none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0 -6px rgba(0,0,0,0.2);
}

/* Couleurs spécifiques utilisant nos variables */
.choice-btn.paper {
  background: var(--paper-gradient);
  top: -50px;
  left: -50px;
}

.choice-btn.scissors {
  background: var(--scissors-gradient);
  top: -50px;
  right: -50px;
}

.choice-btn.rock {
  background: var(--rock-gradient);
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%); 
}

.selection-triangle {
  position: relative;
  width: 300px; 
  height: 280px;
}

.icon-wrapper{
  background-color: #e1e1e1;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  box-shadow: inset 0 6px rgba(0,0,0,0.1);
}

.result-stage{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5rem;
}

.result-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 900px;
  gap: 3rem; 
}

.user-pick, .computer-pick {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 3rem;
  min-width: 250px;
}

.result-stage .choice-btn {
  position: relative; 
  top: auto;
  left: auto;
  right: auto;
  bottom: auto;
  transform: scale(1.5); 
  cursor: default;
}

.pick-placeholder {
  width: 130px;
  height: 130px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  transform: scale(1.5);
}

.result-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  z-index: 10;
  margin: 0 2rem; 
}

.result-message h2 {
  color: white;
  font-size: 3.5rem;
  white-space: nowrap;
  margin-bottom: 0.5rem;
}

.play-again-btn {
  background: white;
  color: var(--dark-text);
  border: none;
  padding: 1rem 4rem;
  border-radius: 8px;
  font-family: inherit;
  font-size: 1rem;
  letter-spacing: 2.5px;
  cursor: pointer;
  transition: color 0.2s;
}

.play-again-btn:hover {
  color: hsl(349, 71%, 52%);
}

.choice-btn.winner {
  z-index: 1;
  animation: pulse-winner 2s infinite ease-in-out;
}

@keyframes pulse-winner {
  0% {
    box-shadow: 
      0 0 0 30px rgba(255, 255, 255, 0.05),
      0 0 0 60px rgba(255, 255, 255, 0.03),
      0 0 0 90px rgba(255, 255, 255, 0.02),
      inset 0 -6px rgba(0,0,0,0.2);
  }
  50% {
    box-shadow: 
      0 0 0 50px rgba(255, 255, 255, 0.07),
      0 0 0 90px rgba(255, 255, 255, 0.05),
      0 0 0 140px rgba(255, 255, 255, 0.03),
      inset 0 -6px rgba(0,0,0,0.2);
  }
  100% {
    box-shadow: 
      0 0 0 30px rgba(255, 255, 255, 0.05),
      0 0 0 60px rgba(255, 255, 255, 0.03),
      0 0 0 90px rgba(255, 255, 255, 0.02),
      inset 0 -6px rgba(0,0,0,0.2);
  }
}


@media (max-width: 768px) {
  .header {
    width: 120%;
    padding: 1rem;
    margin-top: 1rem;
  }
  
  .logo img {
    height: 60px;
  }
  
  .score-card {
    padding: 0.8rem 1.5rem;
  }
  
  .score-value {
    font-size: 2.5rem;
  }
  
  .rules-btn {
    position: absolute;
    margin-top: auto;
    margin-bottom: 2rem;
    transform: translateX(-65%);
  }

  .modal-overlay {
    background: var(--white);
    align-items: flex-start; 
  }

  .modal-content {
    width: 100%;
    height: 100%;
    border-radius: 0;
    justify-content: space-around;
    padding: 5rem 2rem;
  }

  .modal-header {
    justify-content: center; 
  }

  .close-btn {
    position: absolute;
    bottom: 4rem;
    left: 50%;
    transform: translateX(-50%);
    opacity: 1;
  }

  .triangle-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Centre parfaitement l'image au milieu du conteneur */
    width: 100%;
  }

  .selection-triangle {
    width: 200px;
    height: 200px;
  }

  .choice-btn {
    width: 100px;
    height: 100px;
  }

  .icon-wrapper {
    width: 75px;
    height: 75px;
  }

  .icon-wrapper img {
    width: 40px; 
  }

  .choice-btn.paper {
    top: -40px;
    left: -40px;
  }

  .choice-btn.scissors {
    top: -40px;
    right: -40px;
  }

  .choice-btn.rock {
    bottom: -10px;
  }
  /* Result Layout (Step 4) */
  .result-stage {
    margin-top: 2rem; /* Réduit l'espace avec le header */
  }

  .result-container {
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-between;
    align-items: flex-start; 
    width: 100%;
    max-width: 400px;
    gap: 0;
    margin: 0 auto;
  }

  .user-pick, .computer-pick {
    display: flex;
    flex-direction: column-reverse; 
    align-items: center;
    width: 45%; /* Réduit de 48% pour laisser plus d'espace au centre */
    min-width: 0;
    gap:1.5rem; 
  }

  .user-pick p, .computer-pick p {
    font-size: 0.8rem; 
    letter-spacing: 1px;
    font-weight: 700;
    white-space: nowrap;
    text-transform: uppercase;
  }

  .result-stage .choice-btn {
    transform: scale(0.9);
    position: relative;
    top: auto;
    left: auto;
    bottom: auto;
    right: auto;
    margin-bottom: 0;
  }

  .pick-placeholder {
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    transform: scale(0.9);
    margin-bottom: 0;
  }

  .result-message {
    order: 3;
    width: 100%;
    text-align: center;
    margin-top: 1.5rem; /* Réduit pour ne pas pousser vers le bouton Rules */
    gap: 0.8rem;
  }

  .result-message h2 {
    font-size: 2.2rem; /* Réduit pour gagner de la place */
  }

  .play-again-btn {
    padding: 0.7rem 2.5rem; /* Bouton plus compact */
    font-size: 0.9rem;
    white-space: nowrap; /* Empêche le texte de passer à la ligne */
  }

}
</style>
