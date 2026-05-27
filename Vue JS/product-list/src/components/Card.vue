<script setup>
const props = defineProps({
	products : {
		type: Object,
		required: true
	}, 
  quantity : {
    type:Number,
    default:0
  }
})

const emit = defineEmits([
  'add-to-cart', 
  'increment', 
  'decrement'
  ])
</script>



<template>
  <div class="product-card">
    <div class="image-container">
      <picture>
        <source :srcset="products.image.desktop" media="(min-width: 1024px)">
        <source :srcset="products.image.tablet" media="(min-width: 768px)">
        <img :src="products.image.mobile" :alt="products.name" class="product-image" :class="{ 'active-border': quantity > 0 }">
      </picture>
      
      <button class="add-to-cart-btn" v-if="quantity === 0" @click="emit('add-to-cart', products)">
        <img src="../assets/icon-add-to-cart.svg" alt="" aria-hidden="true">
        Add to Cart
      </button>
      <div v-else class="quantity-selector">
        <button class="qty-btn decrement-btn" @click="emit('decrement', products)">
          <img src="../assets/icon-decrement-quantity.svg" alt="Decrease quantity">
        </button>
        <span class="qty-number">{{ quantity }}</span>
        <button class="qty-btn increment-btn" @click="emit('increment', products)">
          <img src="../assets/icon-increment-quantity.svg" alt="Increase quantity">
        </button>
      </div>
    </div>

    <div class="product-info">
      <span class="product-category">{{ products.category }}</span>
      <h3 class="product-name">{{ products.name }}</h3>
      <p class="product-price">${{ products.price.toFixed(2) }}</p>
    </div>
  </div>
</template>



<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.image-container {
  position: relative;
  line-height: 0;
}

.product-image {
  width: 100%;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.product-image.active-border {
  border-color: var(--red);
}

.add-to-cart-btn {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: #fff;
  border: 1px solid var(--rose-400);
  border-radius: 999px;
  padding: 12px 28px;
  font-weight: 600;
  color: var(--rose-900);
  white-space: nowrap;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  border-color: var(--red);
  color: var(--red);
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-category {
  color: var(--rose-500);
  font-size: 0.875rem;
}

.product-name {
  color: var(--rose-900);
  font-size: 1rem;
  font-weight: 600;
}

.product-price {
  color: var(--red);
  font-weight: 600;
  font-size: 1rem;
}

.quantity-selector {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--red);
  border-radius: 999px;
  padding: 12px 16px;
  width: 160px; 
  color: #fff;
  font-weight: 600;
}

.qty-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1px solid #fff;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  background-color: #fff;
}

.qty-btn:hover img {
  filter: brightness(0) saturate(100%) invert(27%) sepia(85%) saturate(1983%) hue-rotate(345deg) brightness(89%) contrast(93%);
}


</style>