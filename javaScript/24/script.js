document.addEventListener('DOMContentLoaded', function () {
   // Input Fields
   const nameInput = document.getElementById('cardholder-name');
   const numberInput = document.getElementById('card-number');
   const monthInput = document.getElementById('month');
   const yearInput = document.getElementById('year');
   const cvcInput = document.getElementById('cvc');

   // Display Fields
   const nameDisplay = document.getElementById('card-name-display');
   const numberDisplay = document.getElementById('card-number-display');
   const dateDisplay = document.getElementById('card-date-display');
   const cvcDisplay = document.getElementById('card-cvc-display');

   // Error Spans
   const nameError = document.getElementById('name-error');
   const numberError = document.getElementById('card-number-error');
   const dateError = document.getElementById('date-error');
   const cvcError = document.getElementById('cvc-error');

   const form = document.querySelector('form');

   // Helper: Update Card Number Display
   function updateCardNumber(value) {
      // Remove spaces and keep only first 16 digits
      const cleanValue = value.replace(/\s/g, '').substring(0, 16);

      // Pad with zeros if less than 16
      const paddedValue = cleanValue.padEnd(16, '0');

      // Split into groups of 4
      const groups = paddedValue.match(/.{1,4}/g);

      // Update the display
      numberDisplay.innerHTML = '';
      groups.forEach(group => {
         const div = document.createElement('div');
         div.className = 'zeros-group';
         div.textContent = group;
         numberDisplay.appendChild(div);
      });
   }

   // Helper: Update Date Display
   function updateDate() {
      const mm = monthInput.value.padStart(2, '0').substring(0, 2);
      const yy = yearInput.value.padStart(2, '0').substring(0, 2);
      dateDisplay.textContent = `${mm || '00'}/${yy || '00'}`;
   }

   // Real-time Formatting (filtered input, but no card update yet)
   numberInput.addEventListener('input', (e) => {
      // Format input with spaces (UX helper)
      let value = e.target.value.replace(/\D/g, ''); // Numbers only
      let formattedValue = '';
      for (let i = 0; i < value.length && i < 16; i++) {
         if (i > 0 && i % 4 === 0) formattedValue += ' ';
         formattedValue += value[i];
      }
      e.target.value = formattedValue;
   });

   monthInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 2);
   });

   yearInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 2);
   });

   cvcInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
   });

   // Update Card Visuals on Blur (After typing is finished)
   nameInput.addEventListener('blur', (e) => {
      nameDisplay.textContent = e.target.value || 'Jane Appleseed';
   });

   numberInput.addEventListener('blur', (e) => {
      updateCardNumber(e.target.value);
   });

   monthInput.addEventListener('blur', () => {
      updateDate();
   });

   yearInput.addEventListener('blur', () => {
      updateDate();
   });

   cvcInput.addEventListener('blur', (e) => {
      cvcDisplay.textContent = e.target.value || '000';
   });

   // Validation
   function validate() {
      let isValid = true;

      // Reset errors
      [nameInput, numberInput, monthInput, yearInput, cvcInput].forEach(el => el.classList.remove('error'));
      [nameError, numberError, dateError, cvcError].forEach(el => {
         if (el) el.textContent = '';
      });

      // Name
      if (!nameInput.value.trim()) {
         nameError.textContent = "Can't be blank";
         isValid = false;
      }

      // Number
      const cleanNumber = numberInput.value.replace(/\s/g, '');
      if (!cleanNumber) {
         numberError.textContent = "Can't be blank";
         isValid = false;
      } else if (cleanNumber.length < 16) {
         numberError.textContent = "Wrong format, 16 digits required";
         isValid = false;
      }

      // Date
      if (!monthInput.value || !yearInput.value) {
         dateError.textContent = "Can't be blank";
         isValid = false;
      } else {
         const m = parseInt(monthInput.value);
         if (m < 1 || m > 12) {
            dateError.textContent = "Invalid month";
            isValid = false;
         }
      }

      // CVC
      if (!cvcInput.value) {
         cvcError.textContent = "Can't be blank";
         isValid = false;
      } else if (cvcInput.value.length < 3) {
         cvcError.textContent = "Must be 3 digits";
         isValid = false;
      }

      return isValid;
   }

   form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validate()) {
         // Success! 
         // In a real app we might show the thank you state directly 
         // but for this project we'll redirect to Thank.html
         window.location.href = 'Thank.html';
      }
   });
});