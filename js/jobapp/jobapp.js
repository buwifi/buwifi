$(document).ready(function(e) {
    $("#frmJobapp").on('submit', (function(e) {
        e.preventDefault();

        var valid;
        valid = validateContact();
        if (valid) {
            $("#response").html('<div class="alert alert-outline-primary"><img src="images/loader.gif"/> Please wait...</div>');

            $.ajax({
                url: "php/jobappajax.php",
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    $("#response").html(data);
                },
                error: function() {}
            });
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
        if (!$("#phone").val()) {
            $("#phone-info").html("(Phone required)");
            $("#phone").css({ 'background-color': '#FFFFDF', "border-color": "red" });
            valid = false;
        }
        if (!$("#subject").val()) {
            $("#subject-info").html("(Subject required)");
            $("#subject").css({ 'background-color': '#FFFFDF', "border-color": "red" });
            valid = false;
        }
        if (!$("#position").val()) {
            $("#position-info").html("(Select Position)");
            $("#position").css({ 'background-color': '#FFFFDF', "border-color": "red" });
            valid = false;
        }
        if (!$("#message").val()) {
            $("#message-info").html("(Message required)");
            $("#message").css({ 'background-color': '#FFFFDF', "border-color": "red" });
            valid = false;
        }
        if (!$("#attachmentFile").val()) {
            $("#attachmentFile-info").html("(Resume required)");
            $("#attachmentFile").css({ 'background-color': '#FFFFDF', "border-color": "red" });
            valid = false;
        } else if ($('#attachmentFile').get(0).files[0].size > 524288) {
            $("#attachmentFile-info").html("(File size must be less then 500KB)");
            valid = false;
        } else if (!hasExtension('attachmentFile', ['.doc', '.docx', '.pdf'])) {
            $("#attachmentFile-info").html("(Word or PDF only)");
            valid = false;
        }

        // if (!$("#g-recaptcha").val()) {
        //     $("#g-recaptcha-info").html("(Recaptcha required)");
        //     $("#g-recaptcha").css({ 'background-color': '#FFFFDF', "border-color": "red" });
        //     valid = false;
        // }

        // var rcres = grecaptcha.getResponse();
        // if (rcres.length) {
        //     grecaptcha.reset();
        //     $("#response").html('<div class="alert alert-outline-primary">Recaptha OK</div>');

        // } else {
        //     $("#response").html('<div class="alert alert-outline-primary">Please verify reCAPTCHA</div>');
        // }

        var rcres = grecaptcha.getResponse();
        if (rcres.length) {
            // grecaptcha.reset();
            // $("#response").html('<div class="alert alert-outline-primary">Recaptha OK</div>');
        } else {
            $("#g-recaptcha-info").html("(Please verify reCAPTCHA)");
            // $("#response").html('<div class="alert alert-outline-primary">Please verify reCAPTCHA</div>');
            valid = false;
        }
        return valid;
    }

    // function ValidateExtension() {
    //     var allowedFiles = [".doc", ".docx", ".pdf"];
    //     var fileUpload = document.getElementById("attachmentFile");
    //     var lblError = document.getElementById("lblError");
    //     var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
    //     if (!regex.test(attachmentFile.value.toLowerCase())) {
    //         // lblError.innerHTML = "Please upload files having extensions: <b>" + allowedFiles.join(', ') + "</b> only.";
    //         $("#attachmentFile-info").html("Extensions: <b>" + allowedFiles.join(', ') + "</b> only.");

    //         return false;
    //     }
    //     lblError.innerHTML = "";
    //     return true;
    // }

    function hasExtension(inputID, exts) {
        var fileName = document.getElementById(inputID).value;
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }

});
$(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    $("#fileName").text(label);
    input.trigger('fileselect', [numFiles, label]);
})