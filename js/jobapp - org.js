// Contact Form
function validateJobForm() 
{
  var name = document.forms["jobForm"]["name"].value;
  var email = document.forms["jobForm"]["email"].value;
  var phone = document.forms["jobForm"]["phone"].value;
  var subject = document.forms["jobForm"]["subject"].value;
  var position = document.forms["jobForm"]["position"].value;
  var message = document.forms["jobForm"]["message"].value;
  var resume = document.forms["jobForm"]["resume[]"].value;
  var grecaptcha = document.forms["jobForm"]["g-recaptcha-response"].value;
  document.getElementById("error-msg").style.opacity = 0;
  document.getElementById('error-msg').innerHTML = "";
  if (name == "" || name == null) {
    document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>Please enter a Name</div>";
    fadeIn();
    return false;
  }
  if (email == "" || email == null) {
    document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>Please enter a Email</div>";
    fadeIn();
    return false;
  }
  if (phone == "" || phone == null) {
    document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>Please enter your phone number</div>";
    fadeIn();
    return false;
  }
  if (subject == "" || subject == null) {
    document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>Please enter a Subject</div>";
    fadeIn();
    return false;
  }
  if (message == "" || message == null) {
    document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>Please enter your Cover Letter</div>";
    fadeIn();
    return false;
  }
  if(grecaptcha == "")
  {
    document.getElementById('error-msg').innerHTML = "<div class='alert alert-warning error_message'>Please check recaptcha</div>";
    fadeIn();
    return false;
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () 
  {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("simple-msg").innerHTML = this.responseText;
      document.forms["jobForm"]["name"].value = "";
      document.forms["jobForm"]["email"].value = "";
      document.forms["jobForm"]["phone"].value = "";
      document.forms["jobForm"]["position"].value = "";
      document.forms["jobForm"]["subject"].value = "";
      document.forms["jobForm"]["message"].value = "";
      document.forms["jobForm"]["resume[]"].value = "";
    }
  };
  xhttp.open("POST", "php/jobapplication.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("name=" + name + "&email=" + email + "&phone=" + phone + "&position=" + position + "&subject=" + subject + "&message=" + message + "&resume " + resume + "&grecaptcha=" + grecaptcha);
  return false;
}
function fadeIn() 
{
  var fade = document.getElementById("error-msg");
  var opacity = 0;
  var intervalID = setInterval(function () {
    if (opacity < 1) {
      opacity = opacity + 0.5
      fade.style.opacity = opacity;
    } else {
      clearInterval(intervalID);
    }
  }, 200);
}




