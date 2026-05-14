<script setup>
import { ref } from 'vue';
const emit = defineEmits(['formSubmitted']);
const emailError = ref(false);
const uploadError = ref(false);
const nameError = ref(false);
const githubError = ref(false);
const avatarEmptyError = ref(false);
const avatarUrl = ref(null);

const fileInput = ref(null);

const removeImage = () => {
  avatarUrl.value = null;
  uploadError.value = false;

  if (fileInput.value){
    fileInput.value.value = null;
  }
}

const fullName = ref('');
const email = ref('');
const githubUsername = ref('');

const validateForm = () => {
  emailError.value = false;
  uploadError.value = false;
  nameError.value = false;
  githubError.value = false;
  avatarEmptyError.value = false;

  let isvalid = true;

  if (!avatarUrl.value) {
    avatarEmptyError.value = true;
    isvalid = false;
  }

  if (fullName.value.trim() === '') {
    nameError.value = true;
    isvalid = false;
  }

  if (githubUsername.value.trim() === '') {
    githubError.value = true;
    isvalid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value) || email.value.trim() === '') {
    emailError.value = true;
    isvalid = false;
  }

  if (isvalid) {
    emit('formSubmitted', {
      fullName: fullName.value,
      email: email.value,
      githubUsername: githubUsername.value,
      avatarUrl: avatarUrl.value
    })
  }
}

const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  if (file.size > 500000) {
    uploadError.value = true;
    return;
  }

  if (file) {
    avatarUrl.value = URL.createObjectURL(file);
    uploadError.value = false;
  }
  
}

</script>

<template>
    <form class="ticket-form" @submit.prevent="validateForm" novalidate>
      <div class="form-group">
        <label>Upload Avatar</label>
        <div class="upload-area" v-if="avatarUrl">
          <img :src="avatarUrl" alt="Avatar uploadé" class="avatar-preview">
          <div class="action-buttons">
            <button type="button" class="action-btn" @click="removeImage">Remove image</button>
            <button type="button" class="action-btn" @click="fileInput.click()">Change image</button>
          </div>
        </div>

        <label class="upload-area" for="avatar" v-else>
          <div class="placeholder">
            <img src="../assets/icon-upload.svg" alt="Upload Icon">
            <span>Drag and drop or click to upload</span>
          </div>
        </label>

        <input type="file" id="avatar" ref="fileInput" accept=".jpg, .png" @change="handleFileChange">
        <small v-if="!uploadError && !avatarEmptyError"><img src="../assets/icon-info.svg" alt=""> Upload your photo (JPG or PNG, max size : 500KB).</small>
        <small class="error-msg" v-else-if="uploadError"><img src="../assets/icon-info.svg" alt=""> File too large. Please upload an image under 500KB.</small>
        <small class="error-msg" v-else-if="avatarEmptyError"><img src="../assets/icon-info.svg" alt=""> Please upload an avatar image.</small>
      </div>
      <div class="form-group">
        <label for="fullname">Full Name</label>
        <input type="text" id="fullname" placeholder="e.g. John Doe" v-model="fullName">
        <span class="error-msg" v-if="nameError"> 
            <img src="../assets/icon-info.svg" alt="">
            <small> Please enter your full name.</small>
        </span>
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" placeholder="example@email.com" v-model="email" />
        <span class="error-msg" v-if="emailError"> 
            <img src="../assets/icon-info.svg" alt="">
            <small> Please enter a valid email address.</small>
        </span>
      </div>

      <div class="form-group">
        <label for="github">GitHub Username</label>
        <input type="text" id="github" placeholder="@yourusername" v-model="githubUsername"/>
        <span class="error-msg" v-if="githubError"> 
            <img src="../assets/icon-info.svg" alt="">
            <small> Please enter your GitHub username.</small>
        </span>
      </div>

      <button type="submit" class="submit-btn">Generate My Ticket</button>
    </form>
</template>

<style lang="scss" scoped>
/* Toutes les couleurs officielles du style-guide.md */
$color-neutral-0: hsl(0, 0%, 100%);
$color-neutral-300: hsl(252, 6%, 83%);
$color-neutral-500: hsl(245, 15%, 58%);
$color-neutral-700: hsl(245, 19%, 35%);
$color-orange-500: hsl(7, 88%, 67%);

.ticket-form {
  width: min(100%, 460px);
  margin: 0 auto;
  text-align: left;

  .form-group {
    margin-bottom: 14px;

    .error-msg {
        color: $color-orange-500;
        small{
            color: $color-orange-500;
        }
        img{
            filter: invert(53%) sepia(52%) saturate(4529%) hue-rotate(339deg) brightness(101%) contrast(98%);
            padding-right: 5px;
        }
    }

    label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: $color-neutral-0;
      font-size: 0.95rem;
    }

    input[type="text"], input[type="email"] {
      width: 100%;
      padding: 12px 13px;
      border-radius: 8px;
      border: 1px solid $color-neutral-500;
      background: hsla(245, 19%, 35%, 0.35);
      color: $color-neutral-0;
      font-family: 'Inconsolata', sans-serif;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      box-sizing: border-box;

      &::placeholder {
        color: $color-neutral-500;
      }

      &:focus {
        border-color: $color-orange-500;
        box-shadow: 0 0 0 3px hsla(7, 88%, 67%, 0.16);
      }
    }

  }

  #avatar {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .upload-area {
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px dashed $color-neutral-500;
    padding: 18px;
    border-radius: 8px;
    background: hsla(245, 19%, 35%, 0.2);
    cursor: pointer;
    transition: background-color 0.3s ease;

    .avatar-preview {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      object-fit: cover; /* Ne déforme pas l'image ! */
    }

    .action-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-top: 12px;

      .action-btn {
        flex: 1 1 140px;
        min-width: 0;
        background: hsla(245, 19%, 35%, 0.3);
        border: none;
        color: $color-neutral-300;
        padding: 5px 10px;
        border-radius: 6px;
        font-family: inherit;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          color: $color-neutral-0;
        }
      }
    }

    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }


    #avatar{
      display: none;
    }

    &:hover {
      background: hsla(245, 19%, 35%, 0.3);
    }

    img {
      margin-bottom: 5px;
      padding: 5px;
      background: hsla(245, 19%, 35%, 0.3);
      border-radius: 6px;
      width: 30px;
    }

    span {
      font-size: 0.85rem;
      color: $color-neutral-300;
    }
  }

  small {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: $color-neutral-500;
    margin-top: 6px;
    font-size: 0.82rem;
  }

  .submit-btn {
    width: 100%;
    padding: 13px;
    margin-top: 8px;
    background-color: $color-orange-500;
    color: hsl(248, 70%, 10%);
    font-weight: 800;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.04rem;
    font-family: 'Inconsolata', sans-serif;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
}

@media (max-width: 820px) {
  .ticket-form {
    width: min(100%, 420px);

    .form-group {
      margin-bottom: 12px;
    }

    .upload-area {
      padding: 16px;
    }
  }
}

@media (max-width: 480px) {
  .ticket-form {
    width: 100%;

    .form-group {
      margin-bottom: 10px;
    }

    .form-group label {
      font-size: 0.9rem;
      margin-bottom: 5px;
    }

    .form-group input[type="text"],
    .form-group input[type="email"] {
      font-size: 0.95rem;
      padding: 11px 12px;
    }

    .upload-area {
      padding: 14px;

      span {
        font-size: 0.8rem;
      }

      .action-buttons {
        gap: 8px;
      }
    }

    small {
      font-size: 0.74rem;
    }

    .submit-btn {
      font-size: 0.96rem;
      padding: 12px;
    }
  }
}
</style>