<script setup>
import { computed, ref } from 'vue';

import imageTanya from './assets/image-tanya.jpg';
import imageJohn from './assets/image-john.jpg';

const testimonials = [
  {
    name: 'Tanya Sinclair',
    job: 'UX Engineer',
    testimony: `“ I’ve been interested in coding for a while but never taken the jump, until now. 
      I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”`,
    image: imageTanya
  },
  {
    name: 'John Tarkpor',
    job: 'Junior Front-end Developer',
    testimony: `“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ”`,
    image: imageJohn
  }
] 

const currentIndex = ref(0);

const current = computed(() => testimonials[currentIndex.value]);

const next = () => (currentIndex.value = (currentIndex.value + 1) % testimonials.length);
const prev = () => (currentIndex.value = (currentIndex.value - 1 + testimonials.length) % testimonials.length);
</script>

<template>
  <main>
    <div class="container">
      <div class="slider">
        <img :src="current.image" :alt="current.name" />
        <div class="btn">
          <button type="button" class="nav-btn" @click="prev" aria-label="Previous testimonial">
            <img src="./assets/icon-prev.svg" alt="" />
          </button>
          <button type="button" class="nav-btn" @click="next" aria-label="Next testimonial">
            <img src="./assets/icon-next.svg" alt="" />
          </button>
        </div>
      </div>

      <div class="testimony">
        <p>{{ current.testimony }}</p>
        <span>
          {{ current.name }}
          <small>{{ current.job }}</small>
        </span>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap');

:global(*) {
  box-sizing: border-box;
}

main {
  min-height: 100svh;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  font-family: 'Inter', sans-serif;
  background-image: url('./assets/pattern-bg.svg'), url('./assets/pattern-curve.svg');
  background-repeat: no-repeat, no-repeat;
  background-position: center 2rem, left bottom;
  background-size: min(20rem, 85vw), min(17rem, 70vw);
}

.container {
  width: min(100%, 70rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.slider {
  width: min(100%, 22rem);
  position: relative;
  display: grid;
  place-items: center;
}

.slider img {
  width: 100%;
  display: block;
  border-radius: 0.45rem;
  box-shadow: 0 2rem 2.75rem -2rem hsl(240 38% 20% / 0.45);
}

.btn {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: white;
  border-radius: 999px;
  padding: 0.9rem 1rem;
  box-shadow: 0 0.65rem 1.1rem hsl(240 38% 20% / 0.2);
}

.nav-btn {
  border: none;
  background: transparent;
  padding: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.nav-btn img {
  width: auto;
  box-shadow: none;
}

.testimony {
  width: 100%;
  text-align: center;
  color: hsl(240, 38%, 20%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  background-image: url('./assets/pattern-quotes.svg');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 3.75rem;
  padding-top: 1.5rem;
}

.testimony p {
  font-size: clamp(1.15rem, 3.6vw, 2rem);
  line-height: 1.4;
  font-weight: 300;
  max-width: 37ch;
}

.testimony span {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.95rem;
  font-weight: 700;
}

.testimony small {
  color: hsl(240, 18%, 77%);
  font-size: 0.95rem;
  font-weight: 500;
}

@media (min-width: 64rem) {
  main {
    padding: 3rem 6rem;
    background-position: right 9rem center, left bottom;
    background-size: 43rem, 38rem;
  }

  .container {
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    gap: 0;
  }

  .slider {
    width: min(37.5rem, 50vw);
    margin-left: -5.5rem;
    z-index: 1;
  }

  .btn {
    left: 20%;
    transform: translate(-20%, 50%);
  }

  .testimony {
    align-items: flex-start;
    text-align: left;
    flex: 1;
    max-width: 40rem;
    background-position: 6rem top;
    background-size: 7rem;
    padding-top: 4.25rem;
    z-index: 2;
  }

  .testimony p {
    line-height: 1.35;
  }

  .testimony span {
    flex-direction: row;
    align-items: center;
    gap: 0.55rem;
    font-size: 1.25rem;
  }

  .testimony small {
    font-size: 1.15rem;
  }
}

@media (max-width: 23.5rem) {
  .btn {
    gap: 0.7rem;
    padding-inline: 0.85rem;
  }

  .testimony p {
    font-size: 1.05rem;
  }
}
</style>