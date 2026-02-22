document.addEventListener('DOMContentLoaded', function() {  
   const form = document.querySelector('form');
   const emailInput = document.getElementById('email')
   const errorMessage = document.getElementById('error-message')

   function validateEmail(email){
      const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regEx.test(email);
   }

   form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const emailValue = emailInput.value.trim()

      if(!validateEmail(emailValue)){
         emailInput.style.borderColor = 'red';
         emailInput.style.backgroundColor = '#ffe8e6';
         errorMessage.style.display = 'block';
         errorMessage.textContent = 'valid email required';
      } else{
         window.location.href = "success.html";
      }
   });

});

