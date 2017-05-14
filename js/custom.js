$("#toMyProjects, .side-navbar ul a").click(function(event) {

    event.preventDefault();
    var hash = this.hash;

    $('body').animate({
        scrollTop: $(hash).offset().top
    }, 1000, 'swing');
});



window.onscroll = function() {
    navBarColor();
    addFadeinLeft();

}

window.onload = function() {
    navBarColor();
    addFadeinLeft();
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

// side nav bar functinality 
$("#navgation-hamburger").click(function() {
    console.log("click");
    //for smaller screens no margin created
    if (window.innerWidth >= 650) {
        $("body").toggleClass("side-navbar-active-body");
    }
    $(".side-navbar").toggleClass("side-navbar-active");
    $(this).toggleClass("open");


});

function addFadeinLeft() {
    var firstTileOffset = $(".bg-one").offset().top;
    var windowBottomY = window.scrollY + window.innerHeight;


    if (windowBottomY > firstTileOffset) {
        console.log("test");
        $(".tile").addClass("fade-in-left");
    }
}