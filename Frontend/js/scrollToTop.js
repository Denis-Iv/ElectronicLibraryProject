const topBtn = document.getElementById("topBtn");

topBtn.addEventListener('click', () => topFunction());

function topFunction() {
  document.documentElement.scrollTop = 0; 
}