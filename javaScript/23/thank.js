document.addEventListener('DOMContentLoaded', function() {
   const ratingSpan = document.getElementById('selected-rating');
   const urlParams = new URLSearchParams(window.location.search);
   const rating = urlParams.get('rating');

   if (ratingSpan && rating) {
      ratingSpan.textContent = rating;
   }
});