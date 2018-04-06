$(() => {
  //loop over object push into array
  $('#submitVote').click(function(event) {
    event.preventDefault();
    var length = $('li').length;
    console.log("LENGTH", length);
    let objectArray = [];
    $('li').each(function(index, value) {
      let singleOption = {};
      let id = ($(value).data('id'));
      let rank = length - index;
      singleOption.option_id = id;
      singleOption.rank = rank;
      objectArray.push(singleOption);
    });

    console.log(objectArray);
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
  });

  $('.singleOption').on('mouseenter', (function() {
    $(this).find('.desc').removeClass('d-none');
  }));
  $('.singleOption').on('mouseleave', (function() {
    $(this).find('.desc').addClass('d-none');
  }));
});
