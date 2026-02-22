<template>
		<div class="card">
			<div class="top">
				<img :src="image" alt="image du post">
			</div>
			<div class="bottom">
				<div class="post-content">
					<h3>Title : Lorem ipsum dolor sit amet.</h3>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit.
						Quibusdam voluptatum quod animi. Veritatis ex dicta ut earum 
						quia impedit quasi magni praesentium aspernatur. Temporibus 
						magnam corrupti asperiores dolores sunt quos.
					</p>
				</div>
				<div class="post-like">
					<button @click="increment">Like</button>
					<p><span>{{ like }} </span> Like{{ like > 1 ? "s" : "" }}</p>
				</div>
				<div class="post-comment">
					<form action="#" @submit.prevent="addComment">
						<input type="text" placeholder="Ajouter un commentaire" v-model="comment_content">
					</form>
					<p v-for="(comment, index) in liste_comments"
					:key = index
					>{{ comment }}</p>
				</div>
			</div>
		</div>
</template>

<script>
	export default{
		data(){
			return {
				like : 0,
				comment_content : '',
				liste_comments : []
			}
		},
		
		methods: {
			increment(){
				this.like ++;
			},
			addComment(){
				this.liste_comments.push(this.comment_content)
				this.comment_content = ''
			}
		},

		props: {
			image : String
		}

	}
</script>

<style scoped>
*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

.card{
	height: 85vh;
	width: 360px;
	box-shadow: 1px 1px 10px rgba(107, 106, 106, 0.6);
	display: grid;
	grid-template-rows: 40% 60%;
   transition: all 0.3s ease;
	margin: 10px;
}

.card:hover{
	transform: scale(1.01);
}

img{
	height: 100%;
	width: 100%;
}

.bottom{
	display: grid;
	grid-template-rows: 40% 30% 30%;
	padding: 10px 20px;
}


h3{
	margin: 10px 0;
}

.post-like{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30px;	
}

.post-comment {
	display: flex;
	justify-content: start;
	align-items: center;
	flex-direction: column;
	margin: 5px 0 5px 0
}

.post-comment input {
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 0.5rem;

}

button{
	height: 40px;
	width: 100px;
	color: #fff;
	background-color: red;
	border-radius: 3px;
	border: none;
}

button:hover{
	cursor:pointer;
}

</style>