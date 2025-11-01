// Counter untuk tracking foto yang sudah diklik
let clickedCount = 0;

// Ambil semua kartu foto
const cards = document.querySelectorAll('.photo-card');
// Total foto = 9, dihitung dinamis dari DOM
const totalPhotos = cards.length; 

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
    const nextBtnWrapper = document.querySelector('.next-btn-wrapper');
    const nextBtn = document.createElement('a');
    nextBtn.textContent = 'Next Page ➤';
    nextBtn.className = 'cute-btn show'; // Menggunakan CSS untuk tampil
    nextBtn.href = 'page4.html'; // Tautan ke halaman tujuan
    
    if (nextBtnWrapper && nextBtnWrapper.children.length === 0) {
        nextBtnWrapper.appendChild(nextBtn);
    }
}

// Fungsi untuk menampilkan caption
function showCaption() {
    const caption = document.querySelector('.caption');
    if (caption) {
        caption.classList.add('show');
    }
}

// Inisialisasi tumpukan pertama kali
resetStack();

// Event listener utama untuk klik kartu
document.addEventListener('click', (event) => {
    const card = event.target.closest('.photo-card');
    
    if (!card || card.classList.contains('clicked')) return; 
    
    card.classList.add('clicked');
    clickedCount++;
    
    card.style.zIndex = totalPhotos + 1;

    // Animasi kartu keluar
    card.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.4s ease'; 
    card.style.transform = 'translate(200%, -50px) rotate(15deg) scale(0.9)'; 
    
    setTimeout(() => {
        card.style.opacity = '0';
    }, 300);

    // Hapus kartu dari DOM dan reset stack
    setTimeout(() => {
        card.remove();
        resetStack();
        
        // Cek apakah semua foto sudah diklik (total 9 foto)
        if (clickedCount === totalPhotos) {
            showCaption(); 
            showNextButton(); // Tombol Next Page muncul
        }
    }, 700);
});
