var pattern = [];
var userClicks = [];
var currentPattern = [];
var $startButton = $("#start");
var $strictButton = $("#strict");
var $buttons = $(".button");
var level = 1; // whith level is actual (20 levels)    //var level tells which level is current level also it informs about no of iteration.
var moveCounter = 0;
var gameSpeed = 1000;
var strict; //true - ON false - OFF
function offAllButtons() {
    $startButton.off();
    $strictButton.off();
    $("#onOff").off();
    $buttons.off();
}
function offButtons() {
    $buttons.off();
}

function updateScreen() {
    if (level < 10) {
        $("#screen").attr("value", "0" + level);
    } else {
        $("#screen").attr("value", level);
    }
}
//passing "true" as a argument will cause sound alert
function alertSound(sound, win) {

    $buttons.off();
    $("#onOff").off();
    $("#start").off();
    var displayInfo = "";
    var def = new $.Deferred();
    $("#screen").attr("value", displayInfo);

    if (win) {
        displayInfo = "WIN";
    } else {
        displayInfo = "--";
    }

    var alert = setInterval(function () {

        if (sound) {
            playSound(2);
        }

        $("#screen").attr("value", "");
        setTimeout(function () {
            $("#screen").attr("value", displayInfo);
        }, 375);
    }, 750);

    setTimeout(function () {
        clearInterval(alert);
        def.resolve();

    }, 2000);
    return def;
}

function playSound(buttonId) {
    var snd = new Audio("sounds/simonSound" + buttonId + ".mp3");
    snd.play();
}

function buttonsLightsUp(event) {
    var target = event.target;
    var $target = $(target);
    var buttonId = $target.attr("id");
    playSound(buttonId);
    $target.addClass("but" + buttonId + "-lighter");
}

function buttonsLightsDown(event) {
    var target = event.target;
    var $target = $(target);
    var buttonId = $target.attr("id")
    $target.removeClass("but" + buttonId + "-lighter");
}


function creatPattern() {
    for (var i = 0; i < 20; i++) {
        var randomNo = Math.round(Math.random() * 3);
        pattern.push(randomNo);
    }
}

function litLed(that) {
    var $i = $(that);
    var $j = $i.attr("id");
    var $z = $(".dot-" + $j + "");
    $z.addClass("dot-led");
}

function ledOff(that) {
    var $i = $(that);
    var $j = $i.attr("id");
    var $z = $(".dot-" + $j + "");
    if ($z.hasClass("dot-led")) {
        $z.removeClass("dot-led");
    }
}

function compMove() {
    //have to lock 4-color buttons beforhand
    $buttons.off();
    updateScreen();
    var def = new $.Deferred();
    var i = 0;
    currentPattern = pattern.filter(function (element, index) {
        return index <= level - 1;
    });

    function lightUp() {
        var buttonValue = currentPattern[i]; //ex . 0 -3
        var $target = $(".but" + buttonValue + "");
        $target.addClass("but" + buttonValue + "-lighter");
        playSound(buttonValue);
        setTimeout(function () {

            $target.removeClass("but" + buttonValue + "-lighter");
            i++;
            if (i < level) {
                setTimeout(lightUp, gameSpeed);
            } else {
                def.resolve();
            }
        }, gameSpeed);
    }
    lightUp();
    return def;
}

function moveListener(event) {
    var def = new $.Deferred();

    $buttons.mousedown(buttonsLightsUp);
    $buttons.mouseup(buttonsLightsDown);
    updateScreen();
    $buttons.click(function (event) {

        var target = event.target;
        var $target = $(target);
        var buttonId = $target.attr("id"); //1
        userClicks.push(buttonId);
        var i = 0; //level 1

        if (buttonId == currentPattern[moveCounter]) {
            //alert("added");
            userClicks.push(buttonId);
            moveCounter++;

        } else if (buttonId != currentPattern[moveCounter]) {
            $buttons.off();
            moveCounter = 0;
            if (strict) {
                creatPattern();

                level = 1;
            }

            alertSound(true).then(function () {

                setTimeout(function () {

                    compMove().then(function () {
                        $("#onOff").one("click", gameOFF);
                        $("#start").one("click", stopGame);
                    }).then(moveListener);

                }, 1000);
            });
        }
        if (moveCounter == level) {
            $buttons.off();
            level++;
            if (level == 5 || level == 9 || level == 13) {
                gameSpeed -= 120;
            }

            if (level == 21) {
                level = 1;
                pattern = [];
                creatPattern();
                alertSound(false, true).then(function () {
                    compMove().then(function () {
                        $("#onOff").one("click", gameOFF);
                        $("#start").one("click", stopGame);

                    }).then(moveListener);
                });

                def.resolve();

                return def;
            }
            updateScreen();
            console.log("perfect");
            moveCounter = 0;
            def.resolve();
            setTimeout(function () {
                mainGame();
            }, 1000);
        }
    });
    return def;
}

function mainGame(event) {
    compMove().then(moveListener);
}
//toggling STOP - START functiotns
function startGame() {

    //creating a new pattern of 4-color
    creatPattern();
    console.log(pattern);
    litLed(this);

    alertSound().then(function () {
        compMove().then(function () {
            $("#onOff").one("click", gameOFF);
            $("#start").one("click", stopGame);

        }).then(moveListener);
    });

    $(this).one("click", stopGame);
}

function stopGame() {

    ledOff(this);
    $buttons.off();
    pattern = [];
    level = 1;
    moveCounter = 0;
    userClicks = [];
    currentPattern = [];
    $("#screen").attr("value", "--");
    $(this).one("click", startGame);
}
//toggling STRICT mode
function strictON() {
    strict = true;
    litLed(this);
    $(this).one("click", strictOFF);

}

function strictOFF() {
    strict = false;
    ledOff(this);
    $(this).one("click", strictON);
}


//toggling game ON - OFF function
function gameON() {
    //toggling STOP - START
    $("#start").one("click", startGame);
    $("#strict").one("click", strictON);
    litLed(this);
    $(this).one("click", gameOFF);
}

function gameOFF() {
    ledOff(this);
    ledOff("#start");
    ledOff("#strict");
    $startButton.off();
    $strictButton.off();
    $buttons.off();
    pattern = [];
    gameSpeed = 1000;
    level = 1;
    strict = undefined;
    moveCounter = 0;
    userClicks = [];
    currentPattern = [];
    $("#screen").attr("value", "");
    $(this).one("click", gameON);
}

//toggling  game ON - OFF 
$("#onOff").one("click", gameON);