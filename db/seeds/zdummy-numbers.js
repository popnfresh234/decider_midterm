exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return knex('phone')
    .then(function () {
      return Promise.all([
        knex('phone').insert({number: '4445556666', poll_id: 1}),
        knex('phone').insert({number: '6041231234', poll_id: 1}),
        knex('phone').insert({number: '1231230987', poll_id: 1}),
        knex('phone').insert({number: '1112223333', poll_id: 2}),
        knex('phone').insert({number: '6046046046', poll_id: 2}),
        knex('phone').insert({number: '6040604020', poll_id: 2}),
      ]);
    });
};
