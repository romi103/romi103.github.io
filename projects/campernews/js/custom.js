$(document).ready(function() {
	
    $.getJSON("http://www.freecodecamp.com/news/hot").then(function(context) {


        var source = $("#entry-template").html();
        
        var template = Handlebars.compile(source);
        
        var el_html = template(context);
        $("#result").html(el_html);

    }).then(function(){
    	$("footer").html('<div class="container-fluid"><div class="row"><div class="col-md-12"><p>Copyrigth&copy; Roman Lorent 2015</p></div></div></div>');
    });





});
