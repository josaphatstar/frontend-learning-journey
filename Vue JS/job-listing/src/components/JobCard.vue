<template>
  <div class="job-card">
    <div class="logo">
      <img :src="job.logo" alt="logo">
    </div>
    <div class="infos">
      <div class="company">
        <div class="company-name">{{ job.company }}</div>
        <div v-if="job.new" class="new">New</div>
        <div v-if="job.featured" class="featured">FEATURED</div>
      </div>
      <div class="position">{{ job.position }}</div>
      <div class="work-infos">
        <div class="time">{{ job.postedAt }}</div>
        <div class="type">{{ job.contract }}</div>
        <div class="location">{{ job.location }}</div>
      </div>
    </div>
    <div class="skills">
      <div class="skill" @click="$emit('filtering',job.role)">{{ job.role }}</div>
      <div class="skill" @click="$emit('filtering',job.level)">{{ job.level }}</div>
      <div v-for="lang in job.languages" :key="lang" class="skill" @click = "$emit('filtering',lang)">{{ lang }}</div>
      <div v-for="tool in job.tools" :key="tool" class="skill" @click = "$emit('filtering',tool)">{{ tool }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JobCard',
  props: {
    job: {
      type: Object,
      required: true
    }
  },
  emits: ['filtering']
}
</script>

<style scoped>
.job-card {
  width: 1000px;
  min-height: 140px;
  padding: 15px 20px;
  background: white;
  display: grid;
  grid-template-columns: 8% 32% 60%;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(92, 165, 165, 0.15);
  margin-top: 40px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  width: 80px;
  height: 80px;
}

.infos {
  display: grid;
  grid-template-rows: 30% 40% 30%;
  padding-left: 20px;
}

.company {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.company-name {
  color: var(--primary);
  font-weight: 700;
  margin-right: 15px;
}

.new {
  background-color: var(--primary);
  color: white;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 12px;
}

.featured {
  background-color: var(--very-dark-gray-cyan);
  color: white;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 12px;
}

.position {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: var(--very-dark-gray-cyan);
  cursor: pointer;
}

.position:hover {
  color: var(--primary);
}

.work-infos {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
  align-items: center;
  color: var(--dark-gray-cyan);
}

.skills {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  align-items: center;
}

.skill {
  background-color: var(--filter-tab);
  color: var(--primary);
  font-weight: 700;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.skill:hover {
  color: white;
  background-color: var(--primary);
}

@media (max-width : 768px) {
  .job-card {
    width: 100%;
    height: auto;
    grid-template-columns : 1fr;
    padding-top: 50px;
    position: relative;
    margin-top: 60px;
    padding : 30px 20px 20px 20px
  }

  .logo {
    position : absolute;
    top : -25px;
    left : 20px;
  }

  .logo img {
    width: 50px;
    height: 50px;
  }

  .skills {
    border-top : 1px solid #ccc;
    padding-top: 15px;
    justify-content: flex-start;
    flex-wrap : wrap
  }

  .work-infos {
    font-size : 13px;
  }

  .infos {
    padding-bottom : 10px;
  }
  .position{
    padding: 10px 0;
  }
}
</style>
