<script setup>
import Card from "./components/Card.vue"
import OrderModal from "./components/OrderModal.vue"
import data from "./data.json"

import { ref, computed } from "vue"

const cart = ref([])

const getProductQuantity = (productName) => {
  const item = cart.value.find(item => item.product.name === productName)
    return item ? item.quantity: 0
}

const addToCart = (product) =>{
 const item = cart.value.find(item => item.product.name === product.name)
 if (item) {
    item.quantity++
  } else {
    cart.value.push({product, quantity:1})
  }
}

const decrementQuantity = (product) => {
 const item = cart.value.find(item => item.product.name === product.name)
 if(item){
  item.quantity--
 }  
}

const incrementQuantity = (product) => {
 const item = cart.value.find(item => item.product.name === product.name)
 if (item) {
    item.quantity++
  }
}

const cartCount = computed(() => {
  let totalArticles = 0
  
  // On parcourt chaque élément du panier et on additionne sa quantité
  for (const item of cart.value) {
    totalArticles = totalArticles + item.quantity
  }
  
  return totalArticles
})

const cartTotal = computed(() => {
  let prixTotal = 0
  
  // On parcourt chaque élément et on ajoute (prix * quantité) au total
  for (const item of cart.value) {
    prixTotal = prixTotal + (item.product.price * item.quantity)
  }
  
  return prixTotal
})

const removeFromCart = (productName) => {
  // On filtre le panier pour garder uniquement les produits qui n'ont pas ce nom
  cart.value = cart.value.filter(item => item.product.name !== productName)
}

const isModalOpen = ref(false)

const ConfirmOrder = () => {
  isModalOpen.value = true
}

const resetOrder = () => {
  cart.value = []
  isModalOpen.value= false
}

</script>



<template>
  <main class="main-container">
    <div class="products-section">
      <h1>Desserts</h1>
      <div class="products-grid">

        <Card
          v-for="product in data"
          :key="product.name"
          :products="product"
          :quantity="getProductQuantity(product.name)"

          @add-to-cart="addToCart"
          @decrement="decrementQuantity"
          @increment="incrementQuantity"
        />      

      </div>
    </div>
    <aside class="cart-section">
      <div class="cart-container">
        <h2>Your Cart ({{ cartCount }})</h2>
        
        <div v-if="cart.length === 0" class="cart-empty">
          <img src="./assets/illustration-empty-cart.svg" alt="" aria-hidden="true">
          <p>Your added items will appear here</p>
        </div>
        
        <div v-else class="cart-active">
          <div class="cart-items-list">
            <div v-for="item in cart" :key="item.product.name" class="cart-item">
              <div class="item-info">
                <p class="item-name">{{ item.product.name }}</p>
                <div class="item-pricing">
                  <span class="item-quantity">{{ item.quantity }}x</span>
                  <span class="item-unit-price">@ ${{ item.product.price.toFixed(2) }}</span>
                  <span class="item-total-price">${{ (item.product.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
              <button class="remove-item-btn" @click="removeFromCart(item.product.name)">
                <img src="./assets/icon-remove-item.svg" alt="Remove item">
              </button>
            </div>
          </div>
          
          <div class="cart-total-row">
            <span>Order Total</span>
            <span class="cart-total-amount">${{ cartTotal.toFixed(2) }}</span>
          </div>
          
          <div class="carbon-delivery-info">
            <img src="./assets/icon-carbon-neutral.svg" alt="" aria-hidden="true">
            <p>This is a <strong>carbon-neutral</strong> delivery</p>
          </div>
          
          <button class="confirm-order-btn" @click="ConfirmOrder">
            Confirm Order
          </button>
        </div>
      </div>
    </aside>
  </main>

  <OrderModal 
    v-if="isModalOpen" 
    :cart="cart" 
    :total="cartTotal" 
    @start-new-order="resetOrder"
  />

</template>

<style scoped>
.main-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 80px;
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  align-items: start;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.cart-container {
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
}

.cart-container h2 {
  color: var(--red);
  margin-bottom: 24px;
}

.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
}

.cart-empty p {
  color: var(--rose-500);
  font-weight: 600;
  font-size: 0.875rem;
}

/* Active Cart Styles */
.cart-items-list {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--rose-100);
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item-name {
  font-weight: 600;
  color: var(--rose-900);
  font-size: 0.875rem;
}

.item-pricing {
  display: flex;
  gap: 8px;
  font-size: 0.875rem;
}

.item-quantity {
  color: var(--red);
  font-weight: 600;
  margin-right: 4px;
}

.item-unit-price {
  color: var(--rose-400);
}

.item-total-price {
  color: var(--rose-500);
  font-weight: 600;
}

.remove-item-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  border: 1px solid var(--rose-300);
  border-radius: 50%;
  padding: 4px;
  transition: all 0.3s ease;
}

.remove-item-btn:hover {
  border-color: var(--rose-900);
}

.remove-item-btn:hover img {
  filter: brightness(0) saturate(100%) invert(0%);
}

.cart-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 24px;
}

.cart-total-row span {
  font-size: 0.875rem;
  color: var(--rose-900);
}

.cart-total-amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--rose-900);
}

.carbon-delivery-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background-color: var(--rose-50);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 0.875rem;
}

.carbon-delivery-info p {
  color: var(--rose-900);
}

.confirm-order-btn {
  width: 100%;
  background-color: var(--red);
  color: #fff;
  border-radius: 999px;
  padding: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.confirm-order-btn:hover {
  background-color: hsl(14, 86%, 32%);
}

/* Responsive */
@media (max-width: 1200px) {
  .main-container {
    padding: 40px;
    grid-template-columns: 1fr 320px;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .main-container {
    grid-template-columns: 1fr;
    padding: 24px;
  }
  
  .cart-section {
    margin-top: 24px;
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .main-container {
    padding: 24px 16px;
  }
}
</style>