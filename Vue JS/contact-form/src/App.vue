<script setup>
  import { ref } from 'vue';
  const FirstName = ref('');
  const LastName = ref('');
  const Email = ref('');
  const QueryType = ref('');
  const Message = ref('');
  const Subscribe = ref(false);

  const errors = ref({
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    subscribe: ''
  });

  const handleSubmit = () => {
    errors.value = {
      firstName: '',
      lastName: '',
      email: '',
      queryType: '',
      message: '',
      subscribe: ''
    };

    if (!FirstName.value.trim()) errors.value.firstName = 'This field is required';
    if (!LastName.value.trim()) errors.value.lastName = 'This field is required';
    if (!Email.value.trim()) errors.value.email = 'Please enter a valid email';
    if (!QueryType.value) errors.value.queryType = 'Please select a query type';
    if (!Message.value.trim()) errors.value.message = 'This field is required';
    if (!Subscribe.value) errors.value.subscribe = 'To submit, please consent to be contacted';

    console.log('First Name:', FirstName.value);
    console.log('Last Name:', LastName.value);
    console.log('Email:', Email.value);
    console.log('Query Type:', QueryType.value);
    console.log('Message:', Message.value);
    console.log('Subscribe:', Subscribe.value);
  };



</script>

<template>
  <main>
    <div class="app-container">
      <form action="#"  @submit.prevent="handleSubmit">
        <h1>Contact Us</h1>

        <div class="form-group-1">
          <div>
            <label for="name">First Name *</label> <br>
            <input type="text" id="name" name="name" v-model="FirstName">
            <span class="error-message" v-if="errors.firstName">{{ errors.firstName }}</span>
          </div>
          <div>
            <label for="last name">Last Name *</label><br>
            <input type="text" id="last name" name="last name" v-model="LastName">
            <span class="error-message" v-if="errors.lastName">{{ errors.lastName }}</span>
          </div>
        </div>
        
        <div class="form-group-2">
          <div>
            <label for="email">Email Adress *</label><br>
            <input type="email" id="email" name="email" v-model="Email">
            <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
          </div>
        </div>

        <div class="form-group-3">
            <label class="field-label">Query Type *</label><br>
            <div class="radio-group">
              <label class="radio-card">
                <input type="radio" name="query-type" value="general-enquiry" v-model="QueryType">
                <span>General Enquiry</span>
              </label>

              <label class="radio-card"><br>
                <input type="radio" name="query-type" value="support-request" v-model="QueryType">
                <span>Support Request</span>
              </label>
            </div>
            <span class="error-message" v-if="errors.queryType">{{ errors.queryType }}</span>
        </div>

        <div class="form-group-4">
          <div>
            <label for="message">Message *</label><br>
            <textarea id="message" name="message" v-model="Message"></textarea>
            <span class="error-message" v-if="errors.message">{{ errors.message }}</span>
          </div>
        </div>

        <div class="form-group-5">
          <div>
            <input type="checkbox" id="subscribe" name="subscribe" v-model="Subscribe">
            <label for="subscribe"> I consent to be contacted by the team *</label> <br>
            <span class="error-message" v-if="errors.subscribe">{{ errors.subscribe }}</span>
          </div>
        </div>

        <button type="submit">Submit</button>

      </form>
    </div>
  </main> 
</template>

<style scoped lang="scss">

main{
  height: 100vh;
  width: 100vw;
}

.app-container{
  background-color: hsl(148, 38%, 91%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

form{
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;

  input[type="email"], [type="text"]{
    width: 210px;
    margin: 5px 0 20px 0;
    height: 32px;
    border-radius: 5px;
    border: solid 1px;
  }

textarea{
  width: calc(100% - 8px);
  height: 80px;
  border-radius: 5px;
  border: solid 1px;
  margin: 5px 0;
}

button{
  width: 100%;
  height: 35px;
  background-color: hsl(148, 38%, 91%);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: hsl(169, 82%, 27%);
  color: #fff;
  font-weight: bold
}

  .radio-group{
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0 20px 0;

    .radio-card{
      display: flex;
      align-items: center;
      gap: 20px;
      width: 210px;
      height: 32px;
      border-radius: 5px;
      border: solid 1px;

      input[type="radio"]{
        width: 20px;
        height: 20px;
      }
    }
  }

.form-group-5{
  margin: 20px 0;
}

.form-group-1{
  display: flex ;
  gap: 25px;
}

.form-group-2{
  input {
    width: calc(100% - 8px)
  }
}

.error-message{
color: red;
font-size: 12px;
}

.form-group-1, .form-group-2, .form-group-3 {
  .error-message{
    display: block;
    position: relative;
    top: -15px;
  }
}

}
</style>