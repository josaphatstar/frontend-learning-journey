/**
 * Calcule l'âge en fonction de la date de naissance (jour, mois, année).
 * Met à jour dynamiquement l'interface utilisateur avec les résultats.
 */

const dayInput = document.getElementById('day-input');
const monthInput = document.getElementById('month-input');
const yearInput = document.getElementById('year-input');

const yearResult = document.getElementById('years-result');
const monthResult = document.getElementById('months-result');
const dayResult = document.getElementById('days-result');

const submitBtn = document.querySelector('.circle');

/**
 * Calcule l'âge
 */
function calculateAge() {
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    // Validation simple
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        alert("Veuillez entrer une date valide.");
        return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    // Vérifier si la date est valide et dans le passé
    if (birthDate > today || birthDate.getDate() !== day || birthDate.getMonth() !== month - 1) {
        alert("Veuillez entrer une date de naissance valide.");
        return;
    }

    let diffYears = today.getFullYear() - birthDate.getFullYear();
    let diffMonths = today.getMonth() - birthDate.getMonth();
    let diffDays = today.getDate() - birthDate.getDate();

    // Ajustement si le jour actuel est avant le jour de naissance dans le mois
    if (diffDays < 0) {
        diffMonths--;
        // Obtenir le dernier jour du mois précédent
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        diffDays += lastMonth.getDate();
    }

    // Ajustement si le mois actuel est avant le mois de naissance
    if (diffMonths < 0) {
        diffYears--;
        diffMonths += 12;
    }

    // Mise à jour de l'affichage
    animateValue(yearResult, diffYears);
    animateValue(monthResult, diffMonths);
    animateValue(dayResult, diffDays);
}

/**
 * Petite animation simple pour les chiffres
 */
function animateValue(element, value) {
    element.value = value;
}

// Événement au clic sur la flèche
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    calculateAge();
});

// Permettre aussi de valider avec la touche Entrée
[dayInput, monthInput, yearInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateAge();
        }
    });
});
