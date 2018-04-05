$(() => {

  $('#delete').on('click', function(){

  })

  $('#start').on('click'), function(event){
    event.preventDefault();
    console.log("Start button");
    $('.home').hide();
    $('.poll-title-page').removeClass('.d-none');
  }

  $('.createPoll').on('click',function(poll) {
  $('.poll-container').append(poll.title)
    options.forEach(function(option) {
      $('.poll-container').append("<p id='optionTitle'>" + option.title + "</p>");
      $('.poll-container').append("<p id='optionDescription'>" + option.description + "</p>");
    })
  });

  $('#optionTitle').hover(function() {
    $('#optionDescription').slideToggle();
  });



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


