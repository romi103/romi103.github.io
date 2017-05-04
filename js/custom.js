var toMyProjects = document.getElementById("toMyProjects");
console.log(window);


toMyProjects.addEventListener("click", function(event) {

    event.preventDefault();
    var hash = this.hash;

    $('body').animate({
        scrollTop: $(hash).offset().top
    }, 1000, 'swing');
})


$('#landing').scroll(function() {
    console.log(window.scrollY);
});

window.onscroll = function() {
    navBarColor();
}

window.onload = function() {
    navBarColor();
    var sectionHeight = window.innerHeight + "px";
    console.log(sectionHeight);
    var sections = document.getElementById("landing");
    sections.style.height = sectionHeight;
    // sections[2].style.minHeight = sectionHeight;



    // for (var i = 0; i < sections.length; i++) {
    //     sections[i].style.minHeight = sectionHeight;
    // }
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