$(function() {
  $(document).ready(function() {
    $("a[href*=\\#]").on("click", function(e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $(this.hash).offset().top
        },
        500
      );
    });
  });
});

let toggler = document.querySelector(".menu-toggle"),
  menu = document.querySelector(".mobile-menu"),
  nav = document.querySelector(".mobile-nav"),
	wrapper = document.querySelector(".menu-wrapper"),
	links = document.querySelectorAll('.mobile-nav li')
  flagOfOpen = false;

toggler.addEventListener("click", () => {
  if (flagOfOpen === false) openNavBar();
  else closeNavBar();
});

links.forEach(elem => {
	elem.addEventListener('click', () =>{
		closeNavBar()
	})
})

function closeNavBar() {
  toggler.style.background = "url('../img/bars-solid.svg') center no-repeat";
	setTimeout(() => {
    wrapper.classList.remove("menu-wrapper-open");
  }, 400);
  menu.classList.remove("menu-open");
  nav.classList.remove("mobile-nav-open");
  flagOfOpen = false;
}

function openNavBar() {
  toggler.style.background = "url('../img/cross-solid.svg') center no-repeat";
  wrapper.classList.add("menu-wrapper-open");
  menu.classList.add("menu-open");
  nav.classList.add("mobile-nav-open");
  flagOfOpen = true;
}
