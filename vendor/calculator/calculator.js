'use strict';

// Junivo Price Vars
let Number_AP     = 0;
let Number_RPi    = 0;
let Number_SMS    = 0;

let Price_BuWiFi  = 35;
let Price_UpWiFi  = 65;
let Price_Syslog  = 5;
let Price_JMS     = 0;

//variables
// let NRPi = 1, P = 1, S = 2, Sum = 0, PI = 1, MI = 1

let Total = 0;

//sidebar sections
let page = $('#page');
let plus = $('#plus');
let multiple = $('#multiple');
let newChoose;

//unique field
let syslog = $('#syslog');

//unique field
// let domain = $('#domain');

//create letter structure
// let formBill;
// let separator = '<tr>' +
//   '<td style=\'background-color:#e5f0ff;height:2px;\' height=\'2px\'></td>' +
//   '<td style=\'background-color:#e5f0ff;height:2px;\' height=\'2px\'></td>' +
// '</tr>';
// let paddingRow ='<tr>' +
//   '<td style=\'padding-bottom:16px\'></td>' +
// '</tr>';

//Number_AP < 1000 && Number_AP > 0
$('#buwifi').mask('ABB', {
  'translation': {
    A: {pattern: /[1-9]/},
    B: {pattern: /[0-9]/}
  }
});

$('#upwifi').mask('ABB', {
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
  Number_AP  = parseInt($('#buwifi').val()) || 0;
  Number_RPi = parseInt($('#upwifi').val()) || 0;

  Number_SMS = parseInt($('.radio-btn__radio[name=\'bulk-jms\']:checked').val());
  Price_JMS  = parseInt($('.radio-btn__radio[name=\'bulk-jms\']:checked').attr('data-value'));

  // Price_Design  = parseInt($('.checkbox-btn__checkbox[name=\'design\']:checked').val());

  Price_Syslog = (syslog.is(':checked')) ? parseInt(syslog.val()) : 0;

  // P = parseInt($('.radio-btn__radio[name=\'number-page\']:checked').val());
  // S = parseInt($('.radio-btn__radio[name=\'storage\']:checked').val());

  // Sum = 0;
  // PI = 0;
  // MI = 0;
  
  // $('.sum-input input:checked').each(function () {
  //   Sum += parseInt($(this).val());
  // });
  
  // $('.page-input input:checked').each(function () {
  //   PI *= parseFloat($(this).val());
  // });
  
  // $('.multiple-input input:checked').each(function () {
  //   MI *= parseFloat($(this).val());
  // });
  

  
  Calculate();
}

//get result
function Calculate() {


  // Total = (((Number_AP * Price_BuWiFi + P) * PI) + S + Sum) * MI + (Number_RPi * Price_UpWiFi);
  
  // if (Total > 100) {
  //   CD = 0;
  //   domain.attr('data-value', 'free');
  //   $('#domain_label').text('free');
  // } else {
  //   domain.attr('data-value', '+ 10 $');
  //   $('#domain_label').text('10 $');
  // }
  
  Total = (Number_AP * (Price_BuWiFi + Price_Syslog)) + (Number_RPi * Price_UpWiFi) + Price_JMS;
  Total = Math.round(Total * 100) / 100;

  Bill();
}

//Add information at a sidebar and at a future letter
function Bill() {
  $('.calculator__bill').remove();

  // formBill = '<tr>' +
  //   '<td align=\'center\' style=\'vertical-align: top; padding-top: 36px;\' valign=\'top\'>\n' +
  //   '<table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' style=\'border-collapse: separate; mso-table-lspace: 0;\n' +
  //   'mso-table-rspace: 0; width: 100%; max-width: 400px; border: solid 2px #e5f0ff;\'>\n';
  
  $('#number-ap').text(' x ' + Number_AP);
  $('#price-buwifi').text(' +' + Number_AP * Price_BuWiFi + ' $');

  $('#number-rpi').text(' x ' + Number_RPi);
  $('#price-upwifi').text(' +' + Number_RPi * Price_UpWiFi + ' $');

  $('#number-sms').text(' x ' + Number_SMS);
  $('#price-jms').text(' +' + Price_JMS + ' $');
  
  syslog.attr('data-value', ' +' + Number_AP * Price_Syslog + ' $');
  // $('#syslog_label').text('10 $');
  
  //1 (letter.html)
  // formBill += '<tr>' +
  //   '<td align=\'left\' style=\'vertical-align: top; padding-top: 16px; padding-left: 16px;\' valign=\'top\'>\n' +
  //   '<p style=\'background-color: #e5f0ff; text-align: left; font-size: 14px; font-family: sans-serif;\n' +
  //   'color: #7d93b2; padding-left: 16px; padding-top: 16px; margin-top: 0; margin-bottom: 0;\'>\n' +
  //   'Projects <b style=\'color: #4c6280\'>x ' + Number_AP + '</b></p></td>\n' +
  //   '<td align=\'left\' style=\'vertical-align: top; padding-top: 16px; padding-right: 16px;\' valign=\'top\'>\n' +
  //   '<p style=\'background-color: #e5f0ff; text-align: right; font-size: 14px; font-family: sans-serif;\n' +
  //   'color: #4c6280; padding-right: 16px; padding-top: 16px; margin-top: 0; margin-bottom: 0;\'>\n' +
  //   '<b>' + Number_AP * Price_BuWiFi + ' $</b></p></td></tr>\n';

  // Price_JMS = parseInt($('.radio-btn__radio[name=\'bulk-jms\']:checked').val());

  // let pageNumber = $('.radio-btn__radio[name=\'number-page\']:checked').attr('data-value');
  // $('#pages-number').text(pageNumber);
  // $('#pages-price').text(' + ' + P + ' $');

  //2
  // formBill += '<tr>' +
  //   '<td align=\left\' style=\'vertical-align: top; padding-top: 0; padding-left: 16px;\' valign=\'top\'>\n' +
  //   '<p style=\'background-color: #e5f0ff; text-align: left; font-size: 14px; font-family: sans-serif;\n' +
  //   'color: #7d93b2; padding-left: 16px; padding-top: 16px; padding-bottom: 16px; margin-top: 0;\n' +
  //   'margin-bottom: 0;\'>\n' +
  //   'Pages <b style=\'color: #4c6280\'>' + pageNumber + '</b></p></td>\n' +
  //   '<td align=\'left\' style=\'vertical-align: top; padding-right: 16px;\' valign=\'top\'>\n' +
  //   '<p style=\'background-color: #e5f0ff; text-align: right; font-size: 14px; font-family: sans-serif;\n' +
  //   'color: #4c6280; padding-right: 16px; padding-top: 16px; padding-bottom: 16px; margin-top: 0;\n' +
  //   'margin-bottom: 0;\'><b>+ ' + P + ' $</b></p></td></tr>\n';
  
  //3
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
    
    // formBill += '<tr>' +
    //   '<td style=\'font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: left; color: #7d93b2;\n' +
    //   'padding-top: 18px; padding-left: 32px\' valign=\'top\' align=\'left\'>' + title + '</td>\n' +
    //   '<td style=\'font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: right; color: #4c6280;\n' +
    //   'padding-top: 18px; padding-right: 32px\' valign=\'top\' align=\'right\'>\n' +
    //   '<b>' + value + '</b></td></tr>\n';


    });
  
  // formBill += paddingRow + separator;
  
  //4
  // $('#storage-price').text(' + ' + S + ' $');
  // $('#RPi-price').text(' + ' + NRPi + ' $');
  // $('#JMS-bulk').text(' + ' + Price_JMS + ' $');
  
  
  // formBill += '<tr>' +
  //   '<td style=\'font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: left; color: #7d93b2;\n' +
  //   'padding-top: 18px; padding-left: 32px\' valign=\'top\' align=\'left\'>Storage</td>\n' +
  //   '<td style=\'font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: right; color: #4c6280;\n' +
  //   'padding-top: 18px; padding-right: 32px\' valign=\'top\' align=\'right\'>\n' +
  //   '<b>+ ' + S + ' $</b></td></tr>\n';
  
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
    
    // formBill += '<tr>' +
    //   '<td style=\'font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: left; color: #7d93b2;\n' +
    //   'padding-top: 18px; padding-left: 32px\' valign=\'top\' align=\'left\'>' + title + '</td>\n' +
    //   '<td style=\'font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: right; color: #4c6280;\n' +
    //   'padding-top: 18px; padding-right: 32px\' valign=\'top\' align=\'right\'>\n' +
    //   '<b>' + value + '</b></td></tr>\n';

  });
  
  //6
  //  multiple.addClass('hidden');
  //  ($('.multiple-input input:checked').length > 0) ?
  //    multiple.removeClass('hidden') : '';
  
  // formBill += ($('.multiple-input input:checked').length > 0) ? paddingRow + separator : '';
  
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
  
    // formBill += '<tr>' +
    //   '<td style=\'font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: left; color: #7d93b2;\n' +
    //   'padding-top: 18px; padding-left: 32px\' valign=\'top\' align=\'left\'>' + title + '</td>\n' +
    //   '<td style=\'font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: right; color: #4c6280;\n' +
    //   'padding-top: 18px; padding-right: 32px\' valign=\'top\' align=\'right\'>\n' +
    //   '<b>' + value + '</b></td></tr>\n';


    });
  
  // formBill += paddingRow + '</table></td></tr>\n';
  
  //Total
  $('.calculator__sidebar-price-total').text(Total + ' $');
  
  // formBill += '<tr>' +
  //   '<td style=\'vertical-align: top; padding-top: 18px;\' valign=\'top\' align=\'center\'>\n' +
  //   '<table border=\'0\' cellpadding=\'0\' cellspacing=\'0\' style=\'border-collapse: separate; mso-table-lspace: 0;\n' +
  //   'mso-table-rspace: 0; width: 100%; max-width: 400px;\'>\n' +
  //   '<tr><td style=\'font-family: sans-serif; font-size: 24px; color: #ffffff; text-align: left;\n' +
  //   'background-color: #234c87; padding-top: 20px; padding-bottom: 20px; padding-left: 32px;\n' +
  //   'padding-right: 10px\' valign=\'top\' align=\'left\'>Total</td>\n' +
  //   '<td style=\'font-family: sans-serif; font-size: 24px; color: #ffffff; text-align: right;\n' +
  //   'background-color: #234c87; padding-top: 20px; padding-bottom: 20px; padding-right: 32px;\'\n' +
  //   'valign=\'top\' align=\'right\'>' + Total + ' $</td></tr></table></td></tr>\n';


  }

// Calculate();

// let bill = $('.calculator__sidebar');

// function BillPosition() {
//   let width = $(document).width();
//   if (device.desktop()) {
//     if (width < 973) {
//       bill.insertBefore($('#card-form')).addClass('calculator__sidebar--block');
//     } else {
//       bill.appendTo($('.calculator__sidebar-wrap')).removeClass('calculator__sidebar--block');
//       Sidebar();
//     }
//   } else {
//     if (width < 990) {
//       bill.insertBefore($('#card-form')).addClass('calculator__sidebar--block');
//     } else {
//       bill.appendTo($('.calculator__sidebar-wrap')).removeClass('calculator__sidebar--block');
//       Sidebar();
//     }
//   }
// }

// BillPosition();

// $(window).on('resize', function () {
//   BillPosition();
// });

// //Submiting form
// let form = document.querySelector('.calculator-form');
// let formName = '.calculator-form';

// form.addEventListener('submit', function (e) {
//   submitForm(e, formName);
// });

//Send data to mail.php
// function submitForm(e, formName) {
//   e.preventDefault();
  
//   let email = $(formName + ' .js-field__email').val();
  
//   let formData = {
//     bill: formBill,
//     email: email
//   };
  
//   $.ajax({
//     type: 'POST',
//     url: 'vendor/calculator/calculator.php',
//     data: formData,
//     success: function () {
//       console.log('success');
//       $('.calculator__card-success').removeClass('hidden');
//     },
//     error: function () {
//       console.log('error');
//       //...
//     }
//   });
// }

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
