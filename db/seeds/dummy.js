
exports.seed = function(knex, Promise) {

  return knex('poll')
    .then(function () {
      return Promise.all([
        knex('poll').insert({title: 'What Movie?', email: 'email@email.com'}),
        knex('poll').insert({title: 'What Food?', email: 'food@food.com'}),
      ]);
    });
};
