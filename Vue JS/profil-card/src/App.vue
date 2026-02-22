return<template>
  <div class="container-principal">

    <form @submit.prevent="addProfile" class="form-add-profile">
      <div v-if="errorMessage" style="color :#d32f2f; font-weight: bold; margin-bottom: 10px">
        {{ errorMessage }}
      </div>
      <div class="form-group">
        <label>Nom</label>
        <input type="text" v-model="newProfile.name" placeholder="Nom" required />
      </div>
      <div class="form-group">
        <label>Âge</label>
        <input type="number" min="18" v-model.number="newProfile.age" placeholder="Âge" required />
      </div>
      <div class="form-group">
        <label>Localisation</label>
        <input type="text" v-model="newProfile.location" placeholder="Localisation" required />
      </div>
      <div class="form-group">
        <label>Followers</label>
        <input type="number" min="0" v-model.number="newProfile.followers" placeholder="Followers" required />
      </div>
      <div class="form-group">
        <label>Likes</label>
        <input type="number" min="0" v-model.number="newProfile.likes" placeholder="Likes" required />
      </div>
      <div class="form-group">
        <label>Photos</label>
        <input type="number" min="0" v-model.number="newProfile.photos" step="0.1" placeholder="Photos" required />
      </div>
      <div class="form-group">
        <label>Image URL</label>
        <input type="file" @change ="onImageChange" accept = "image/*" required />
      </div>
      <button type="submit" class="btn-submit">Ajouter un profil</button>
    </form>
    

    <ProfileCard 
      v-for="(profile, index) in profiles" 
      :key="index"
      :name="profile.name"
      :age="profile.age"
      :location="profile.location"
      :followers="profile.followers"
      :likes="profile.likes"
      :photos="profile.photos"
      :image="profile.image"
      @click = "showProfileModal(profile)"
    />

    <ProfileModal
    v-if="selectedProfile"
    :profile="selectedProfile"
    @close="closeProfileModal"
    />
  </div>
</template>

<script>
import ProfileCard from './components/ProfileCard.vue'
import ProfileModal from './components/ProfileModal.vue'

import imageUrl from './assets/images/image-victor.jpg'
import imageUrl2 from './assets/images/image-spider.jpg'
import imageUrl3 from './assets/images/image-rengoku.jpeg'


export default {
  components: {
    ProfileCard,
    ProfileModal
  },

  data() {
    return {
      profiles: [
        {
          name: "Victor",
          age: 27,
          location: "London",
          followers: 80,
          likes: 803,
          photos: 1.4,
          image: imageUrl, comments: [
            "Super profil !",
            "J'adore tes photos.",
            "Continue à partager tes aventures !"
          ]
        },
        {
          name: "Sarah",
          age: 24,
          location: "Paris",
          followers: 120,
          likes: 723,
          photos: 2.1,
          image: imageUrl2,
          comments: [
            "J'adore ton style !",
            "Tes photos sont magnifiques.",
            "Continue à partager tes aventures !"
          ]
        },
        {
          name: "John",
          age: 31,
          location: "New York",
          followers: 90,
          likes: 650,
          photos: 1.8,
          image: imageUrl3,
          comments: [
            "Super profil !",
            "J'adore les photos que tu partages.",
            "Continue comme ça !"
          ]
        }
      ],

      newProfile:{
        name:'',
        age: null,
        location:'',
        followers: null,
        likes: null,
        photos: null,
        image: '',
        comments: []
      },

      errorMessage: '',

      selectedProfile: null,

    }
  },


  methods:{
    addProfile(){
      if (
      !this.newProfile.name ||
      !this.newProfile.age || this.newProfile.age < 18 ||
      !this.newProfile.location ||
      this.newProfile.followers === null || this.newProfile.followers < 0 ||
      this.newProfile.likes === null || this.newProfile.likes < 0 ||
      this.newProfile.photos === null || this.newProfile.photos < 0 ||
      !this.newProfile.image
    ) {
      this.errorMessage = "Merci de remplir correctement tous les champs!";
      return;
    }

      this.profiles.push({ ...this.newProfile   })

      this.newProfile = {
        name: '',
        age: null,
        location: '',
        followers: null,
        likes: null,
        photos: null,
        image: ''
      }
      this.errorMessage = '';

    },

    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Vérifie si le fichier est bien une image
        if (!file.type.startsWith('image/')) {
          this.errorMessage = "Le fichier doit être une image (jpg, png, etc.)";
          this.newProfile.image = '';
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newProfile.image = e.target.result;
          this.errorMessage = ''; // Efface l'erreur si tout est bon
        };
        reader.readAsDataURL(file);
      }
    },

    showProfileModal(profile){
      this.selectedProfile = profile;
    },

    closeProfileModal(){
      this.selectedProfile = null;
    },

  }
}
</script>

<style>

*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	color: black;
}

body{
	background-color: hsl(185, 75%, 39%);
	background-image: url('./assets/images/bg-pattern-top.svg');
}

.container-principal{
border: none;
}


.form-add-profile {
  position: fixed;
  right: 50px;
  top: -10px;
  background: #fff;
  padding: 24px 32px;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
  width: 400px;
  margin: 32px auto 24px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-add-profile input {
  padding: 8px 12px;
  border: 1px solid #b0bec5;
  border-radius: 6px;
  font-size: 1rem;
  transition: border 0.2s;
  color: #333;
}

.form-add-profile input:focus {
  border: 1.5px solid #26a69a;
  outline: none;
}

.btn-submit {
  background: #26a69a;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 0;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-submit:hover {
  background: #00897b;
}
</style>