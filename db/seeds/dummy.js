
exports.seed = function(knex, Promise) {

  return knex('poll')
    .then(function () {
      return Promise.all([
        knex('poll').insert({ptitle: 'What Movie?', email: 'email@email.com'}),
        knex('poll').insert({ptitle: 'What Food?', email: 'food@food.com'}),
      ]);
    });
};
