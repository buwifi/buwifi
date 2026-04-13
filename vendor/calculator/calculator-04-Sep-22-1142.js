'use strict';

let Sum = 0, PI = 1, MI = 1, Total = 0;

let number_AP       = 1;
let price_BuWiFi    = 25;

//sidebar sections
let page = $('#page');
let plus = $('#plus');
let multiple = $('#multiple');
let newChoose;

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

function getValues()
{
  number_AP = parseInt($('#numberAP').val());

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

  Calculate();
}

function Calculate() {
  
  Total = number_AP * price_BuWiFi;
  Total = Math.round(Total * 100) / 100;
  Bill();
}

function Bill()
{
  $('.calculator__bill').remove();
  $('#number-AP').text(number_AP + ' AP x ');
  $('#buwifi-price').text(number_AP * price_BuWiFi + ' $');


	$('.page-input input:checked').each(function ()
  {
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

  $('#numberAP').change(function()
  {

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
