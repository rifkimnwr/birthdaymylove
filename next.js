document.querySelector('.next-btn').addEventListener('click', () => {
  document.querySelector('.container').classList.add('fade-out');
  setTimeout(() => {
    // nanti bisa diarahkan ke halaman selanjutnya
    alert("Next page coming soon 💕");
  }, 800);
});
