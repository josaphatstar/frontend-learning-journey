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

    <section class="game-stage">
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
      ShowRules: false
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

.rules-img{
  width: 100%;
  height: auto;
}

.game-stage{
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  position:relative;
  width : 100%
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

    /* On réduit la taille du conteneur du triangle */
  .selection-triangle {
    width: 250px;
    height: 250px;
  }

  /* On réduit la taille des boutons */
  .choice-btn {
    width: 100px;
    height: 100px;
  }

  .icon-wrapper {
    width: 75px;
    height: 75px;
  }

  .icon-wrapper img {
    width: 40px; /* On réduit aussi l'icône à l'intérieur */
  }

  /* On ajuste les positions pour qu'ils collent au nouveau triangle */
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
}
</style>
