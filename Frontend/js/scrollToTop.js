const topBtn = document.getElementById("topBtn");

topBtn.addEventListener('click', () => topFunction());

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}

function topFunction() {
  document.documentElement.scrollTop = 0; 
}