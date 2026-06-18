<script setup>
defineProps({
	Days: Number,
	Hour: Number,
	Minutes: Number,
	Secondes: Number
})
</script>


<template>
	<div class="card">
		<div>{{ Days }}</div>
		<div>{{ Hour }}</div>
		<div>{{ Minutes }}</div>
		<div>{{ Secondes }}</div>
	</div>
</template>

<style scoped>
.card {
	height: 10px;
	border: solid;
	display: flex;
	gap: 10px;
}

div{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border: solid;
}
</style>