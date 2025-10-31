// Data 10 Momen (Sudah Disesuaikan)
const momentsData = [
    { id: 1, title: "ce aku yg imoet", date: "", desc: "ini orang lucu, udah gada yg lebih lucu dahh gada obengg😜", image: "assets/momen1.jpg" },
    { id: 2, title: "couple goals", date: "", desc: "sebutkan pasangan terlucu selain ini, ya gada lah busett😎", image: "assets/momen2.jpg" },
    { id: 3, title: "estp gurl", date: "", desc: "kadang bingung sama orang ini yg excited teruss apapun kondisiny🫰🏻", image: "assets/momen3.jpg" },
    { id: 4, title: "met jamet", date: "", desc: "gagapa si met iri muluu😏", image: "assets/momen4.jpg" },
    { id: 5, title: "my favorit gua", date: "", desc: "gada yg bisa mengalahkan kelucuan dan keimoetan cewe gua😚", image: "assets/momen5.jpg" },
    { id: 6, title: "kating deting", date: "", desc: "kangen banget klo udah dikampus tp udh jarang ketemu gegara ldr dramaga sv😞", image: "assets/momen6.jpg" },
    { id: 7, title: "orang mirip katanya jodoh", date: "", desc: "udah berapa orang ya yg bilang kita mirip, tp emg iya sih namanya jodoh😝", image: "assets/momen7.jpg" },
    { id: 8, title: "day 365++", date: "", desc: "ga kerasa udah setahun lebih kita bareng2, langgeng terus sayang❤", image: "assets/momen8.jpg" },
    { id: 9, title: "kebanyakan momen", date: "", desc: "udah bingung mau ngasih kata2 apalagii😫 intinya i love you full sayangg🥺🫶🏻", image: "assets/momen9.jpg" },
];

const galleryContainer = document.querySelector('.gallery-container');
const modal = document.getElementById('photoModal');
const closeBtn = document.querySelector('.close-btn');
const loadingMessage = document.getElementById('loading-message');
const nextPageBtn = document.getElementById('nextPageBtn'); // Ambil tombolnya

// --- Logika Inti Galeri ---

function renderMoments() {
    loadingMessage.style.display = 'none';

    momentsData.forEach(momen => {
        const card = document.createElement('div');
        card.classList.add('momen-card');
        card.innerHTML = `
            <img src="${momen.image}" alt="${momen.title}">
            <h2>${momen.title}</h2>
        `;

        // Animasi "Goyang Gemas" saat di-hover (diaktifkan melalui JS)
        card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.05) rotate(3deg)');
        card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');

        card.addEventListener('click', () => openModal(momen));
        galleryContainer.appendChild(card);
    });
}

// page4.js - Logika Tombol Next Page

// Pastikan tombol nextPageBtn sudah dideklarasikan di awal script:
// const nextPageBtn = document.getElementById('nextPageBtn'); 

if (nextPageBtn) {
    nextPageBtn.addEventListener('click', () => {
        // Hapus baris alert
        // alert("Yeay! Khansa pasti suka! Sekarang kamu bisa navigasi ke halaman selanjutnya!"); 
        
        // **AKTIFKAN BARIS INI UNTUK NAVIGASI LANGSUNG**
        window.location.href = 'page5.html'; // Arahkan ke file halaman selanjutnya
    });
}

// --- Fungsi Animasi Lucu (Confetti & Hearts) ---
function openModal(momen) {
    document.getElementById('modalImage').src = momen.image;
    document.getElementById('modalTitle').textContent = momen.title;
    document.getElementById('modalDate').textContent = momen.date;
    document.getElementById('modalDesc').textContent = momen.desc;
    
    modal.style.display = "block";
    
    // 1. Animasi Confetti 
    startConfetti();
    
    // 2. Animasi Hati Terbang
    for (let i = 0; i < 5; i++) {
        setTimeout(createFlyingHeart, i * 150);
    }
}

// Menutup Modal
closeBtn.onclick = function() {
    modal.style.display = "none";
    stopConfetti(); 
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        stopConfetti();
    }
}

// Fungsi Confetti & Flying Heart (tidak diubah dari versi sebelumnya karena sudah berfungsi)
function startConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    confettiContainer.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');
        piece.style.left = Math.random() * 100 + '%';
        piece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        piece.style.position = 'absolute';
        piece.style.width = '10px';
        piece.style.height = '10px';
        piece.style.top = '0';
        piece.style.opacity = '1';
        
        piece.style.transition = `transform 5s linear, top 5s linear, opacity 1s`;
        setTimeout(() => {
            piece.style.top = '100%';
            piece.style.transform += ` translateX(${Math.random() * 200 - 100}px)`;
            piece.style.opacity = '0';
        }, 10);
        
        confettiContainer.appendChild(piece);
        setTimeout(() => piece.remove(), 5000);
    }
}

function stopConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    confettiContainer.innerHTML = '';
}

function createFlyingHeart() {
    const heart = document.createElement('span');
    heart.innerHTML = '💖'; 
    heart.classList.add('flying-heart');
    
    heart.style.position = 'absolute';
    heart.style.fontSize = Math.random() * 15 + 20 + 'px';
    heart.style.left = '50%';
    heart.style.bottom = '10%'; 
    heart.style.opacity = '1';
    heart.style.zIndex = '1000';
    
    const translateX = Math.random() * 200 - 100;
    const translateY = - (Math.random() * 300 + 150);
    
    heart.style.transition = 'transform 3s ease-out, opacity 3s ease-in';

    document.querySelector('.modal-content-wrapper').appendChild(heart);

    setTimeout(() => {
        heart.style.transform = `translate(${translateX}px, ${translateY}px)`;
        heart.style.opacity = '0';
    }, 50);

    setTimeout(() => heart.remove(), 3000);
}


// Jalankan fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderMoments);