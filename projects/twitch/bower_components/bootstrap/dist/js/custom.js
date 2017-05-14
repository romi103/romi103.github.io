$(document).ready(function() {

    var streamLink = 'https://api.twitch.tv/kraken/streams/';
    var userLink = 'https://api.twitch.tv/kraken/users/';
    var defaultLogoLink = "https://www.google.co.uk/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0CAcQjRxqFQoTCPPl1O6uk8kCFUa2Ggod1DUPvg&url=https%3A%2F%2Fpixabay.com%2Fen%2Fubuntu-logo-ubuntu-logo-linux-8647%2F&psig=AFQjCNFfmjBYjDcjgThGLxQ_jnbppGCT-A&ust=1447709099049019";
    var users = ["freecodecamp", "trilluxelive", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff"]
    var active = [];
    var offline = [];

    /*users.forEach(function(element, index){
        $.getJSON(link + "users/" + element + "", function(data) {


            var name = data.display_name;
            var logo = data.logo;
            //var game = data.stream.channel.game;
           
            $("#all").append("<div class='channel'><img class='image' src='" + logo + "'/><p>" + name + "</p></div>");

            if ($(".channel img").is("img[src*='null']")) {
                //change to default image
            }

}).
*/
//display users info
function displayUser(user) {
    $("#all").append("<div class='channel'><img class='image' src='" + user.logoLink + "'/><p>" + user.disname + "</p></div>");
    console.log(user);
}

//stream status



    //account object constructur

    function Account(disname, logoLink) {
        this.disname = disname;
        this.logoLink = logoLink;
     
    }

    //getting user info
    function getUserInfo(user) {
        $.getJSON(userLink + user + "", function(data) {
            var currentUserInfo = new Account(data.display_name, data.logo);
            //dafault logo set
            if (currentUserInfo.logoLink === null) {
                currentUserInfo.logoLink = defaultLogoLink;
            }
        //console.log(currentUserInfo.getStreamInfo());
            displayUser(currentUserInfo);
            
            
        });


    }

    users.forEach(getUserInfo);



});





/*$.getJSON( "https://api.twitch.tv/kraken/streams/" + users[i] + "", function( data ) {
    console.log(data.stream);
    var game = data.stream.game;
    if(data.stream !== null) {
        alert(users[i]);
                var user = 
        $(".channel[id*='']").append("<p>" + game + "</p>");
    }
});*/
