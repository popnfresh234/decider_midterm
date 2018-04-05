
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return knex('option')
    .then(function () {
      return Promise.all([
        knex('option').insert({title: 'The Avengers', description: 'Action', poll_id: 1}),
        knex('option').insert({title: 'The Titanic', description: 'Drama', poll_id: 1}),
        knex('option').insert({title: 'Pulp Fiction', description: 'Crime', poll_id: 1}),
        knex('option').insert({title: 'Sushi', description: 'Japanese', poll_id: 2}),
        knex('option').insert({title: 'Pasta', description: 'Italian', poll_id: 2}),
        knex('option').insert({title: 'Dim Sum', description: 'Chinese', poll_id: 2}),
      ]);
    });
};
