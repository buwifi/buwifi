'use strict';

const myObj = {
  style: "currency",
  currency: "USD",
  maximumFractionDigits:0
}

let NPr = 1, P = 1, S = 2, CD = 0, Sum = 0, PI = 1, MI = 1, Total = 0;

let number_AP       = 1;
let number_RPi      = 1;

let price_BuWiFi    = 25;
let price_Syslog    = 0;
let price_SingleJMS = 0.1;
let price_BulkJMS   = 0;
let price_UpWiFi    = 35;

//sidebar sections
let page = $('#page');
let plus = $('#plus');
let multiple = $('#multiple');
let side_buwifi = $('#side_buwifi');
let newChoose;

//unique field
//let domain  = $('#domain');
let check_syslog  = $('#checkSyslog');
let jms           = $('#jms');
let upwifi        = $('#upwifi');

//NPr < 1000 && NPr > 0
$('#numberAP').mask('ABB', {
  'translation': {
    A: {pattern: /[1-9]/},
    B: {pattern: /[0-9]/}
  }
});




//get all values
$('input').on('change', function () {
  newChoose = $(this);
  console.log(newChoose);


  getValues();
});

function getValues() {
  number_AP     = parseInt($('#numberAP').val());
  number_RPi    = parseInt($('#numberRPi').val());
  price_BulkJMS = parseInt($('.radio-btn__radio[name=\'jms-package\']:checked').val());
  price_Syslog  = (check_syslog.is(':checked')) ? parseInt(check_syslog.val()) : 0;
  
  //S             = parseInt($('.radio-btn__radio[name=\'storage\']:checked').val());


  // if ($('#numberAP').val()) {
  //   $('#numberAP').text(number_AP + ' AP x ');
  // }

  Sum = 0;
  // PI  = 1;
  // MI  = 1;
  
  $('.sum-input input:checked').each(function () {
    Sum += parseInt($(this).val());
  });
  
  // $('.page-input input:checked').each(function () {
  //   PI *= parseFloat($(this).val());
  // });
  
  // $('.multiple-input input:checked').each(function () {
  //   MI *= parseFloat($(this).val());
  // });
  
  // CD           = (domain.is(':checked')) ? parseInt(domain.val()) : 0;
  
  Calculate();
}

function Calculate() {
  // Total = (((NAP * BuWiFiPrice + P) * PI) + S + Sum) * MI;
  // syslog.attr('data-value', '+ '+ SysLogPrice + ' $');
  // $('#syslog_label').text('0 '+ SysLogPrice + '$');

  //Total = (((NAP * BuWiFiPrice + P) * PI) + S + Sum + CD) * MI;
  
  Total = (number_AP * (price_BuWiFi + price_Syslog)) + price_BulkJMS + Sum;
  $('.calculator__sidebar-price-total').text(Total.toLocaleString("en-US", myObj)); //tr-TR en-US
  
  Bill();
}

function Bill() {
  $('.calculator__bill').remove();
 
  $('#number-AP').text(number_AP + ' AP x ');
  $('#number-RPi').text(number_RPi + ' RPi x ');
  $('#syslog-number').text(number_AP + ' AP x ');
  
  $('#buwifi-price').text(number_AP * price_BuWiFi + ' $');
  $('#upwifi-price').text(number_RPi * price_UpWiFi + ' $');
  $('#syslog-price').text(number_AP * price_Syslog + ' $');

  // let pageNumber = $('.radio-btn__radio[name=\'jms-package\']:checked').attr('data-value');
  // $('#pages-number').text(pageNumber);
  // $('#pages-price').text(' + ' + P + ' $');
  // $('#storage-price').text(' + ' + S + ' $');

	$('.page-input input:checked').each(function () {
	  let title = $(this).attr('data-title');
	  let value = $(this).attr('data-value');
    
	  if(newChoose.attr('name') === $(this).attr('name')){
	    $('<li class=\'calculator__bill new\'>' + title + '<span class=\'calculator__sidebar-price\'>' + value + '</span></li>')
	      .appendTo(page)
	  }else{
	    $('<li class=\'calculator__bill\'>' + title + '<span class=\'calculator__sidebar-price\'>' + value + '</span></li>')
	      .appendTo(page);
	  }
	});


$('#numberAP').change(function() {

  let title = $(this).attr('data-title');
  let value = $(this).attr('data-value');

  var val = $(this).val();
  if (val >= 5) {

  if(newChoose.attr('name') === $(this).attr('name')){

    


    $('<li class=\'calculator__bill new\'>' + title + '<span class=\'calculator__sidebar-price\'>' + value + '</span></li>')
      .appendTo(page)
  }else{
    $('<li class=\'calculator__bill\'>' + title + '<span class=\'calculator__sidebar-price\'>' + value + '</span></li>')
      .appendTo(page);
  }

  }else{

    $('.calculator__bill').remove();

  }

});








	$('.page-input input:checked').each(function () {
	  let title = $(this).attr('data-title');
	  let value = $(this).attr('data-value');
    
	  if(newChoose.attr('name') === $(this).attr('name')){
	    $('<li class=\'calculator__bill new\'>' + title + '<span class=\'calculator__sidebar-price\'>' + value + '</span></li>')
	      .appendTo(page)
	  }else{
	    $('<li class=\'calculator__bill\'>' + title + '<span class=\'calculator__sidebar-price\'>' + value + '</span></li>')
	      .appendTo(page);
	  }
	});
  
  $('.plus-input input:checked').each(function () {
      let title = $(this).attr('data-title');
      let value = $(this).attr('data-value');
    
      if(newChoose.attr('name') === $(this).attr('name')){
        $('<li class=\'calculator__bill new\'>' + title + '<span class=\'calculator__sidebar-price\'>' + value + '</span></li>')
          .appendTo(plus)
      }else{
        $('<li class=\'calculator__bill\'>' + title + '<span class=\'calculator__sidebar-price\'>' + value + '</span></li>')
          .appendTo(plus);
      }
  });

  multiple.addClass('hidden');
  
  ($('.multiple-input input:checked').length > 0) ?
      multiple.removeClass('hidden') : '';
    
  $('.multiple-input input:checked').each(function () {
      let title = $(this).attr('data-title');
      let value = $(this).attr('data-value');
    
      if(newChoose.attr('name') === $(this).attr('name')){
        $('<li class=\'calculator__bill new\'>' + title + '<span class=\'calculator__sidebar-price\'>' + value + '</span></li>')
          .appendTo(multiple)
      }else{
        $('<li class=\'calculator__bill\'>' + title + '<span class=\'calculator__sidebar-price\'>' + value + '</span></li>')
          .appendTo(multiple);
      }
  });
 
 
  }

  Calculate();

  //Submiting form
  let form = document.querySelector('.calculator-form');
  let formName = '.calculator-form';

  form.addEventListener('submit', function (e) {
    submitForm(e, formName);
  });

  //Send data to mail.php
  function submitForm(e, formName) {
    e.preventDefault();
    let email = $(formName + ' .js-field__email').val();
    
    let formData = {
      email: email
    };
  
  $.ajax({
    type: 'POST',
    url: 'php/calculateajax.php',
    data: formData,
    success: function () {
      console.log('success');
      $('.calculator__card-success').removeClass('hidden');
    },
    error: function () {
      console.log('error');
      //...
    }
  });
}

//reset all
$('.js-reset').on('click', function (e) {
  e.preventDefault();
  $('.js-form :checkbox[required]').attr('required', 'required');
  $('.form__submit').attr('disabled', 'disabled').addClass('disable');
  $('.js-field__email').removeAttr('data-touched');
  form.reset();
  $('.calculator__card-success').addClass('hidden');
  getValues();
  multiple.addClass('hidden');
});
