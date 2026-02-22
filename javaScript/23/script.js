document.addEventListener('DOMContentLoaded', function() {
   const circle1 = document.getElementById('circle-1');
   const circle2 = document.getElementById('circle-2');
   const circle3 = document.getElementById('circle-3');
   const circle4 = document.getElementById('circle-4');
   const circle5 = document.getElementById('circle-5');

   const submitButton = document.querySelector('button');
   let selectedRating = 0;

   const ratingCircles = [circle1, circle2, circle3, circle4, circle5];

   function resetCircles() {
      ratingCircles.forEach(c => c.classList.remove('active'));
  }

   ratingCircles.forEach(circle => {
      circle.addEventListener('click', function() {
         resetCircles();
         this.classList.add('active');
         selectedRating = parseInt(this.textContent);
      });         
   });

   submitButton.addEventListener('click', function() {
      window.location.href = `thank.html?rating=${selectedRating}`;
   });
   
});