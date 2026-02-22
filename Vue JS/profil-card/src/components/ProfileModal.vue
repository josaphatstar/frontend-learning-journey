<template>
	<div class="modal-overlay">
		<div class="modal-content">
			<button class="close-btn" @click="$emit('close')">X</button>
			<img :src="profile.image" alt="Photo de profil" class="modal-image">
			<h2>{{ profile.name }}</h2>
			<p><strong>Age : </strong>{{ profile.age }}</p>
			<p><strong>Location : </strong>{{ profile.location }}</p>
			<p><strong>Followers : </strong>{{ profile.followers }}K</p>
			<p><strong>Likes : </strong>{{ profile.likes }}K</p>
			<p><strong>Photos : </strong>{{ profile.photos }}K</p>

      <div v-if="profile.comments && profile.comments.length" style="text-align:left; margin-top:15px;">
        <strong>Commentaires :</strong>
        <ul>
          <li v-for="(c, i) in profile.comments" :key="i">{{ c }}</li>
        </ul>
      </div>

      <div style="margin-top: 15px;">
        <textarea name="comment" id="comment" v-model="comment" rows="4" style="color: #fff ;width:100%;margin-top:8px;"></textarea>
        <button @click="addComment" style="margin-top:12px; color: #fff; background-color: hsl(185, 75%, 39%);">Ajouter le commentaire</button>
      </div>

		</div>
	</div>
</template>

<script>
export default{
	props: {
		profile: Object
	},

  data(){
    return {
      comment: ''
    }
  },

  methods:{
    addComment() {
      if (this.comment.trim()) {
        // Ajoute le commentaire au tableau du profil
        this.profile.comments.push(this.comment.trim());
        this.comment = '';
      }
    }
  }
}
</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 32px 24px;
  max-width: 400px;
  width: 100%;
  position: relative;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  background: transparent;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #d32f2f;
}
.modal-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
}
</style>