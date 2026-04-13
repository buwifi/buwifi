$(document).ready(function(e) {
    $("#frmContact").on('submit', (function(e)
    {
        e.preventDefault();

        // console.log('CHECK 1');

        var valid;
        valid = validateContact();
        if (valid) {

            // console.log('CHECK 2');

            $("#response").html('<div class="alert alert-outline-primary"><img src="images/loader.gif"/> Please wait...</div>');

            // console.log('CHECK 3');

            $.ajax({
                url: "php/contactajax.php",
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    $("#response").html(data);
                    // alert('Successfully called');
                },
                error: function() {
                    // alert('Exception:', exception);
                }
            });
            // console.log($('#response'));//output the target element to the console
            // console.log('CHECK 4');
            console.log('captcha response: ' + grecaptcha.getResponse()); // --> captcha response: 









        }
    }));

    function validateContact() {
        var valid = true;
        $(".demoInputBox").css('background-color', '');
        $(".info").html('');

        if (!$("#name").val()) {
            $("#name-info").html("(Name required)");
            $("#name").css({ 'background-color': '#FFFFDF', "border-color": "red" });
            valid = false;
        }
        if (!$("#email").val()) {
            $("#email-info").html("(Email required)");
            $("#email").css({ 'background-color': '#FFFFDF', "border-color": "red" });
            valid = false;
        }
        if (!$("#email").val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
            $("#email-info").html("(Email invalid)");
            $("#email").css({ 'background-color': '#FFFFDF', "border-color": "red" });
            valid = false;
        }
        // if (!$("#phone").val()) {
        //     $("#phone-info").html("(Phone required)");
        //     $("#phone").css({ 'background-color': '#FFFFDF', "border-color": "red" });
        //     valid = false;
        // }
        if (!$("#subject").val()) {
            $("#subject-info").html("(Subject required)");
            $("#subject").css({ 'background-color': '#FFFFDF', "border-color": "red" });
            valid = false;
        }
        // if (!$("#position").val()) {
        //     $("#position-info").html("(Select Position)");
        //     $("#position").css({ 'background-color': '#FFFFDF', "border-color": "red" });
        //     valid = false;
        // }
        if (!$("#message").val()) {
            $("#message-info").html("(Message required)");
            $("#message").css({ 'background-color': '#FFFFDF', "border-color": "red" });
            valid = false;
        }

        var rcres = grecaptcha.getResponse();
        if (rcres.length) {
            grecaptcha.reset();
        } else {
            $("#g-recaptcha-info").html("(Please verify reCAPTCHA)");
            valid = false;
        }
        return valid;
    }

});
// $(document).on('change', '.btn-file :file', function() {
//     var input = $(this),
//         numFiles = input.get(0).files ? input.get(0).files.length : 1,
//         label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
//     $("#fileName").text(label);
//     input.trigger('fileselect', [numFiles, label]);
// })