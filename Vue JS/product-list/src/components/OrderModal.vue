<script setup>
    const props = defineProps({
        cart: {
            type: Array,
            required: true
        },
        total: {
            type: Number,
            required: true
    }
})

const emit = defineEmits(['start-new-order'])

</script>
<template>
  <div class="modal-overlay">
    <div class="order-modal">
      <!-- Icône verte de validation -->
      <img src="../assets/icon-order-confirmed.svg" alt="" class="confirmed-icon">
      
      <h2>Order Confirmed</h2>
      <p class="modal-subtitle">We hope you enjoy your food!</p>
      
      <div class="confirmed-summary-container">
        <!-- Boucle sur les produits du panier -->
        <div class="confirmed-items-list">
          <div v-for="item in cart" :key="item.product.name" class="confirmed-item">
            
            <div class="confirmed-item-left">
              <!-- Image miniature du dessert -->
              <img :src="item.product.image.thumbnail" :alt="item.product.name" class="confirmed-item-thumb">
              
              <div class="confirmed-item-details">
                <span class="confirmed-item-name">{{ item.product.name }}</span>
                <div class="confirmed-item-pricing">
                  <span class="confirmed-item-qty">{{ item.quantity }}x</span>
                  <span class="confirmed-item-price">@ ${{ item.product.price.toFixed(2) }}</span>
                </div>
              </div>
            </div>
            
            <!-- Prix total pour ce dessert spécifique -->
            <span class="confirmed-item-total">${{ (item.product.price * item.quantity).toFixed(2) }}</span>
          
          </div>
        </div>

        <div class="confirmed-total-row">
          <span>Order Total</span>
          <span class="confirmed-total-amount">${{ total.toFixed(2) }}</span>
        </div>
      </div>
      <button class="new-order-btn" @click="emit('start-new-order')">
        Start New Order
      </button>
    </div>
  </div>
</template><style scoped>
/* Fond sombre transparent en arrière-plan */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 24px;
}

/* Boîte de la modale */
.order-modal {
  background-color: #fff;
  border-radius: 12px;
  padding: 40px;
  max-width: 590px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.confirmed-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
}

.order-modal h2 {
  color: var(--rose-900);
  font-size: 2.5rem;
  line-height: 1.2;
}

.modal-subtitle {
  color: var(--rose-500);
  margin-bottom: 16px;
}

/* Conteneur gris du récapitulatif */
.confirmed-summary-container {
  background-color: var(--rose-50);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
}

.confirmed-items-list {
  display: flex;
  flex-direction: column;
  max-height: 240px;
  overflow-y: auto;
}

.confirmed-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--rose-100);
}

.confirmed-item-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.confirmed-item-thumb {
  width: 48px;
  height: 48px;
  border-radius: 4px;
}

.confirmed-item-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.confirmed-item-name {
  font-weight: 600;
  color: var(--rose-900);
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}

.confirmed-item-pricing {
  display: flex;
  gap: 8px;
  font-size: 0.875rem;
}

.confirmed-item-qty {
  color: var(--red);
  font-weight: 600;
}

.confirmed-item-price {
  color: var(--rose-500);
}

.confirmed-item-total {
  font-weight: 600;
  color: var(--rose-900);
}

/* Ligne du total global */
.confirmed-total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
}

.confirmed-total-row span {
  font-size: 0.875rem;
  color: var(--rose-900);
}

.confirmed-total-amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--rose-900);
}

/* Bouton Start New Order */
.new-order-btn {
  width: 100%;
  background-color: var(--red);
  color: #fff;
  border-radius: 999px;
  padding: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  margin-top: 8px;
}

.new-order-btn:hover {
  background-color: hsl(14, 86%, 32%);
}

/* Version mobile */
@media (max-width: 500px) {
  .order-modal {
    padding: 24px;
    align-self: flex-end;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
