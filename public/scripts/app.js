$(() => {



  //Renders Poll Title Page
  $('#start').click(function(event){
    event.preventDefault();
    $('.home').addClass('d-none');
    $('.poll-title-page').removeClass('d-none');
  });
  //Renders Poll Options Page
  $('#nextStep').click(function(event){
    event.preventDefault();
    $('.poll-title-page').addClass('d-none');
    $('.poll-options-page').removeClass('d-none');
  });
    //Renders Created Poll Page
    $('#createPoll').click(function(event){
      event.preventDefault();
      var poll = {};
      var pollTitle = $('.poll-title').val();
      var email = $('.email').val();
      var optionArray = []
      console.log(email);
      $('li').each(function(index) {
        optionArray.push({title: $(this).find('.optionTitle').text(),
         description: $(this).find('.description').text()
       });
      })
      poll.ptitle = pollTitle;
      poll.email = email;
      poll.options = optionArray;
      console.log(poll);

      $.ajax({
        url: '/polls',
        method: 'POST',
        data: poll,
        dataType: 'json',
        success: function() {

        }
      });

      $('.poll-options-page').hide();
      $('.created-poll-page').removeClass('d-none');
    });

    $('.createPoll').on('click',function(poll) {
      $('.poll-container').append(poll.title)
      options.forEach(function(option) {
        $('.poll-container').append("<p id='optionTitle'>" + option.title + "</p>");
        $('.poll-container').append("<p id='optionDescription'>" + option.description + "</p>");
      })
    });

    $('#enterOption').click(function(event) {
      event.preventDefault();
      $('.poll-options').append('<li class="optionItem ui-state-default"><p class="optionTitle">' + $('.option').val() + '</p> <p class="description d-none">' + $('.description').val() + '</p><button class="delete">Delete</button></li>');
    });

    $('.poll-options-page').on('click', '.delete', (function(event){
      event.preventDefault();
      $(this).closest('li').remove();
    }));

    $('.poll-options-page').on('mouseenter', '.optionTitle', (function() {
      $('.description').removeClass('d-none');
    }));



  });

const poll = {

  "title": "What food?",
  "email": "bob@bob.bob",
  "options": [
  { "title": "Cheeseburger",
  "description": "Hot and cheesy",
  "rank": 0
},
{ "title": "Sushi",
"description": "Fresh and delicious",
"rank": 0
},
{ "title": "Pasta",
"description": "Yummy",
"rank": 0
}]
};

let options = poll.options;

