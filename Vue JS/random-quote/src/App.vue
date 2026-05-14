<script>
export default {
  data(){
    return {
      quote: "Learn from yesterday, live for today, hope for tomorrow.",
      author: "Georges Bernard Shaw",
      tags: ["Inspirational", "Famous Quote"]
    }
  },

  methods: {
    async getNewQuote() {
      try {
        this.quote = "Chargement de la citation...";
        const response = await fetch("https://dummyjson.com/quotes/random");
        const data = await response.json();
        
        this.quote = data.quote;
        this.author = data.author;
        this.tags = ["Inspirational"]; // DummyJSON ne fournit pas de tags, on en met un par défaut
      } catch (error) {
        console.error("Erreur lors de la récupération :", error);
        this.quote = "Oups, impossible de charger la citation...";
      }
    },
    copyQuote() {
    navigator.clipboard.writeText(this.quote);
    alert("Citation copiée !");
  }

  }
}
  
</script>

<template>
  <div class="app-container">
    <main class="quote-card">
      <!-- 1. En-tête de la carte avec l'auteur et les tags -->
      <header class="card-header">
        <h2 class="author-name">{{ author }}</h2>
        <div class="tags-container">
          <span v-for="tag in tags" :key="tag" class="tag">{{tag}}</span>
        </div>
      </header>
      <!-- 2. Corps de la carte avec la citation -->
      <div class="card-body">
        <blockquote class="quote-text">
          “{{ quote }}”
        </blockquote>
      </div>
    </main>

    <!-- 3. Les boutons en bas, alignés horizontalement -->
    <footer class="app-footer">
      <button class="btn btn-random" title="Nouvelle citation" @click="getNewQuote">
        Random <img src="/src/assets/regroup.svg" alt="refresh">
      </button>
      <button class="btn btn-share" title="Partager la citation" @click="copyQuote">
        Share <img src="/src/assets/link.svg" alt="share">
      </button>
    </footer>
  </div>
</template>


<style>
/* Reset global */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #111422; /* Le bleu très foncé du fond */
  color: #FFFFFF;
  font-family: 'Outfit', sans-serif; /* Une police moderne */
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 600px;
  padding: 20px;
}

/* La Carte */
.quote-card {
  background-color: #202638; /* Le fond de la carte */
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  /* Optionnel : tu peux ici ajouter l'image de fond "wave" si tu veux */
}

.card-header {
  margin-bottom: 30px;
}

.author-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.tags-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.tag {
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid #4a5568;
  color: #94a3b8;
}

.quote-text {
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 500;
  color: #e2e8f0;
}

/* Les Boutons en bas */
.app-footer {
  display: flex;
  gap: 16px; /* Espace entre les deux boutons */
}

.btn {
  background-color: #202638;
  border: none;
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  transition: transform 0.2s, background-color 0.2s;
}

.btn:hover {
  background-color: #2d3748;
  transform: translateY(-2px);
}

.attribution {
  font-size: 0.8rem;
  color: #4a5568;
  margin-top: 20px;
}
</style>
