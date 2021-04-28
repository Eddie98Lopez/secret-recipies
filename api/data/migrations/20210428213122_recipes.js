
exports.up = async function(knex) {

    await knex.schema
        .createTable('categories', categories =>{
            categories.increments('category_id')
            categories.string('category_name').notNullable().unique()
        })
        .createTable('recipes', recipes => {
            recipes.increments('recipe_id')
            recipes.string('recipe_title',250).notNullable()
            recipes.string('recipe_instructions',1000).notNullable()
            recipes.string('recipe_source',250)
            recipes.integer('category_id')
                .unsigned()
                .notNullable()
                .references('category_id')
                .inTable('categories')
                .onDelete('RESTRICT')
            recipes.integer('user_id')
                .unsigned()
                .notNullable()
                .references('user_id')
                .inTable('users')
                .onDelete('RESTRICT')
        })
        .createTable('units', units => {
            units.increments('unit_id')
            units.string('unit_name').notNullable().unique()
        })
        .createTable('measurements', measurements => {
            measurements.increments('measurement_id')
            measurements.string('measurement_amount').notNullable().unique()
        })
        .createTable('ingredients', ingredients => {
            ingredients.increments('ingredient_id')
            ingredients.string('ingredient_name').notNullable().unique()
        })
        .createTable("recipe2ingredients", tbl =>{
            tbl.increments('r2i_id')
            tbl.integer('recipe_id').unsigned().notNullable().references('recipe_id').inTable('recipes').onDelete('RESTRICT')
            tbl.integer('measurement_id').unsigned().notNullable().references('measurement_id').inTable('measurements').onDelete('RESTRICT')
            tbl.integer('unit_id').unsigned().notNullable().references('unit_id').inTable('units').onDelete('RESTRICT')
            tbl.integer('ingredient_id').unsigned().notNullable().references('ingredient_id').inTable('ingredients').onDelete('RESTRICT')
        })
  
};

exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists('recipe2ingredients')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('measurements')
    .dropTableIfExists('units')
    .dropTableIfExists('recipes')
    .dropTableIfExists('categories')
  
};
