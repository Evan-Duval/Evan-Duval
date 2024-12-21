const navExtender = document.querySelector('.nav-extender');
const navLinks = document.querySelector('.nav-links'); // Modifié pour sélectionner un seul élément

navExtender.addEventListener('click', () => {
    navLinks.classList.toggle('visible'); // Utilisez toggle au lieu de add
});

const navItems = document.querySelectorAll('.nav-links ul li');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});