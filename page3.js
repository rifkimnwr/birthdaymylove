let clickedCount = 0;
const totalPhotos = 9;
const captionShowAt = 9; // muncul caption setelah klik foto ke-5

function resetStack() {
    const remainingCards = document.querySelectorAll('.photo-card');
    remainingCards.forEach((card, index) => {
        card.style.zIndex = remainingCards.length - index; 
        card.style.setProperty('--offset', `${index * 4}px`); 
        card.style.setProperty('--angle', `${(index - (remainingCards.length - 1) / 2) * 1.5}deg`); 
        card.style.transition = 'transform 0.4s ease-out';
        card.style.transform = `translate(var(--offset), var(--offset)) rotate(var(--angle))`;
    });
}

function showNextButton() {
    if(document.querySelector('.next-btn')) return; // hindari duplicate
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next Page ➤';
    nextBtn.className = 'next-btn';
    nextBtn.onclick = () => window.location.href = 'page4.html';
    
    document.querySelector('.container').appendChild(nextBtn);
    
    setTimeout(() => {
        nextBtn.classList.add('show');
    }, 100);
}

function showCaption() {
    const caption = document.querySelector('.caption');
    if(caption) caption.classList.add('show');
}

// Inisialisasi tumpukan pertama kali
resetStack();

// Event listener untuk setiap kartu
document.querySelectorAll('.photo-card').forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('clicked')) return;
        card.classList.add('clicked');
        clickedCount++;
        
        card.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.4s ease';
        card.style.transform = 'translate(200%, -50px) rotate(15deg) scale(0.9)';
        
        setTimeout(() => card.style.opacity = '0', 200);
        
        setTimeout(() => {
            card.remove();
            resetStack();
            
            if(clickedCount === captionShowAt) showCaption();
            if(clickedCount === totalPhotos) showNextButton();
        }, 700);
    });
});
