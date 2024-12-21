const navbarContainer = document.getElementById('navbar');

fetch('/auto/navbar/navbar.html')
    .then(response => response.text())
    .then(data => {
        // Insérer la navbar dans le conteneur
        document.getElementById('navbar').innerHTML = data;

        // Identifier la page actuelle à partir de l'URL
        const currentPage = window.location.pathname.split('/')[1]; // Extrait le dossier courant
        const navLinks = document.querySelectorAll('.nav-links ul li a');

        // Parcourir tous les liens pour marquer le lien actif
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === currentPage) {
                link.parentElement.classList.add('active');
            }
        });
    })
    .catch(error => console.error('Erreur lors du chargement de la navbar:', error));