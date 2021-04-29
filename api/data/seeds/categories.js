
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {category_name: 'breakfast'},
        {category_name: 'brunch'},
        {category_name: 'lunch'},
        {category_name: 'dinner'},
        {category_name: 'dessert'},
        {category_name: 'snack'},
        {category_name: 'appetizer'},
        {category_name: 'drink'},
        {category_name: 'alcoholic beverage'},

      ]);
    });
};
