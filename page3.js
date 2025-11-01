// Counter untuk tracking foto yang sudah diklik
let clickedCount = 0;

// Ambil semua kartu foto (saat file JS dimuat)
const cards = document.querySelectorAll('.photo-card');
// PENTING: Mendapatkan total foto secara dinamis dari DOM
const totalPhotos = cards.length; 

// Fungsi untuk mengatur ulang posisi dan z-index semua kartu
function resetStack() {
    // Ambil kartu yang tersisa di DOM
    const remainingCards = document.querySelectorAll('.photo-card');
    remainingCards.forEach((card, index) => {
        // z-index: memastikan kartu teratas selalu memiliki z-index tertinggi
        card.style.zIndex = remainingCards.length - index; 
        
        // Atur ulang properti CSS untuk stacking
        // Offset dikurangi (dari 6px menjadi 4px) agar stacking lebih rapat di HP
        card.style.setProperty('--offset', `${index * 4}px`); 
        
        // Sudut disesuaikan ke tengah tumpukan
        card.style.setProperty('--angle', `${(index - (remainingCards.length - 1) / 2) * 1.5}deg`); 
        
        // Memastikan transisi reset cepat
        card.style.transition = 'transform 0.4s ease-out';
        
        // Memastikan kartu yang tersisa kembali ke posisi transform normal
        card.style.transform = `translate(var(--offset), var(--offset)) rotate(var(--angle)) translateZ(0)`;
    });
}

// Fungsi untuk menampilkan tombol Next Page
function showNextButton() {
    // Cari wrapper tombol yang sudah ada di HTML
    const nextBtnWrapper = document.querySelector('.next-btn-wrapper');
    const nextBtn = document.createElement('a');
    nextBtn.textContent = 'Next Page ➤';
    nextBtn.className = 'cute-btn'; // Menggunakan class CSS button yang bagus
    nextBtn.href = 'page4.html';
    
    if (nextBtnWrapper) {
        nextBtnWrapper.appendChild(nextBtn);
    
        // Animasi muncul
        setTimeout(() => {
            nextBtn.classList.add('show');
        }, 100);
    }
}

// Fungsi untuk menampilkan caption setelah semua foto diklik
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
    
    // Tandai kartu sudah diklik
    card.classList.add('clicked');
    clickedCount++;
    
    // Menetapkan z-index lebih tinggi untuk kartu yang diklik agar berada di atas tumpukan
    card.style.zIndex = totalPhotos + 1;

    // Animasi kartu keluar: menggunakan cubic-bezier untuk efek bounce yang cepat
    card.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.4s ease'; 
    
    // Dorong kartu keluar dari tampilan layar ke kanan
    card.style.transform = 'translate(200%, -50px) rotate(15deg) scale(0.9)'; 
    
    // Opacity fade out
    setTimeout(() => {
        card.style.opacity = '0';
    }, 300);

    // Hapus kartu dari DOM dan reset stack
    setTimeout(() => {
        card.remove();
        
        // Reset stack untuk kartu yang tersisa
        resetStack();
        
        // Cek apakah semua foto sudah diklik
        if (clickedCount === totalPhotos) {
            showCaption(); 
            showNextButton(); 
        }
    }, 700); // Waktu harus lebih lama dari durasi transisi (0.6s)
});
