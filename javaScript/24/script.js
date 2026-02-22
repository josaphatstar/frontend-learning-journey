document.addEventListener('DOMContentLoaded', function() {
   const form = document.querySelector('form');
   const inputs = {
      name : document.getElementById('cardholder-name'),
      number : document.getElementById('card-number'),
      month : document.getElementById('month'),
      year : document.getElementById('year'),
      cvc : document.getElementById('cvc')
   };

   function validateName(name){
      return name.trim().length > 0 && /^[a-zA-Z\s]+$/.test(name);
   }

   function validateCardNumber(number) {
      return /^[0-9]{16}$/.test(number.replace(/\s/g, ''));
  }

  function validateMonth(month) {
   const monthNum = parseInt(month);
   return monthNum >= 1 && monthNum <= 12;
   }

   function validateYear(year) {
      if (!/^\d{4}$/.test(year)) {
          return false;
      }
      const currentYear = new Date().getFullYear();
      const yearNum = parseInt(year);
      return yearNum >= currentYear && yearNum <= currentYear + 10;
  }
  

   function validateCVC(cvc) {
      const cleanCVC = cvc.replace(/\D/g, '');
      return /^[0-9]{3}$/.test(cleanCVC);
  }

   function showError(element, message) {
      element.style.borderColor = 'red';
      const errorSpan = document.getElementById(`${element.id}-error`);
      if (errorSpan) {
          errorSpan.textContent = message;
          errorSpan.style.display = 'block';
      }
  }

   function resetError(element) {
      element.style.borderColor = '';
      const errorSpan = document.getElementById(`${element.id}-error`);
      if (errorSpan) {
         errorSpan.style.display = 'none';
         }
   }

   function showDateError(message) {
      inputs.month.style.borderColor = 'red';
      inputs.year.style.borderColor = 'red';
      const dateError = document.getElementById('date-error');
      if (dateError) {
          dateError.textContent = message;
          dateError.style.display = 'block';
      }
  }
  
  function resetDateErrors() {
      inputs.month.style.borderColor = '';
      inputs.year.style.borderColor = '';
      const dateError = document.getElementById('date-error');
      if (dateError) {
          dateError.style.display = 'none';
      }
  }

   form.addEventListener('submit', function(event) {
      event.preventDefault();
      let isValid = true;

      if (!validateName(inputs.name.value)) {
         showError(inputs.name,'Wrong format, numbers only');
         isValid = false;
      } else {
         resetError(inputs.name);
      }
      
      if (!validateCardNumber(inputs.number.value)) {
         showError(inputs.number, 'Wrong format, (16) numbers only');
         isValid = false;
     } else {
         resetError(inputs.number);
     }

      const monthValue = inputs.month.value;
      const yearValue = inputs.year.value;

      // Date validation
      if (!monthValue || !yearValue) {
         showDateError("Month and year can't be blank");
         isValid = false;
      } else if (!validateMonth(monthValue)) {
         showDateError('Month must be between 1-12');
         isValid = false;
      } else if (!/^\d{4}$/.test(yearValue)) {
         showDateError('Year must be 4 digits');
         isValid = false;
      } 
      else if (!validateYear(yearValue)) {
         showDateError('Year must be in the future');
         isValid = false;
      }

      if (!validateYear(inputs.year.value)) {
         showError(inputs.year, 'Invalid year');
         isValid = false;
      } else {
         resetError(inputs.year);
      }

      if (!validateCVC(inputs.cvc.value)) {
         showError(inputs.cvc, 'Invalid CVC');
         isValid = false;
      } else {
         resetError(inputs.cvc);
      }

      if (isValid) {
         alert('Form is valid');
         window.location.href = 'thank.html'
      }
   });

})