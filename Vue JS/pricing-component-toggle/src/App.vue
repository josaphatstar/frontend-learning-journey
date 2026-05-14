<script setup>
import { ref, computed } from 'vue'

const isAnnual = ref(true)

const basicPrice = computed(() => {
	return isAnnual.value ? 199.99 : 19.99
})

const professionalPrice = computed(() => {
	return isAnnual.value ? 249.99 : 24.99
})

const masterPrice = computed(() => {
	return isAnnual.value ? 399.99 : 39.99
})

</script>

<template>
	<main>
		<!-- Background decorations -->
		<img class="bg-top" src="./assets/bg-top.svg" alt="" />
		<img class="bg-bottom" src="./assets/bg-bottom.svg" alt="" />

		<!-- Header -->
		<h1>Our Pricing</h1>

		<!-- Toggle -->
		<div class="toggle-wrapper">
			<span class="toggle-label">Annually</span>
			<div class="toggle-btn" @click="isAnnual = !isAnnual">
				<div class="toggle-circle" :style="{transform: isAnnual? 'translateX(0)' : 'translateX(24px)'}"></div>
			</div>
			<span class="toggle-label">Monthly</span>
		</div>

		<!-- Pricing Cards -->
		<div class="cards-container">
			<!-- Basic Card -->
			<div class="card">
				<p class="card-title">Basic</p>
				<p class="card-price">
					<span class="dollar">$</span><span class="amount">{{basicPrice}}</span>
				</p>
				<hr />
				<p class="card-feature">500 GB Storage</p>
				<hr />
				<p class="card-feature">2 Users Allowed</p>
				<hr />
				<p class="card-feature">Send up to 3 GB</p>
				<hr />
				<button class="card-btn">LEARN MORE</button>
			</div>

			<!-- Professional Card (featured) -->
			<div class="card card-featured">
				<p class="card-title">Professional</p>
				<p class="card-price">
					<span class="dollar">$</span><span class="amount">{{professionalPrice}}</span>
				</p>
				<hr />
				<p class="card-feature">1 TB Storage</p>
				<hr />
				<p class="card-feature">5 Users Allowed</p>
				<hr />
				<p class="card-feature">Send up to 10 GB</p>
				<hr />
				<button class="card-btn">LEARN MORE</button>
			</div>

			<!-- Master Card -->
			<div class="card">
				<p class="card-title">Master</p>
				<p class="card-price">
					<span class="dollar">$</span><span class="amount">{{masterPrice}}</span>
				</p>
				<hr />
				<p class="card-feature">2 TB Storage</p>
				<hr />
				<p class="card-feature">10 Users Allowed</p>
				<hr />
				<p class="card-feature">Send up to 20 GB</p>
				<hr />
				<button class="card-btn">LEARN MORE</button>
			</div>
		</div>
	</main>
</template>

<style scoped>
/* ===== LAYOUT PRINCIPAL ===== */
main {
	width: 100%;
	min-height: 100vh;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	gap: 30px;
	padding: 50px 20px;
	background-color: hsl(240, 78%, 98%);
	color: hsl(232, 13%, 33%);
	position: relative;
	overflow: hidden;
}

/* ===== BACKGROUND DECORATIONS ===== */
.bg-top {
	position: absolute;
	top: -40px;
	right: -100px;
	z-index: 0;
	pointer-events: none;
}

.bg-bottom {
	position: absolute;
	bottom: -50px;
	left: -100px;
	z-index: 0;
	pointer-events: none;
}

/* ===== TITRE ===== */
h1 {
	font-size: 2rem;
	color: hsl(233, 13%, 49%);
	z-index: 1;
}

/* ===== TOGGLE ===== */
.toggle-wrapper {
	display: flex;
	align-items: center;
	gap: 20px;
	z-index: 1;
}

.toggle-label {
	font-size: 0.9rem;
	color: hsl(233, 13%, 49%);
	letter-spacing: 0.5px;
}

.toggle-btn {
	width: 56px;
	height: 32px;
	border-radius: 16px;
	background: linear-gradient(135deg, hsl(237, 73%, 79%), hsl(238, 63%, 64%));
	display: flex;
	align-items: center;
	padding: 4px;
	cursor: pointer;
	transition: background 0.3s ease;
}

.toggle-btn:hover {
	opacity: 0.7;
}

.toggle-circle {
	width: 24px;
	height: 24px;
	border-radius: 50%;
	background-color: #fff;
	transition: transform 0.3s ease;
	/* Par défaut le cercle est à gauche (Annually) */
}

/* ===== CARDS CONTAINER ===== */
.cards-container {
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 1;
	max-width: 1050px;
	width: 100%;
}

/* ===== CARD DE BASE ===== */
.card {
	background-color: #fff;
	padding: 30px;
	text-align: center;
	width: 350px;
	box-shadow: 0 10px 40px hsla(237, 63%, 64%, 0.12);
}

/* Coins arrondis : gauche pour la 1ère, droite pour la dernière */
.card:first-child {
	border-radius: 10px 0 0 10px;
}

.card:last-child {
	border-radius: 0 10px 10px 0;
}

/* ===== CARD FEATURED (Professional) ===== */
.card-featured {
	background: linear-gradient(135deg, hsl(237, 73%, 79%), hsl(238, 63%, 64%));
	color: #fff;
	padding: 45px 30px;
	border-radius: 10px;
	z-index: 2;
	box-shadow: 0 15px 50px hsla(237, 63%, 64%, 0.25);
}

/* ===== CARD TITLE ===== */
.card-title {
	font-size: 1.1rem;
	letter-spacing: 1px;
	margin-bottom: 20px;
}

/* ===== CARD PRICE ===== */
.card-price {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4px;
	margin-bottom: 20px;
}

.dollar {
	font-size: 2.2rem;
	line-height: 1;
}

.amount {
	font-size: 4rem;
	line-height: 1;
	letter-spacing: -1px;
}

/* ===== HR ===== */
hr {
	border: none;
	border-top: 1px solid hsla(233, 13%, 49%, 0.2);
}

.card-featured hr {
	border-top-color: hsla(0, 0%, 100%, 0.25);
}

/* ===== FEATURES ===== */
.card-feature {
	padding: 14px 0;
	font-size: 0.9rem;
	letter-spacing: 0.3px;
	color: hsl(233, 13%, 49%);
}

.card-featured .card-feature {
	color: hsla(0, 0%, 100%, 0.9);
}

/* ===== BOUTONS ===== */
.card-btn {
	width: 100%;
	padding: 14px;
	margin-top: 20px;
	border: none;
	border-radius: 6px;
	font-family: 'Montserrat', sans-serif;
	font-weight: 700;
	font-size: 0.8rem;
	letter-spacing: 2px;
	cursor: pointer;
	transition: all 0.3s ease;
	/* Bouton gradient par défaut (cards Basic & Master) */
	background: linear-gradient(135deg, hsl(237, 73%, 79%), hsl(238, 63%, 64%));
	color: #fff;
}

.card-btn:hover {
	background: transparent;
	outline: 1px solid hsl(237, 63%, 64%);
	color: hsl(237, 63%, 64%);
}

/* Bouton de la card featured : blanc */
.card-featured .card-btn {
	background: #fff;
	color: hsl(237, 63%, 64%);
}

.card-featured .card-btn:hover {
	background: transparent;
	outline: 1px solid #fff;
	color: #fff;
}

/* ===== RESPONSIVE MOBILE ===== */
@media (max-width: 880px) {
	.cards-container {
		flex-direction: column;
		padding: 0 20px;
	}

	.card {
		width: 100%;
		max-width: 340px;
		border-radius: 10px !important;
		margin-bottom: 0;
	}

	.card:first-child {
		border-radius: 10px 10px 0 0 !important;
	}

	.card-featured {
		border-radius: 0 !important;
	}

	.card:last-child {
		border-radius: 0 0 10px 10px !important;
	}

	.bg-top {
		right: -200px;
		top: -100px;
	}
}
</style>
