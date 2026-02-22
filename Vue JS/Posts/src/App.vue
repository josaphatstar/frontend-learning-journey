<template>
	<div class="main-container">
		<Card
		v-for="(Value, index) in 4"
		:key="index"
		:image ="image"
		/>
	</div>
</template>

<script>
import Card from './components/Card.vue';
import imageUrl from './assets/@fdepc4k_346_Messi.jpg'

export default{
	components:{
		Card
	},

	data() {
		return {
			image : imageUrl
		}
	}
}
</script>

<style>

*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body{
	display: flex;
	align-items: center;
	justify-content: center;
}

.main-container{
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}
</style>
