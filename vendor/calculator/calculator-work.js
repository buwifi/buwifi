'use strict';

//variables
let NPr = 1, P = 1, S = 2, CD = 0, Sum = 0, PI = 1, MI = 1, Total = 0;

// Junivo Price Vars
let NAP         = 1;
let BuWiFiPrice = 25;
let SysLogPrice = 2;
let JMSPrice    = 0.1;
let UpWiFiPrice = 35;

//sidebar sections
let page = $('#page');
let plus = $('#plus');
let multiple = $('#multiple');
let newChoose;

//unique field
let domain = $('#domain');

//create letter structure
let formBill;
let separator = '<tr>' +
                '<td style=\'background-color:#e5f0ff;height:2px;\' height=\'2px\'></td>' +
                '<td style=\'background-color:#e5f0ff;height:2px;\' height=\'2px\'></td>' +
                '</tr>';
let paddingRow ='<tr>' +
                '<td style=\'padding-bottom:16px\'></td>' +
                '</tr>';


//NPr < 1000 && NPr > 0
$('#numberaccesspoint').mask('ABB', {
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
  NAP     = parseInt($('#numberaccesspoint').val());
  Syslog  = parseInt($('.radio-btn__radio[name=\'syslog\']:checked').val());

  P = parseInt($('.radio-btn__radio[name=\'number-page\']:checked').val());
  S = parseInt($('.radio-btn__radio[name=\'storage\']:checked').val());
  
  Sum = 0;
  PI = 1;
  MI = 1;
  
  $('.sum-input input:checked').each(function () {
    Sum += parseInt($(this).val());
  });
  
  $('.page-input input:checked').each(function () {
    PI *= parseFloat($(this).val());
  });
  
  $('.multiple-input input:checked').each(function () {
    MI *= parseFloat($(this).val());
  });
  
  CD = (domain.is(':checked')) ? parseInt(domain.val()) : 0;
  
  Calculate();
}

//get result
function Calculate() {
  Total = (((NAP * BuWiFiPrice + P) * PI) + S + Sum) * MI;
  
  if (Total > 100) {
    CD = 0;
    domain.attr('data-value', 'free');
    $('#domain_label').text('free');
  } else {
    domain.attr('data-value', '+ 10 $');
    $('#domain_label').text('10 $');
  }
  
  Total = (((NAP * BuWiFiPrice + P) * PI) + S + Sum + CD) * MI;
  Total = Math.round(Total * 100) / 100;
  Bill();
}

//Add information at a sidebar and at a future letter
function Bill() {
  $('.calculator__bill').remove();
  
  $('#accesspoint-number').text(NAP + ' AP x ');
  $('#syslog-number').text(NAP + ' AP x ');
  
  $('#buwifi-price').text(NAP * BuWiFiPrice + ' $');
  $('#syslog-price').text(NAP * SyslogPrice + ' $');
  
};
  
$('.calculator__sidebar-price-total').text(Total + ' $');
  

Calculate();

let bill = $('.calculator__sidebar');


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
    bill: formBill,
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
