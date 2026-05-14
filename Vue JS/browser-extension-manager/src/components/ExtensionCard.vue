<script setup>
const props = defineProps({
    name: String,
    description: String,
    logo: String,
    isActive: Boolean
})

const emit = defineEmits(["toggle", "remove"]);


</script>

<template>
    <article class="card">
        <div class="top">
            <img class="logo" :src="props.logo" :alt="''" width="60" height="60" />
            <div class="title">
                <h2 class="name">{{ props.name }}</h2>
                <p class="desc">{{ props.description }}</p>
            </div>
        </div>
        <div class="bottom">
            <button type="button" class="remove" @click="emit('remove')">Remove</button>
            <label class="switch" :aria-label="isActive ? 'Deactivate extension' : 'Activate extension'">
                <input type="checkbox" :checked="props.isActive" @change="emit('toggle')">
                <span class="slider"></span>
            </label>
        </div>

    </article>
</template>

<style scoped>
.card {
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  padding: 1.25rem;
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  background-color: var(--surface-elevated);
  box-shadow: 0 1px 2px hsla(227, 75%, 14%, 0.04);
}

.top{
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.logo {
    flex-shrink: 0;
    width: 3.75rem;
    height: 3.75rem;
    object-fit: contain;
}

.title {
  min-width: 0;
}

.name {
  margin: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
}

.desc{
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.45;
    color: var(--text-muted);
}

.bottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
}

.remove{
    padding: 0.5rem 1rem;
    border-radius: 624.9375rem;
    border: 1px solid var(--filter-border);
    background-color: transparent;
    color: var(--text-primary);
    font-weight: 500;
    font-size: 0.875rem;
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.remove:hover {
  background-color: var(--red-500);
  border-color: var(--red-500);
  color: #fff;
}

.remove:focus-visible {
  outline: 2px solid var(--red-500);
  outline-offset: 2px;
}

.switch{
    position: relative;
    width: 2.75rem;
    height: 1.5rem;
    cursor: pointer;
    display: inline-block;
    flex-shrink: 0;
}

.switch input{
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
}

.slider{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--neutral-300);
    border-radius: 624.9375rem;
    transition: background-color 0.2s ease;
}

.slider::after {
  content: '';
  position: absolute;
  width: 1.125rem;
  height: 1.125rem;
  left: 0.1875rem;
  bottom: 0.1875rem;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 1px 2px hsla(227, 75%, 14%, 0.12);
}

.switch input:checked + .slider {
  background-color: var(--red-500);
}

.switch input:checked + .slider::after {
  transform: translateX(1.25rem);
}

.switch input:focus-visible + .slider {
  outline: 2px solid var(--red-500);
  outline-offset: 2px;
}
</style>
