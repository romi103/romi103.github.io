$("#toMyProjects, .side-navbar a").click(function(event) {

    event.preventDefault();
    var hash = this.hash;

    $('body').animate({
        scrollTop: $(hash).offset().top
    }, 1000, 'swing');
});

window.onscroll = function() {
    navBarColor();
}

window.onload = function() {
    navBarColor();
    var sectionHeight = window.innerHeight + "px";
    var sections = document.getElementById("landing");
    sections.style.height = sectionHeight;
}

// change color of the navbar depends on the window.scrollY property position by toggeling class navigation-black
function navBarColor() {
    var yPosition = window.scrollY;
    if (yPosition > 400) {
        $(".navigation").addClass("navigation-black");
    } else {
        $(".navigation").removeClass("navigation-black");
    }
}

// side nav bar
$("#navgation-hamburger").click(function() {
    $("body").toggleClass("side-navbar-active-body");
    $(".side-navbar").toggleClass("side-navbar-active");
    $(this).toggleClass("open");


});