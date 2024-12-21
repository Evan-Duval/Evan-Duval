const navExtender = document.querySelector('.nav-extender');
const navLinks = document.querySelector('.nav-links'); // Modifié pour sélectionner un seul élément

navExtender.addEventListener('click', () => {
    navLinks.classList.toggle('visible'); // Utilisez toggle au lieu de add
});