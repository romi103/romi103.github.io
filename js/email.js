    //sending validation  and message validation

    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };

    // ******** contact form validation **********

    //removing alert class
    $(".custom-input").change(function() {
        var $input = $(this);
        var hasAlert = $input.hasClass("alert-form");

        if (hasAlert) {
            $input.removeClass("alert-form");
        }
    });

    //validation and sending the contact form

    $("#button").click(function(event) {
        event.preventDefault();
        var $button = $(this);
        var email = $("#inputEmail");
        var name = $("#inputName");
        var emailValue = email.val();
        var nameValue = name.val();
        var error;

        $("#alert_box").css("display", "block");

        if (!isValidEmailAddress(emailValue) || !emailValue) {
            email.addClass("alert-form");
            error = true
        } else {
            email.removeClass("alert-form");
        }

        if (!nameValue) {
            name.addClass("alert-form");
            error = true;
        } else {
            name.removeClass("alert-form");
        }

        if (!error) {
            $button.find($(".fa")).removeClass("fa-paper-plane").addClass("fa-spinner fa-spin");

            $.post("https://email-send.herokuapp.com/", $("#contactForm").serialize()).done(function() {
                $button.find($(".fa")).removeClass("fa-spinner fa-spin").addClass("fa-check");
            }).fail(function() {
                $("#alert_box").html("Something went wrong! Please try again.");
            });
        }
    });