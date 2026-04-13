function sendEmail() {
  var name = $("#name");
  var email = $("#email");
  var subject = $("#subject");
  var message = $("#message");

  if (isNotEmpty(name) && isNotEmpty(email) && isNotEmpty(subject) && isNotEmpty(message)) {
      $.ajax({
         url: 'php/sendemail.php',
         method: 'POST',
         dataType: 'json',
         data: {
             name: name.val(),
             email: email.val(),
             subject: subject.val(),
             message: message.val()
         }, success: function (response) {
              $('#myForm')[0].reset();
              $('.sent-notification').text("Message Sent Successfully.");
         }
      });
  }
}

function isNotEmpty(caller) {
  if (caller.val() == "") {
      caller.css('border', '1px solid red');
      return false;
  } else
      caller.css('border', '');

  return true;
}