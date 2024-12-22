document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.projets-container');
    const cards = document.querySelectorAll('.projet-card');
    const leftButton = document.querySelector('.scroll-button.left');
    const rightButton = document.querySelector('.scroll-button.right');
    let activeIndex = Array.from(cards).findIndex(card => card.classList.contains('active'));

    // Vérifier si des boutons doivent être désactivés
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

        // Mettre à jour les classes active
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
        }
    };

    // Click events pour les boutons
    leftButton.addEventListener('click', () => {
        if (activeIndex > 0) {
            navigateToCard(-1);
        }
    });

    rightButton.addEventListener('click', () => {
        if (activeIndex < cards.length - 1) {
            navigateToCard(1);
        }
    });

    // Défilement manuel
    let isScrolling;
    container.addEventListener('scroll', () => {
        window.clearTimeout(isScrolling);

        isScrolling = setTimeout(() => {
            const containerCenter = container.offsetWidth / 2;
            const scrollPosition = container.scrollLeft + containerCenter;

            // Trouver la carte la plus proche du centre
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
        } else if (e.key === 'ArrowRight') {
            navigateToCard(1);
        }
    });

    // Initialisation
    centerActiveCard(false);
    updateButtons();
});