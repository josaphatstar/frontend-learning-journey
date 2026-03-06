<template>
  <div id="app">
    <!-- Image de fond pour l'effet de halo (optionnel si tu l'as dans resources) -->
    <div class="bg-glow"></div>

    <div class="form-step" v-if="currentStep === 1">
      <h1>Register</h1>

      <div class="input-group">
        <label>Name</label>
        <input type="text" placeholder="Enter your name" v-model="name">
      </div>

      <div class="input-group">
        <label>Email</label>
        <input type="email" placeholder="Example@gmail.com" v-model="email" required>
      </div>

      <div class="button-container">
        <button class="btn-continue" @click="nextStep">Continue</button>
      </div>
    </div>

    <div v-else-if="currentStep === 2" class="form-step">
      <h1>Which topics you are interested in?</h1>

      <div class="topics-list">
        <div 
          v-for="topic in availableTopics" 
          :key="topic"
          class="topic-item"
          :class="{ 'active': selectedTopics === topic}"
          @click="toggleTopic(topic)"
        >
          {{ topic }}
        </div>
      </div>

      <button class="btn-continue" @click="nextStep">Continue</button>
    </div>


    <div v-else-if="currentStep === 3" class="form-step">
      <h1>Summary</h1>

      <div class="summary-content">
        <p><span class="label">Name:</span> <span class="value">{{ name }}</span></p>
        <p><span class="label">Email:</span> <span class="value">{{ email }}</span></p>
        
        <div class="summary-topics">
          <p class="label">Topics: <span>{{ selectedTopics }}</span></p>
        </div>
      </div>

      <div class="button-container">
        <button class="btn-continue" @click="confirmRegistration">Confirm</button>
      </div>
    </div>



    <div class="step-footer">
      <p>Step {{ currentStep }} of 3</p>
      <div class="dots">
        <span class = "dot" :class="{ 'dot active': currentStep === 1 }"></span>
        <span class = "dot" :class="{ 'dot active': currentStep === 2 }"></span>
        <span class = "dot" :class="{ 'dot active': currentStep === 3 }"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data() {
    return {
      name: "",
      email: "",
      currentStep: 1,
      availableTopics: ["Software Development", "User Experience", "Graphic Design"],
      selectedTopics: ""
    }
  },
  methods:{
    nextStep(){
      if (this.name && this.email) {
        this.currentStep++;
      } 
    },
    toggleTopic(topic) {
      this.selectedTopics = topic;
    },
    confirmRegistration() {
      alert(`Félicitations ${this.name} ! Ton inscription au thème "${this.selectedTopics}" est validée.`);
      this.currentStep = 1;
      this.name = "";
      this.email = "";
      this.selectedTopics = "";
    }
  }
}

</script>

<style>

body {
  background-color: #121826;
  background-image: radial-gradient(circle at 20% 30%, #2d1b4e 0%, #121826 50%); /* Simule le halo violet */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Pour empiler la carte et le footer */
}

.form-step {
  background-color: #212936;
  padding: 40px;
  border-radius: 16px;
  width: 350px;
  border: 1px solid #3f3f46;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

h1{
  color: white;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: left;
}

.input-group{
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.input-group label{
  color: white;
  font-size: 0.8rem;
  margin-bottom: 8px;
  text-align: start;
}

.input-group input{
  background-color: transparent;
  border: 2px solid #3f3f46;
  color: white;
  padding: 12px;
  border-radius: 8px;
  outline: none;
}

.input-group input:focus{
  border-color: #845ef7;
}

/* Bouton en forme de Pilule */
.btn-continue {
  background: linear-gradient(90deg, #845ef7, #5c7cfa);
  border: none;
  color: white;
  padding: 10px 40px;
  border-radius: 999px; /* Le secret de la forme pilule */
  font-weight: 600;
  cursor: pointer;
  margin: 30px auto 0;
  display: block; /* Pour centrer le bouton */
}

/* Style des étapes en bas */
.step-footer {
  margin-top: 20px;
  /* text-align: center; */
  color: #a1a1aa;
  font-size: 0.8rem;
  display : flex;
  justify-content: space-evenly;
  align-items: center;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: #3f3f46;
  border-radius: 50%;
}

.dot.active {
  background-color: #845ef7;
  box-shadow: 0 0 10px #845ef7;
}

.topics-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.topic-item {
  background-color: #78789a;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  color: #ffffff
}

.topic-item:hover {
  background-color:  #585871;
}

.topic-item.active {
  border-color: #5e3f98;
  background-color: #2d1b4e;
  color: rgb(255, 255, 255);
}


.summary-content p {
  margin-bottom: 15px;
  font-size: 1rem;
  display:block;
}

.summary-content .label {
  color: #a1a1aa; 
  margin-right: 5px;
  display: flex;
  justify-content: start;
  font-weight: 800;
}

.summary-content .value {
  color: #ffffff; 
  font-weight: 500;
  margin-right: 5px;
  display: flex;
  justify-content: start;
  align-items: center;
}

.summary-topics {
  margin-top: 25px;
}

.summary-topics span { 
  color: #fff;
  margin-left: 10px;
  font-weight: 500 ;
}

</style>