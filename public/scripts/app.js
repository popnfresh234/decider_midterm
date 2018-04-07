$(() => {

  function makeAjaxPush(poll){
    $.ajax({
      url: '/polls',
      method: 'POST',
      data: poll,
      dataType: 'json',
      success: function(data) {
        if (typeof data.redirect == 'string'){
          window.location = data.redirect;
        }
      }
    });
  }

  function buildOptionArray(){
    var optionArray = [];
    $('li').each(function(index) {
      optionArray.push({title: $(this).find('.optionTitle').text(),
       description: $(this).find('.description').text()
     });
    });
    return optionArray;
  }


  //Renders Poll Title Page
  $('#start').click(function(event){
    event.preventDefault();

    if ($('.email').val() === '') {
      $.flash('Please enter an email.');
    } else {

      $('.home').addClass('d-none');
      $('.poll-title-page').removeClass('d-none');
    }
  });
  //Renders Poll Options Page
  $('#nextStep').click(function(event){
    event.preventDefault();
    if ($('.poll-title').val() === '') {
      $.flash('Please enter a poll title.')
    } else {

      $('.poll-title-page').addClass('d-none');
      $('.poll-options-page').removeClass('d-none');
    }
  });

    //Renders Created Poll Page
    $('#createPoll').click(function(event){
      event.preventDefault();

      var email = $('.email').val();
      var pollTitle = $('.poll-title').val();


      //Create poll
      var poll = {};
      poll.email = email;
      poll.ptitle = pollTitle;
      poll.options = buildOptionArray();

      makeAjaxPush(poll);

      $('.poll-options-page').hide();

    });

    $('.createPoll').on('click',function(poll) {
      $('.poll-container').append(poll.title);
      options.forEach(function(option) {
        $('.poll-container').append("<p id='optionTitle'>" + option.title + "</p>");
        $('.poll-container').append("<p id='optionDescription'>" + option.description + "</p>");
      });
    });

    $('#enterOption').click(function(event) {
      event.preventDefault();
      var optionTitle = $('.option').val();
      if (optionTitle === '') {
        $.flash('Please enter an option title.')
      }else {
        $('.poll-options').append('<li class="optionItem"><p class="optionTitle">' + $('.option').val() + '</p> <p class="description d-none">' + $('.description').val() + '</p><button class="delete">Delete</button></li>');
      }
    });

    $('.poll-options-page')
    .on('click', '.delete', (function(event){
      event.preventDefault();
      $(this).closest('li').remove();
    }))
    .on('mouseenter', '.optionItem', (function() {
      $(this).find('.description').removeClass('d-none');
    }))
    .on('mouseleave', '.optionItem', function() {
      $(this).find('.description').addClass('d-none');
    })
    ;
  });

let options = poll.options;

