<script setup>
import { ref } from "vue";

const show = ref(false)
const url = ref("")
const img = ref(null)
const error = ref("")

const generateQRCode = (value) => {
  const encoded = encodeURIComponent(value)
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`
}

const handleQrError = () => {
  error.value = "Impossible de charger le QrCOde"
  img.value = null
  show.value = false
}

const submit = () => {
  if(!url.value) return
  img.value = generateQRCode(url.value)
  show.value = true
}

const downloadQRCode = async () => {
  if (!img.value) return;

  try {
    const res = await fetch(img.value);
    if (!res.ok) throw new Error("Network response was not ok");
    const blob = await res.blob();
    const downloadurl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadurl;
    a.download = "qrcode.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(downloadurl);
  } catch (e) {
    error.value = "Impossible de télécharger le QR code. Vérifiez votre connexion internet ou essayez à nouveau plus tard.";
  }
  window.open(img.value, "_blank");
}

const sharingError = ref("")

const shareQRCode = async () => {
  if (!img.value) return

  if (navigator.share) {
    try {
      await navigator.share({
        title: "QR Code",
        text: "Voici le QR code que j'ai généré !",
        url: img.value
      })
    } catch (err) {
      if (err.name !== "AbortError") {
        sharingError.value = "Le partage a échoué. Réessayez."
      }
    }
    return
  }

    try {
      await navigator.clipboard.writeText(img.value)
      sharingError.value = "Lien copié dans le presse-papiers."
    } catch (e) {
      sharingError.value = "Impossible de copier le lien.Copiez-le manuellement : " + img.value
    }
}


</script>

<template>
  <main>
    <div class="container">
      <img src="./assets/Logo-small.svg" alt="Logo">
      <div class="box" v-if="!show">
        <input type="text" placeholder="Enter an url" v-model="url">
        <button @click="submit">QR code</button>

        <div class="message error" v-if="error" role="alert" aria-live="assertive">
          <span class="icon" aria-hidden="true">⚠️</span>
          <span class="text">{{ error }}</span>
          <div class="actions">
            <button @click="retryAfterError">Réessayer</button>
            <button @click="error = ''" aria-label="Fermer le message">✕</button>
          </div>
        </div>
      </div>

      <div class="show" v-else>
         <div class="circle">
          <img :src="img" alt="QR Code" @error="handleQrError">
         </div>
         <div class="buttons">
          <button @click="downloadQRCode">Download <img src="./assets/Load_circle_duotone.svg" alt="Download"></button>
          <button @click="shareQRCode">Share <img src="./assets/link_alt.svg" alt="Share"></button>
         </div>
         <div class="message share"v-if="sharingError">
          {{ sharingError }}
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main{
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("/qa-bg.jpg");
}

.box{
  margin-top: 15px;
  padding: 5px;
  border: solid blue;
  min-width: 500px;
  background-color:#000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-radius: 15px;
}

input{
  flex-grow: 1;
  margin: 5px;
  font-size: large;
  border: none;
  background-color: #000;
  outline: none;
  color: #fff
}

button{
border: none;
height: 98%;
padding: 8px 25px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 10px;
color: #fff;
background-color: blue;
font-weight: 600;
cursor: pointer;
}

.show{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.circle{
  height: 250px;
  width: 250px;
  border-radius: 50%;
  border: solid gray;
  margin: 50px 0;
}

.buttons{
  display: flex;
  width: 300px;
  justify-content: space-between;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle img {
  max-width: 100%;
  max-height: 100%;
}

.message.error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2b0a0a;
  color: #ffdede;
  padding: 8px 12px;
  border-radius: 8px;
  margin-top: 10px;
  gap: 10px;
}
.message.error .icon { font-size: 18px; }
.message.error .actions button {
  margin-left: 8px;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.15);
  color: inherit;
  padding: 4px 8px;
  border-radius: 6px;
}

.box {
  position: relative; /* nécessaire pour le positionnement absolu du message */
}

/* message centré en bas, juste en dessous du contenu de .box */
.message.error {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -56px;              /* ajuste la distance sous la box */
  width: calc(100% - 24px);   /* laisse des marges latérales */
  max-width: 680px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: #2b0a0a;
  color: #ffdede;
  padding: 10px 12px;
  border-radius: 8px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.35);
  z-index: 10;
}

/* rend le texte centré si actions invisibles */
.message.error .text { flex: 1; }

.message.share {
  margin-top: 16px;
  color: #a8ffd8;
  background: rgba(15, 70, 30, 0.15);
  padding: 10px 14px;
  border-radius: 10px;
  max-width: 320px;
  text-align: center;
}

/* petits écrans — réduire largeur/bottom */
@media (max-width: 480px) {
  .message.error {
    bottom: -68px;
    width: calc(100% - 12px);
    padding: 8px;
    font-size: 14px;
  }
}


</style>