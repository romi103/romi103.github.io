(function() {

    // var JSONdata = 
    //     [{ "name": "test", "link": "test" },
    //         { "name": "test", "link": "test" },
    //         { "name": "test", "link": "test" }]
    



$.getJSON('../archivedProjects.js', function(data) {
    var source   = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    
    
    var html    = template(data);

    $("#list-projects").append(html);
})

})()