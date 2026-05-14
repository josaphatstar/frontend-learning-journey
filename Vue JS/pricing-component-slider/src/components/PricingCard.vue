<template>
	<div class="card-container">
		<div class="top">
			<div class="first">
				<p style="font-size: medium; font-weight: 400;">{{ (pageviews / 1000) + 'k' }} PAGEVIEWS</p>
			<p><span style="font-size: 50px;font-weight: 600;">{{ price }}</span>/<span style="font-weight:400">{{ isYearly ? 'year' : 'month' }}</span></p>
			</div>
			<div class="barre">
				<input type="range" min="1000" max="100000" step="1000" v-model="pageviews" class="slider-input">
			</div>
		</div>
		<div class="middle">
			<span>Monthly Billing</span>
		<label class="switch" :aria-checked="isYearly" role="switch">
			<input type="checkbox" v-model="isYearly" aria-label="Toggle billing period">
			<span class="slider round"></span>
		</label>
			<span>Yearly Billing</span>
			<span class="cover">25% <span class="disount">discount</span></span>
		</div>
		<div class="bottom">
			<div class="left">
				<div class="container">
					<Iconcheck info = "Unlimited websites"/>
					<Iconcheck info = "100% data ownership"/>
					<Iconcheck info = "Email reports"/>
				</div>
			</div>
			<div class="right">
				<button>Start my trial</button>
			</div>
		</div>
	</div>
</template>

<script>
import Iconcheck from "../components/Iconcheck.vue"

export default{
  components:{
    Iconcheck
  },

	data(){
		return{
			isYearly: false,
			pageviews: 100000
		}
	},
	computed: {
		price(){
			const base = (this.pageviews / 100000) * 16;
			const discounted = this.isYearly ? base * 8 : base;
			return '$' + discounted.toFixed(2);
		}
	}
}

</script>

<style scoped>
.card-container{
	background-color: #fff;
	padding: 20px 40px;
	height: 400px;
	width: 600px;
	display: grid;
	grid-template-rows: 45% 20% 35%;
	border-radius: 9px;
	box-shadow: 5px 4px 16px rgba(0,0,0,0.08);
	color: hsl(227, 35%, 25%);
}

.first {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.bottom{
	padding-top: 20px;
	display: flex;
	border-top: 1px solid rgb(218, 207, 207);
}

.right{
	height: 100%;
	width: 50%;
	display: flex;
	justify-content: end;
	align-items: center;
}

.left{
	height: 100%;
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

button{
	background-color: hsl(227, 35%, 25%);
	height: 45px;
	width: 180px;
	color: #fff;
	display: flex;
	border-radius: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.middle{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	margin-left: 90px;
}

.cover{
	background-color:hsl(14, 92%, 95%);
	padding: 3px 8px;
	border-radius: 20px;
	color: hsl(15, 100%, 70%);
}

/* Toggle switch */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
  margin: 0 12px;
  vertical-align: middle;
}
.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .2s;
  border-radius: 26px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .2s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: hsl(227, 35%, 25%);
}
input:focus + .slider {
  box-shadow: 0 0 2px #2196F3;
}
input:checked + .slider:before {
  transform: translateX(24px);
}

.barre {
	padding: 20px 0;
	display: flex;
	justify-content: center;
}

.slider-input {
	width: 100%;
	height: 8px;
	border-radius: 5px;
	background: #ccc;
	outline: none;
	opacity: 0.7;
	transition: opacity .2s;
}

.slider-input:hover {
	opacity: 1;
}

.slider-input::-webkit-slider-thumb {
	appearance: none;
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: hsl(227, 35%, 25%);
	cursor: pointer;
}

.slider-input::-moz-range-thumb {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: hsl(227, 35%, 25%);
	cursor: pointer;
	border: none;
}
</style>
