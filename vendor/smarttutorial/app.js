jQuery.validator.setDefaults({
    errorPlacement: function(error, element) {
        jQuery(element).closest('div.form-group').find('.form-text').html(error.html());
    },
    highlight: function(element) {
        jQuery(element).closest('div.form-group').removeClass('has-success').addClass('has-error');
    },
    unhighlight: function(element, errorClass, validClass) {
        jQuery(element).closest('div.form-group').removeClass('has-error').addClass('has-success');
        jQuery(element).closest('div.form-group').find('.form-text').html('');
    }
});

$(document).ready(function(){
    var $form, $loader, $modal, $messageModalContent;

    $loader = $("#loader");
    $form = $("#contactForm");

    $modal = $("#messageModal");
    $messageModalContent = $("#messageModalContent");
    
    $loader.hide();
    
    $form.validate({
			rules:{
				user_name: {
					required: true,
					minlength: 4
				},
				user_email: {
					required: true,
					email: true
                },
				user_mobileno: {
					required: true,
					minlength: 10
                },
                user_message:{
                    required: true,
					minlength: 15
                },
                user_file:{
                    required: true
                }
			},
			messages: {
				user_name: {
					required: "Please enter a username",
					minlength: "Your username must consist of at least 4 characters"
                },
                user_email: {
					required: "Please enter email"
                },
                user_mobileno: {
					required: "Please enter mobile number",
					minlength: "Your mobile number must consist of at least 4 characters"
                },
                user_message:{
                    required: "Please enter message"
                },
                user_file:{
                    required: "Please choose image/file"
                }
			}
	});

    $form.ajaxForm({
        dataType: 'json',
        beforeSubmit: function(){
            if(!$form.valid()){
                return false;
            }
            $loader.show();
        },
        success:function(res){
            console.log(res);
            $loader.hide();
            $messageModalContent.removeClass("alert-danger").addClass("alert-success");
            $messageModalContent.html("Mail sent successfully")
            $modal.modal("show");
        },
        error:function(error){
            console.log(error);
            $loader.hide();
            $messageModalContent.removeClass("alert-success").addClass("alert-danger");
            $messageModalContent.html("Mail sent failed, try again")
            $modal.modal("show");
        }
    });
});
