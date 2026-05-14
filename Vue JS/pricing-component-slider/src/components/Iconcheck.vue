<template>
	<div class="check">
		<img class="icon" src="../assets/images/icon-check.svg" alt="image de cochage">
		<div>{{ info }}</div>
	</div>
</template>

<script>
export default{
	props : {
		info : String
	}
}

</script>

<style>
.icon{
	height: 15px;
	width: auto;
	margin-right: 15px;
}

.check{
	display: flex;
	align-items: center;
	margin-top: 10px;
}
</style>