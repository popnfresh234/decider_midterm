$(() => {
  //loop over object push into array
  $('#submitVote').click(function(event) {
    event.preventDefault();
    var length = $('li').length
    let objectArray = [];
    $('li').each(function(index, value) {
      let singleOption = {};
      let id = ($(value).data('id'));
      let rank = ($(value).data('rank'));
      rank = rank + (length - index);
      singleOption.id = id;
      singleOption.rank = rank;
      objectArray.push(singleOption)
    })
    $.ajax({
      url: '/polls/' + $('h2').data('pollid') + '/result',
      method: 'PUT',
      data: objectArray,
      dataType: 'json',
      success: function() {

      }
    })
  })

  $('.singleOption').on('mouseenter', (function() {
    $(this).find('.desc').removeClass('d-none');
  }))
  $('.singleOption').on('mouseleave', (function() {
    $(this).find('.desc').addClass('d-none');
  }))
})
