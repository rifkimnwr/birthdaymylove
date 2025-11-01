// Counter untuk tracking foto yang sudah diklik
let clickedCount = 0;
const totalPhotos = 5;

// Fungsi untuk mengatur ulang posisi dan z-index semua kartu
function resetStack() {
    const remainingCards = document.querySelectorAll('.photo-card');
    remainingCards.forEach((card, index) => {
        card.style.zIndex = remainingCards.length - index; 
        card.style.setProperty('--offset', `${index * 4}px`); 
        card.style.setProperty('--angle', `${(index - (remainingCards.length - 1) / 2) * 1.5}deg`); 
        card.style.transition = 'transform 0.4s ease-out';
        card.style.transform = `translate(var(--offset), var(--offset)) rotate(var(--angle)) translateZ(0)`;
    });
}

// Fungsi untuk menampilkan tombol Next Page
function showNextButton() {
  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next Page ➤';
  nextBtn.className = 'next-btn';
  nextBtn.onclick = () => {
    window.location.href = 'page4.html';
  };
  
  document.querySelector('.container').appendChild(nextBtn);
  
  // Animasi muncul
  setTimeout(() => {
    nextBtn.classList.add('show');
  }, 100);
}

// Fungsi untuk menampilkan caption setelah foto ke-5 diklik
function showCaption() {
  const caption = document.querySelector('.caption');
  caption.classList.add('show');
}

// Inisialisasi tumpukan pertama kali
resetStack();

// Event listener untuk setiap kartu
const cards = document.querySelectorAll('.photo-card');

cards.forEach(card => {
  card.addEventListener('click', () => {
    // Cegah klik berulang pada kartu yang sama
    if (card.classList.contains('clicked')) return;
    
    // Tandai kartu sudah diklik
    card.classList.add('clicked');
    clickedCount++;
    
    // Animasi kartu keluar
    card.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.4s ease'; 
    card.style.transform = 'translate(200%, -50px) rotate(15deg) scale(0.9)'; 
    
    setTimeout(() => {
      card.style.opacity = '0';
    }, 200);

    // Hapus kartu dari DOM (bukan pindahkan)
    setTimeout(() => {
      card.remove();
      
      // Reset stack untuk kartu yang tersisa
      resetStack();
      
      // Cek apakah semua foto sudah diklik
      if (clickedCount === totalPhotos) {
        showCaption(); // Munculkan caption setelah foto ke-5
        showNextButton(); // Munculkan button
      }
    }, 700);
  });
});
