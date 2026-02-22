<template>
  <div class="container" >
	<img src="../assets/images/certified_img.png" alt="Certifié" class="certified" v-if="isCertified">
    <div class="top">
      <div class="circle">
        <img :src="image" alt="Photo de profil">
      </div>
    </div>
    <div class="middle">
      <h3>{{name}} <span>{{ age }}</span></h3>
      <p>{{ location }}</p>
    </div>
    <div class="bottom">
      <div>
        <strong>{{ followers }}K</strong>
        <p>Followers</p>
      </div>
      <div>
        <strong>{{ likes }}K</strong>
        <p>Likes</p>
      </div>
      <div>
        <strong>{{ photos }}K</strong>
        <p>Photos</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
	name: String,
	age: Number,
	location: String,
	followers: Number,
	likes: Number,
	photos: Number,
	image: String,
	isHighlighted: Boolean,
	comments: Array
  },

  computed:{
	isCertified(){
		return this.followers >= 100 && this.likes > 3 * this.followers;
	}
  }
}
</script>

<style scoped>
.container{
	border-radius: 24px;
	height: 390px;
	width: 380px;
	display: grid;
	grid-template-rows: 1.5fr 1.75fr 1fr;
	border-radius: 24px;
	box-shadow: 1px 1px 10px rgba(107, 106, 106, 0.6);
	cursor: pointer;
	margin: 125px 0;
   transition: all 0.3s ease;

	}

.container:hover{
	box-shadow: 4px 4px 20px rgba(107, 106, 106, 0.6);
	transform: scale(1.02);
}

.top{
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 24px 24px 0 0;
	background-image: url('../assets/images/bg-pattern-card.svg');
	background-size: cover;
	}
	
img{
	border-radius: 50%;
	height: 100%;
	width: 100%;
}

.circle {
	border-radius: 50%;
	height: 110px;
	width: 110px;
	position: relative;
	top: 65px;
	border: 5px solid #fff;
}

.middle{
	background-color: #fff;
}

h3{
	margin-top: 55px;
}

span{
	font-weight: normal;
	color: rgb(102, 101, 101)

}

.middle p{
	position : relative;
	font-size: medium;
	color: rgb(102, 101, 101)

}

.bottom{
	border-radius: 0 0 24px 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	padding: 0 40px;
	border-top: 1px solid rgb(194, 188, 188);
}

.bottom p{
	font-size: small;
	margin-top: 5px;
	color: rgb(102, 101, 101)
}

.certified {
  position: absolute;
  width: 150px;
  height: auto;
}

</style>