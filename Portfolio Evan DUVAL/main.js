const navbarContainer = document.getElementById('navbar');

fetch('../auto/navbar/navbar.html')
    .then(response => response.text())
    .then(data => {
        navbarContainer.innerHTML = data;

        const navItems = document.querySelectorAll('.nav-links ul li');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    })
    .catch(error => console.error('Erreur lors du chargement de la navbar:', error));