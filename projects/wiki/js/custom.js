$(document).ready(function (){
var back = ($(window).height()) - ($("footer").height());
    $("section").css("min-height", back);
var link = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=2&exlimit=max&gsrsearch=";

$.extend($.ui.autocomplete.prototype.options, {
    open: function(event, ui) {
        $(this).autocomplete("widget").css({
            "width": ($(this).width() + "px")
        });
    }
});
//random arrticle
var random = "https://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&format=json&rnlimit=1";


var $searchBox = $(".searchBox input");




function ajaxCall() {

    var $query = $searchBox.val();
    $.getJSON(link + $query + "&callback=?").done(function(context) {
        $(".hidding").slideUp(1000, "swing");

    }).done(function(context) {
        var source = $("#entry-template").html();

        var template = Handlebars.compile(source);

        var el_html = template(context);


        $("#result").fadeIn(1500);
        $("#result").html(el_html);


    });

}

$(".searchBox").keypress(function(event) {

    if (event.which == 13) {
        $searchBox.autocomplete("close");
        $searchBox.autocomplete( "option", "disabled", true );
        ajaxCall();

    }

    $searchBox.autocomplete( "option", "disabled", false );


});

$(".searchBox i").click(function() {
    //var $searchBox = $(".searchBox input");

    if ($(".searchBox input").val()) {
       
        ajaxCall();

    }
});

$searchBox.autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term,
                'limit': 5
            },
            success: function(data) {
                response(data[1]);

            }
        });
    }

});


$searchBox.on("autocompleteselect", function(event, ui) {
    $searchBox.val(ui.item.value);
    ajaxCall();

});


$(".random-art").click(function() {
    $.getJSON(random + "&callback=?").done(function(data) {

        window.open("https://en.wikipedia.org/?curid=" + data.query.random[0].id);
    })

});


});