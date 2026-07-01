const title = document.getElementById('typingTitle');
const original = title.textContent;
title.textContent = '';
let index = 0;

function typeTitle() {
  if (index <= original.length) {
    title.textContent = original.slice(0, index) + (index % 2 ? '_' : '');
    index += 1;
    setTimeout(typeTitle, 120);
  } else {
    title.textContent = original;
  }
}
typeTitle();

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.stack-item').forEach((item) => {
      item.classList.toggle('hide', category !== 'all' && item.dataset.category !== category);
    });
  });
});
