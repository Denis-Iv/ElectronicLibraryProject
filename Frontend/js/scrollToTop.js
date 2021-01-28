const topBtn = document.getElementById("topBtn");

topBtn.addEventListener('click', () => topFunction());
window.onscroll = function() {scrollFunction()};

// Бутона за връщане нагоре се показва само ако се скролне страницата
function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}

// Връща страницата нагоре
function topFunction() {
  document.documentElement.scrollTop = 0; 
}