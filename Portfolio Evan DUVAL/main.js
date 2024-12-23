document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.projets-container');
    const cards = document.querySelectorAll('.projet-card');
    const leftButton = document.querySelector('.scroll-button.left');
    const rightButton = document.querySelector('.scroll-button.right');
    let activeIndex = Array.from(cards).findIndex(card => card.classList.contains('active'));
    let autoScrollInterval;
    let isPaused = false;

    // Mise à jour des boutons
    const updateButtons = () => {
        leftButton.style.opacity = activeIndex === 0 ? '0.5' : '1';
        leftButton.style.cursor = activeIndex === 0 ? 'default' : 'pointer';
        rightButton.style.opacity = activeIndex === cards.length - 1 ? '0.5' : '1';
        rightButton.style.cursor = activeIndex === cards.length - 1 ? 'default' : 'pointer';
    };

    // Centrer la carte active
    const centerActiveCard = (smooth = true) => {
        const activeCard = cards[activeIndex];
        const containerCenter = container.offsetWidth / 2;
        const cardCenter = activeCard.offsetWidth / 2;
        const scrollPosition = activeCard.offsetLeft - containerCenter + cardCenter;
        
        container.scrollTo({
            left: scrollPosition,
            behavior: smooth ? 'smooth' : 'instant'
        });

        cards.forEach((card, index) => {
            if (index === activeIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        updateButtons();
    };

    // Navigation
    const navigateToCard = (direction) => {
        const newIndex = activeIndex + direction;
        
        if (newIndex >= 0 && newIndex < cards.length) {
            activeIndex = newIndex;
            centerActiveCard();
        } else if (newIndex >= cards.length) {
            // Retour au début
            activeIndex = 0;
            centerActiveCard();
        } else if (newIndex < 0) {
            // Aller à la fin
            activeIndex = cards.length - 1;
            centerActiveCard();
        }
    };

    // Défilement automatique
    const startAutoScroll = () => {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
            if (!isPaused) {
                navigateToCard(1);
            }
        }, 6000); // Change de carte toutes les 6 secondes
    };

    // Si la section projet est survolée par la souris arrêter le défilement automatique
    const isHover = e => e.parentElement.querySelector(':hover') === e;    

    const myDiv = document.getElementById('projets');
    document.addEventListener('mousemove', function checkHover() {
    const hovered = isHover(myDiv);
    if (hovered !== checkHover.hovered) {
        checkHover.hovered = hovered;

        if (hovered) {
            clearInterval(autoScrollInterval);
        } else {
            startAutoScroll();
        }
    }
    });

    // Pause au survol
    container.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    container.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Click events pour les boutons
    leftButton.addEventListener('click', () => {
        navigateToCard(-1);
        isPaused = true;
        setTimeout(() => { isPaused = false; }, 5000); // Reprend après 5 secondes
    });

    rightButton.addEventListener('click', () => {
        navigateToCard(1);
        isPaused = true;
        setTimeout(() => { isPaused = false; }, 5000); // Reprend après 5 secondes
    });

    // Défilement manuel
    let isScrolling;
    container.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(() => {
            const containerCenter = container.offsetWidth / 2;
            const scrollPosition = container.scrollLeft + containerCenter;

            let minDistance = Infinity;
            let closestIndex = activeIndex;

            cards.forEach((card, index) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const distance = Math.abs(scrollPosition - cardCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = index;
                }
            });

            if (closestIndex !== activeIndex) {
                activeIndex = closestIndex;
                centerActiveCard();
            }
        }, 100);
    });

    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            navigateToCard(-1);
            isPaused = true;
            setTimeout(() => { isPaused = false; }, 5000);
        } else if (e.key === 'ArrowRight') {
            navigateToCard(1);
            isPaused = true;
            setTimeout(() => { isPaused = false; }, 5000);
        }
    });

    // Touch events
    let touchStartX;
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        isPaused = true;
    });

    container.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > 50) { // Minimum swipe distance
            if (difference > 0) {
                navigateToCard(1);
            } else {
                navigateToCard(-1);
            }
        }
        
        setTimeout(() => { isPaused = false; }, 5000);
    });

    // Initialisation
    centerActiveCard(false);
    updateButtons();
    startAutoScroll();
});