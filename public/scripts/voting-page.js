$(function() {

  function ajaxVote(objectArray){
    $.ajax({
      url: '/polls/' + $('h2').data('pollid'),
      method: 'PUT',
      data: {data: objectArray},
      dataType: 'json',
      success: function(data) {
        if (typeof data.redirect == 'string'){
          window.location = data.redirect;
        }
      }
    });
  }
  //loop over object push into array
  $('#submitVote').click(function(event) {
    event.preventDefault();
    var length = $('li').length;
    let objectArray = [];
    $('li').each(function(index, value) {
      let option = {};
      option.option_id = $(value).data('id');
      option.rank = length - index;
      objectArray.push(option);
    });
    ajaxVote(objectArray);
  });

  $('.singleOption').on('mouseenter', (function() {
    $(this).find('.desc').removeClass('d-none');
  }));
  $('.singleOption').on('mouseleave', (function() {
    $(this).find('.desc').addClass('d-none');
  }));
});
