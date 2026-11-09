// =========================================================
// 3. WAVY LETTERS
// Split the text into one <span> per letter so CSS can
// animate each letter separately.
// =========================================================

const wavyText = document.getElementById('wavy-text');
const letters = wavyText.textContent.split(''); // "Wavy" -> ["W","a","v","y"]

wavyText.textContent = ''; // empty the paragraph; we'll refill it with spans
// Screen readers should read the word, not single letters
wavyText.setAttribute('aria-label', letters.join(''));

letters.forEach(function (letter, i) {
  const span = document.createElement('span');

  // A normal space would collapse to nothing inside an inline-block,
  // so we use a non-breaking space instead
  span.textContent = letter === ' ' ? ' ' : letter;

  // Each letter starts 0.1s later than the one before -> wave effect
  span.style.animationDelay = (i * 0.1) + 's';

  span.setAttribute('aria-hidden', 'true');
  wavyText.appendChild(span);
});


// =========================================================
// 5. RIPPLE CLICK BUTTON
// On click, create a circle at the mouse position and let
// CSS animate it outward.
// =========================================================

const rippleButton = document.getElementById('ripple-btn');

rippleButton.addEventListener('click', function (e) {
  // Where is the button on the screen?
  const rect = rippleButton.getBoundingClientRect();

  // Mouse position relative to the button's top-left corner.
  // (Keyboard "clicks" have no mouse position, so use the center.)
  const x = e.clientX ? e.clientX - rect.left : rect.width / 2;
  const y = e.clientY ? e.clientY - rect.top : rect.height / 2;

  // Make the circle
  const circle = document.createElement('span');
  circle.className = 'ripple';
  circle.style.left = x + 'px';
  circle.style.top = y + 'px';
  rippleButton.appendChild(circle);

  // When the CSS animation finishes, remove the circle
  circle.addEventListener('animationend', function () {
    circle.remove();
  });
});
