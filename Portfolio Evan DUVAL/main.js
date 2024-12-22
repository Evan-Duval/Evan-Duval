const container = document.querySelector('.projets-container');
const cards = document.querySelectorAll('.projet-card');

function scrollLeft() {
    container.scrollBy({ left: -300, behavior: 'smooth' });
    updateActiveCard();
}

function scrollRight() {
    container.scrollBy({ left: 300, behavior: 'smooth' });
    updateActiveCard();
}

function updateActiveCard() {
    const activeCard = document.querySelector('.projet-card.active');
    if (activeCard) {
        activeCard.classList.remove('active');
    }
    const middleCard = Math.round(container.scrollLeft / 300);
    cards[middleCard].classList.add('active');
}

container.addEventListener('scroll', () => {
    updateActiveCard();
});