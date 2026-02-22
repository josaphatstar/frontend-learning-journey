document.addEventListener('DOMContentLoaded', async () => {
   try {
      // Vérification de la réponse et chargement des données
      const response = await fetch('./data.json');
      console.log('Statut de la réponse:', response.status);

      if (!response.ok) {
         throw new Error(`Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      console.log('Données chargées:', data);

      // Vérification de la structure des données
      if (!data || !data.expenses) {
         throw new Error('Format de données invalide: tableau expenses non trouvé');
      }

      // Calcul du montant maximum pour les proportions
      const maxAmount = Math.max(...data.expenses.map(day => day.amount));
      console.log('Montant maximum:', maxAmount);
      
      // Application des styles pour chaque barre
      data.expenses.forEach(expense => {
         const barElement = document.getElementById(expense.day);
         console.log('Élément trouvé:', expense.day, barElement);

         if (!barElement) {
            console.error(`Élément avec l'ID ${expense.day} non trouvé`);
            return;
         }

         const height = Math.round((expense.amount / maxAmount) * 150);
         console.log(`Définition de la hauteur pour ${expense.day}:`, height);
         
         barElement.style.height = `${height}px`;
         barElement.style.backgroundColor = 'hsl(10, 70%, 65%)';
         barElement.style.display = 'block';
      });

   } catch (error) {
      console.error('Erreur:', error.message);
   }
});