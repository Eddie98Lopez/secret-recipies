
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('units').del()
    .then(function () {
      // Inserts seed entries
      return knex('units').insert([
        {unit_name: 'oz'},
        {unit_name: 'tsp'},
        {unit_name: 'tbsp'},
        {unit_name: 'cups'},
        {unit_name: 'whole'},
        {unit_name: 'cans'},

      ]);
    });
};
