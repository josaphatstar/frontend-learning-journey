<template>
  <div id="app">
    <header class="header-bg"></header>

    <div class="container">
    <div v-if="activeFilters.length > 0" class="filter-bar">
  
      <div class="filter-tags">
        <div v-for="tag in activeFilters" :key="tag" class="filter-tab">
          <span>{{ tag }}</span>
          <button class="remove-btn"  @click="removeFilter(tag)">
            <img src="/images/icon-remove.svg" alt="remove">
          </button>
        </div>
      </div>
      <div class="clear-btn" @click="clearAllFilters">Clear</div>

   </div>

      <JobCard 
        v-for="job in filteredJobs" 
        :key="job.id" 
        :job="job" 
        @filtering="addFilter"
      />
    </div>
  </div>
</template>

<script>
import jobsData from './data.json'
import JobCard from './components/JobCard.vue'

export default {
  name: 'App',
  components: {
    JobCard
  },
  data() {
    return {
      jobs: jobsData,
      activeFilters: [],
    }
  },
  methods: {
    addFilter(tagName) {
      if (!this.activeFilters.includes(tagName)){
        this.activeFilters.push(tagName);
      }
      console.log("filters actifs", this.activeFilters);
    },

    removeFilter(tagToRemove){
      this.activeFilters = this.activeFilters.filter(tag => tag !== tagToRemove);
    },

    clearAllFilters(){
      this.activeFilters = [];
    }


  },

  computed: {
    filteredJobs() {
      if (this.activeFilters.length === 0) {
        return this.jobs;
      }

      return this.jobs.filter(job => {
        const tags = [job.role, job.level, ...job.languages, ...job.tools];
        
        return this.activeFilters.every(filter => tags.includes(filter));
      });
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@500;700&display=swap');

:root {
  --primary: hsl(180, 29%, 50%);
  --bg: hsl(180, 52%, 96%);
  --filter-tab: hsl(180, 31%, 95%);
  --dark-gray-cyan: hsl(180, 8%, 52%);
  --very-dark-gray-cyan: hsl(180, 14%, 20%);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'League Spartan', sans-serif;
  background-color: var(--bg);
  min-height: 100vh;
  padding-top: 70px;
}

.header-bg {
  height: 150px;
  background-color: var(--primary);
  background-image: url('/images/bg-header-desktop.svg');
  background-size: cover;
  position: fixed; 
  top: 0;          
  left: 0;         
  width: 100%;     
  z-index: 100;   
  box-shadow: 0 4px 6px 5px rgba(114, 142, 142, 0.2);}

.container {
  max-width: 1110px;
  margin: 0 auto;
  padding: 20px 50px;
}

.filter-bar{
  background-color: var(--filter-tab);
  padding: 20px 40px;
  border-radius: 5px;
  margin-top : -35px;
  margin-bottom : 40px;
  position : fixed;
  top: 140px; 
  left: 50%; 
  transform: translateX(-50%);
  width: 100%;
  max-width: 1020px;
  z-index : 101;
  box-shadow: 0 15px 20px -5px rgba(92, 165, 165, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
}

.filter-tab {
  display: flex;
  align-items: center;
  background-color: var(--filter-tab); 
  border-radius: 4px;
  overflow: hidden; 
}
.filter-tab span {
  color: var(--primary); 
  font-weight: 700;
  padding: 0 12px;
  font-size: 13px;
  background: transparent; 
}

.filter-tags{
  display: flex;
  flex-wrap: wrap;
  gap : 16px;
  justify-content: space-between;
}

.remove-btn{
  border: none;
  background-color: var(--primary);
  cursor: pointer;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 100%
}

.remove-btn:hover{
  background-color: var(--very-dark-gray-cyan);
}

.clear-btn{
  text-align: end;
  color: var(--primary);
  cursor: pointer;
  font-weight: 700;
  align-items: center;
  justify-content: space;
  display: flex;
}

.clear-btn:hover{
  text-decoration: underline;
} 



@media (max-width: 768px) {
  .header-bg {
    background-image: url('/images/bg-header-mobile.svg');
  }
}

</style>