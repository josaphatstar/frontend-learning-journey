document.addEventListener('DOMContentLoaded', async () => {
   fetch('data.json')
   .then(response => {
      if(!response.ok){
         throw new Error('Error: Failed to fetch data');
      }
      return response.json();
   })

   .then(data => {
      data.forEach(item => {

         const pointsSpan = document.getElementById(`points-${item.category.toLowerCase()}`);
         if (pointsSpan) {
            pointsSpan.textContent = item.score;
         }
      });
   })
   .catch(error => {
      console.error(error);
   });
})