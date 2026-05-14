<script setup>
import TicketForm from './components/TicketForm.vue';
import Ticket from './components/Ticket.vue';

import { ref } from 'vue';

const isTicketGenerated = ref(false);

const finalName = ref('');
const finalEmail = ref('');
const finalGitHub = ref('');
const finalAvatarUrl = ref(null);

const genererLeBillet = (valise) => {
  finalName.value = valise.fullName;
  finalEmail.value = valise.email;
  finalGitHub.value = valise.githubUsername;
  finalAvatarUrl.value = valise.avatarUrl;

  isTicketGenerated.value = true
}
</script>

<template>
  <main class="app-container">
    <header class="header" v-if="!isTicketGenerated">
      <img src="../src/assets/logo-full.svg" alt="Coding Conf Logo" class="logo">
      <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
      <p class="subtitle">Secure your spot at next year's biggest coding conference.</p>
    </header>

    <TicketForm v-if="!isTicketGenerated" @form-submitted="genererLeBillet" />

    <header class="header" v-else>
      <img src="../src/assets/logo-full.svg" alt="Coding Conf Logo" class="logo">
      <h1>Congrats, {{ finalName }}! Your ticket is ready.</h1>
      <p class="subtitle">
        We've emailed your ticket to <span>{{ finalEmail }}</span>
        and will send updates in the run up to the event.
      </p>
    </header>

    <Ticket v-if="isTicketGenerated" :finalName="finalName" :finalEmail="finalEmail" :finalGitHub="finalGitHub" :finalAvatarUrl="finalAvatarUrl"/>
    
  </main> 
</template>

<style lang="scss">
/* Import de la police demandée par la maquette */
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;700;800&display=swap');

/* On applique sur le body global pour avoir l'image de fond sur tout l'écran */
html,
body {
  width: 100%;
  min-height: 100svh;
  margin: 0;
  overflow-x: hidden;
}

body {
  background-color: hsl(248, 70%, 10%);
  background-size: cover;
  background-position: top center;
  color: hsl(0, 0%, 100%);
  font-family: 'Inconsolata', sans-serif;

  background-image: 
    url('../src/assets/pattern-squiggly-line-top.svg'),
    url('../src/assets/pattern-squiggly-line-bottom-desktop.svg'),
    url('../src/assets/pattern-lines.svg'),
    radial-gradient(circle at top, hsl(248, 45%, 16%), hsl(248, 70%, 10%));   
  
  background-position: top right, bottom left, center, center;
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-size: 400px, 420px, cover, cover;
}

#app {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 100svh;
  width: 100%;
  padding: 40px 0;
  border: none;
}

/* Toutes les couleurs officielles du style-guide.md */
$color-neutral-0: hsl(0, 0%, 100%);
$color-neutral-300: hsl(252, 6%, 83%);
$color-neutral-500: hsl(245, 15%, 58%);
$color-neutral-700: hsl(245, 19%, 35%);
$color-orange-500: hsl(7, 88%, 67%);

.app-container {
  max-width: 680px;
  width: 100%;
  padding: 0 24px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 28px;
  box-sizing: border-box;
}

.header {
  max-width: 620px;

  span{
    color: $color-orange-500;
  }

  .logo {
    width: 180px;
    margin-bottom: 14px;
  }
  h1 {
    margin: 0;
    font-size: clamp(1.8rem, 1.2rem + 1.8vw, 3.1rem);
    font-weight: 800;
    line-height: 1.1;
    
    background: linear-gradient(180deg, hsl(0, 0%, 100%), hsl(252, 6%, 83%));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
  }

  .subtitle {
    margin-top: 14px;
    color: $color-neutral-300;
    font-size: clamp(1rem, 0.94rem + 0.32vw, 1.16rem);
    white-space: normal;
    line-height: 1.5;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 820px) {
  body {
    background-image: 
      url('../src/assets/pattern-squiggly-line-top.svg'),
      url('../src/assets/pattern-squiggly-line-bottom-mobile-tablet.svg'),
      url('../src/assets/pattern-lines.svg'),
      radial-gradient(circle at top, hsl(248, 45%, 16%), hsl(248, 70%, 10%));
    background-position: top right, bottom left, center, center;
    background-size: 220px, 260px, cover, cover;
  }

  #app {
    padding: 24px 0 28px;
  }

  .app-container {
    padding: 0 16px;
    gap: 20px;
  }

  .header .logo {
    width: 150px;
  }

  .header h1 {
    line-height: 1.15;
  }

  .header .subtitle {
    max-width: 35ch;
  }
}

@media (max-width: 480px) {
  #app {
    padding: 18px 0 24px;
  }

  .header .logo {
    width: 128px;
    margin-bottom: 10px;
  }

  .header .subtitle {
    font-size: 0.96rem;
    line-height: 1.45;
  }
}
</style>