<script setup>
const props = defineProps({
  finalName: String,
  finalEmail: String,
  finalGitHub: String,
  finalAvatarUrl: String
})

</script>

<template>
  <div class="ticket-container">
    <div class="ticket-background">
      <div class="ticket-left">
        <div class="conf-info">
          <img src="../assets/logo-mark.svg" alt="Coding Conf Logo" class="logo-mark" />
          <div class="conf-titles">
            <h2>Coding Conf</h2>
            <p>Jan 31, 2025 / Austin, TX</p>
          </div>
        </div>

        <div class="user-info">
          <img :src="finalAvatarUrl" alt="Avatar" class="avatar" />
          <div class="user-details">
            <h3>{{ finalName }}</h3>
            <span class="github">
              <img src="../assets/icon-github.svg" alt="Github" class="github-icon" /> 
              {{ finalGitHub }}
            </span>
          </div>
        </div>
      </div>

      <div class="ticket-right">
        <span class="ticket-number">#01609</span>
      </div>
    </div>
  </div>    
</template>

<style lang="scss" scoped>
.ticket-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: min(100%, 640px);
  margin-top: 6px;
}

.ticket-background {
  position: relative;
  max-width: 680px;
  width: 100%;
  aspect-ratio: 500 / 238;
  background-image: url('../assets/pattern-ticket.svg'); /* Le fond du ticket ! */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  color: hsl(0, 0%, 100%);
  text-align: left;
}

/* Partie principale du ticket */
.ticket-left {
  flex: 3;
  padding: clamp(20px, 3.4vw, 34px) clamp(18px, 3.3vw, 30px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
}

.conf-titles {
  h2,
  p {
    white-space: normal;
    word-break: break-word;
  }
}

.conf-info {
  display: flex;
  align-items: flex-start;
  gap: 15px;

  .logo-mark {
    width: clamp(28px, 4.9vw, 40px);
    margin-top: 2px;
  }

  h2 {
    margin: 0 0 5px 0;
    font-size: clamp(1.5rem, 1.12rem + 1.46vw, 2.3rem);
    font-weight: 700;
  }

  p {
    margin: 0;
    color: hsl(252, 6%, 83%); /* Neutral-300 */
    font-size: clamp(0.98rem, 0.8rem + 0.62vw, 1.22rem);
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;

  .avatar {
    width: clamp(44px, 8.6vw, 66px);
    height: clamp(44px, 8.6vw, 66px);
    border-radius: 10px;
    object-fit: cover;
  }

  h3 {
    margin: 0 0 5px 0;
    font-size: clamp(1.26rem, 1rem + 0.78vw, 1.68rem);
    font-weight: 500;
    word-break: break-word;
  }

  .github {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: clamp(0.98rem, 0.8rem + 0.6vw, 1.16rem);
    color: hsl(252, 6%, 83%);
    word-break: break-word;

    .github-icon {
      width: 22px;
    }
  }
}

/* Bordure détachable du ticket */
.ticket-right {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: clamp(10px, 2.5vw, 24px); /* Pousse le chiffre vers la gauche (loin du bord droit) */
  
  .ticket-number {
    font-size: clamp(1.28rem, 0.9rem + 1.2vw, 1.82rem);
    font-weight: 500;
    color: hsl(245, 15%, 58%); /* Neutral-500 */
    writing-mode: vertical-rl; /* Fait pivoter le texte ! */
  }
}

/* --- RESPONSIVITE --- */
@media (max-width: 480px) {
  .ticket-container {
    width: 100%;
    padding: 0;
    margin-top: 4px;
  }

  .ticket-background {
    max-width: 100%;
    aspect-ratio: 500 / 265;
  }

  .ticket-left {
    padding: 14px 13px;
  }
  
  .conf-info {
    gap: 9px;
    align-items: center;
  }

  .conf-info h2 { font-size: 1.26rem; }
  .conf-info p { font-size: 0.84rem; }
  .logo-mark { width: 24px; }
  
  .user-info {
    gap: 8px;
  }

  .user-info .avatar {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }
  .user-info h3 { font-size: 1.12rem; margin-bottom: 3px; }
  .user-info .github { font-size: 0.88rem; gap: 5px; }
  .user-info .github .github-icon { width: 15px; }

  .ticket-right {
    padding-right: 7px;
  }
  .ticket-right .ticket-number {
    font-size: 0.98rem;
    writing-mode: vertical-rl;
  }
}
</style>