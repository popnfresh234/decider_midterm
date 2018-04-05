$(() => {

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });



  $('.createPoll').on('click',function(poll) {
  $('.poll-container').append(poll.title)
    options.forEach(function(option) {
      $('.poll-container').append("<p>" + option.title + "</p>");
      $('.poll-container').append("<p>" + option.description + "</p>");
    })
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


