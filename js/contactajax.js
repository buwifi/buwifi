$(document).ready(function(e) {
    $("#frmContact").on('submit', (function(e)
    {
        e.preventDefault();
        var valid;
        valid = validateContact();
        if (valid) {

            $("#response").html('<div class="alert alert-outline-primary"><img src="images/loader.gif"/> Please wait...</div>');

            // console.log('CHECK 3');

            var formData = new FormData(this);
            // formData.append( 'captcha', grecaptcha.getResponse());
            // for (var [key, value] of formData.entries()) { console.log(key, value); }


            $.ajax({
                type: "POST",
                url: "php/contactajax.php",
                data: formData,
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    $("#response").html(data);
                    // alert('Successfully called');
                },
                error: function() {
                    alert('Exception:', exception);
                }
            });
            // console.log($('#response'));//output the target element to the console
            // console.log('CHECK 4');
            // console.log('captcha response: ' + grecaptcha.getResponse()); // --> captcha response: 

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
        } else {
            $("#name").css({ 'background-color': '#f8f9fc', "border-color": "green" });
        }

        if (!$("#email").val()) {
            $("#email-info").html("(Email required)");
            $("#email").css({ 'background-color': '#FFFFDF', "border-color": "red" });
            valid = false;
        } else if (!$("#email").val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
            $("#email-info").html("(Email invalid)");
            $("#email").css({ 'background-color': '#FFFFDF', "border-color": "red" });
            valid = false;
        } else {
            $("#email").css({ 'background-color': '#f8f9fc', "border-color": "green" });
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
        } else {
            $("#subject").css({ 'background-color': '#f8f9fc', "border-color": "green" });
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
        } else {
            $("#message").css({ 'background-color': '#f8f9fc', "border-color": "green" });
        }

        var rcres = grecaptcha.getResponse();
        if (rcres.length) {
            // grecaptcha.reset();
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