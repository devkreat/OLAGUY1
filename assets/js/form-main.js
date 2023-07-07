(function ($) {
  'use strict';
  jQuery(document).on('ready', function () {
    $('.phone-format').keypress(function (e) {
      if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
        return false;
      }
      var curchr = this.value.length;

      var curval = $(this).val();
      if (curchr == 3 && curval.indexOf('(') <= -1) {
        $(this).val('(' + curval + ')' + '-');
      } else if (curchr == 4 && curval.indexOf('(') > -1) {
        $(this).val(curval + ')-');
      } else if (curchr == 5 && curval.indexOf(')') > -1) {
        $(this).val(curval + '-');
      } else if (curchr == 9) {
        $(this).val(curval + '-');
        $(this).attr('maxlength', '14');
      }
    });

    $('.zipcode').keypress(function (e) {
      if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
        return false;
      }
      var curchr = this.value.length;
      if (curchr == 5) {
        $(this).attr('maxlength', '5');
      }
    });

    $('.ssn').keypress(function (e) {
      if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
      }

      var curchr1 = this.value.length;
      var curval1 = $(this).val();
      if (curchr1 == 3 && curval1.indexOf('-') <= -1) {
        $(this).val(curval1 + '-');
      } else if (curchr1 == 6) {
        $(this).val(curval1 + '-');
        $(this).attr('maxlength', '11');
      }
    });

    $('#post').on('change', () => {
      if ($('#post').val().trim() === '') {
        $('#post-div').html('&nbsp;Please select postion').css('color', 'red');
      } else {
        $('#post-div').html('');
      }
    });

    $('#hour').on('change', function () {
      if ($('#hour').val().trim() === '') {
        $('#hour-div').html('&nbsp;Please select hour').css('color', 'red');
      } else {
        $('#hour-div').html('');
      }
    });
  });
})(jQuery);
