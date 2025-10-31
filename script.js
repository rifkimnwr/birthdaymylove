const inputBox = document.getElementById('inputBox');
const buttons = document.querySelectorAll('.keypad button');
let enteredPin = '';

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.textContent;

    if (val === 'Delete') {
      enteredPin = enteredPin.slice(0, -1);
    } else {
      enteredPin += val;
    }

    inputBox.textContent = enteredPin.replace(/./g, '•');

    if (enteredPin === '011105') {
      inputBox.classList.add('active');
      setTimeout(() => {
        window.location.href = 'next.html';
      }, 1500);
    }
  });
});
