<script setup>
import { ref, computed, onMounted } from 'vue';
import ExtensionCard from "./components/ExtensionCard.vue";
import extensionData from './data.json'

const extensions = ref(extensionData)
const theme = ref('light')

/** Met <html data-theme="..."> en accord avec theme (pour le CSS [data-theme='dark']). */
function applyThemeToDocument() {
  document.documentElement.setAttribute('data-theme', theme.value)
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  applyThemeToDocument()
}

onMounted(() => {
  applyThemeToDocument()
})

const filter = ref('all')
const filteredExtensions = computed(() => {
    if(filter.value === 'all'){
    return extensions.value;
  }else if (filter.value === 'active'){
    return extensions.value.filter(ext => ext.isActive);
  }else{
    return extensions.value.filter(ext => !ext.isActive);
  }
})

function toggleExtension(name){
  const ext = extensions.value.find(e => e.name === name)
  if (ext) {
    ext.isActive = !ext.isActive;
  }
}

function removeExtension(name){
  extensions.value = extensions.value.filter(e => e.name !== name)
}

</script>

<template>
  <main>
      <header class="first">
        <img src="/images/logo.svg" alt="Extensions" width="149" height="32" />
        <button type="button" class="mode" :aria-label="theme === 'light' ? 'Activer le thème sombre' : 'Activer le thème clair'" @click="toggleTheme" >
          <img :src="theme === 'light' ? '/images/icon-moon.svg' : '/images/icon-sun.svg'" alt="" width="20" height="20" />
        </button>
      </header>


      <div class="container">
        <div class="navbar">
          <h1 class="page-title">Extensions List</h1>
          <div class="buttons" role="group" aria-label="Filter extensions">
            <button type="button" :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
            <button type="button" :class="{ active: filter === 'active' }" @click="filter = 'active'">Active</button>
            <button type="button" :class="{ active: filter === 'inactive' }" @click="filter = 'inactive'">Inactive</button>
          </div>
        </div>

        <div class="extensions-grid">
          <ExtensionCard
            v-for="ext in filteredExtensions"
            :key="ext.name"
            :name="ext.name"
            :description="ext.description"
            :logo="ext.logo"
            :isActive="ext.isActive"

            @toggle="toggleExtension(ext.name)"
            @remove="removeExtension(ext.name)"
          />
        </div>
      </div>
  </main>
</template>

<style scoped>
main{
  width: min(100% - 2rem, 75rem);
  margin-inline: auto;
  padding: 1.5rem 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.5rem;
}

.first{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-subtle);
  background-color: var(--surface-elevated);
  box-shadow: var(--shadow-header);
}

.first img[alt="Extensions"] {
  display: block;
}

.mode{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border-radius: 0.5rem;
  border: 1px solid var(--border-subtle);
  background-color: var(--theme-toggle-bg);
  color: inherit;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.mode:hover {
  background-color: var(--neutral-200);
  border-color: var(--neutral-300);
}

.container{
  width: 100%;
}

.navbar{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem 1.5rem;
  margin-bottom: 10px
}

.page-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.buttons button{
  padding: 0.5rem 1.125rem;
  border-radius: 624.9375rem;
  border: 1px solid var(--filter-border);
  background-color: var(--filter-bg);
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.875rem;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.buttons button.active {
  background-color: var(--red-500);
  color: #fff;
  border-color: var(--red-500);
}

.buttons button:not(.active):hover {
  background-color: var(--neutral-100);
  border-color: var(--neutral-600);
  color: var(--text-primary);
}

.buttons{
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.extensions-grid{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

@media (max-width: 900px){
  .extensions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px){
  main {
    width: min(100% - 1.25rem, 75rem);
    padding-top: 1rem;
  }

  .extensions-grid {
    grid-template-columns: 1fr;
  }

  .navbar{
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }

  .buttons {
    justify-content: center;
  }
}
</style>
