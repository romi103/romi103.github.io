$(document).ready(function() {

    var streamLink = 'https://api.twitch.tv/kraken/streams/';
    var userLink = 'https://api.twitch.tv/kraken/users/';
    var profileLink = 'http://www.twitch.tv/';
    
    var users = ["freecodecamp","easports", "dotamajor", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "medrybw", "geefamous92", "brunofin", "comster404"];
    var active = [];
    var offline = [];

    //display users info
    function displayUser(user) {
        if (user.game) {
            $("#all, #online").append("<div class='channel'><a href='" + profileLink + user.name + "'><img class='image' src='" + user.logoLink + "'/><p class='name'>" + user.disname + "</p><p>" + user.game + "<span> Live Stream <i class='fa fa-play-circle'></i></span></p></a></div>");
        } else if (user.status == false) {
            $("#all, #offline").append("<div class='channel'><a href='" + profileLink + user.name + "'><img class='image' src='" + user.logoLink + "'/><p class='name'>" + user.disname + "</p><p>Offline/Account Closed</p></div>");
        } else {
            $("#all, #offline").append("<div class='channel'><a href='" + profileLink + user.name + "'><img class='image' src='" + user.logoLink + "'/><p class='name'>" + user.disname + "</p></div>");
        }
    }

    //logo default
    function defaultLogo(user) {
        if (user.logoLink === null) {
            user.logoLink = "http://romanlorent.com/twitch/log.png";
        }
    }

    //account object constructur
    function Account(name, disname, logoLink, game, status) {
        this.name = name;
        this.disname = disname;
        this.logoLink = logoLink;
        this.game = game;
        this.status = status;
    }

    //getting user info
    function getUserInfo(user) {
        $.getJSON(userLink + user + "").done(function(data) {
            $("#spinner").hide();

        }).done(function(data) {

           var jqxhr = $.getJSON(streamLink + data.name + "", function(stream) {

                var streamStat = stream.stream;
                if (streamStat === null) {
                    var currentUserInfo = new Account(data.name, data.display_name, data.logo);
                    defaultLogo(currentUserInfo);

                } else {
                    var currentUserInfo = new Account(data.name, data.display_name, data.logo, stream.stream.game);
                    defaultLogo(currentUserInfo);
                }
                displayUser(currentUserInfo);

            });
jqxhr.fail(function(){
    console.log(data);
    var currentUserInfo = new Account(data.name, data.display_name, data.logo, null, false);
                defaultLogo(currentUserInfo);
    displayUser(currentUserInfo);
//    $("#all, #offline").append("<div class='channel'><a href='" + profileLink + user.name + "'><img class='image' src='" + user.logoLink + "'/><p class='name'>" + user.disname + "</p></div>");
    
    
});
        });
    }
    users.forEach(getUserInfo);
    //searching through the list of the user
    $("#searchinput").keyup(function(event) {

        var $value = $(event.target).val();
        $value = $value.toLowerCase();
        $(".channel").each(function() {
            var $text = $(this).text();
            $text = $text.toLowerCase();
            if ($text.search($value) > -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

    });

});
