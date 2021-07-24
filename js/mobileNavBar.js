/* 
	Bottom Mobile Nav Bar Template js from codepen.io user.
      By: Cesar Hernández
      See: https://codepen.io/cesardanielhg/pen/PoogRXQ
*/
var navItems = document.querySelectorAll(".mobile-bottom-nav__item");
navItems.forEach(function(e, i) {
	e.addEventListener("click", function(e) {
		navItems.forEach(function(e2, i2) {
			e2.classList.remove("mobile-bottom-nav__item--active");
		})
		this.classList.add("mobile-bottom-nav__item--active");
	});
});