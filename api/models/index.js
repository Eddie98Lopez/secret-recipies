
const {getIngByFilter,getAllIng, getIngById, addIng} = require('./ingredients_model')

const {getMeasBF,getAllMeas, getMeasById, addMeas} = require('./measurements_model')

const {getRecipeBF,getRecipes, getRecipeById, addRecipe,updateRecipe,removeRecipe,recipeAndIngs} = require('./recipe_model')

const {getR2Ibf,getAllR2I, getR2IById, addR2I,getRecipeIngs, removeRecipeIngs} = require('./r2i_model')

 module.exports = {
    getIngByFilter,getAllIng, getIngById, addIng,
    getMeasBF,getAllMeas, getMeasById, addMeas,
    getRecipeBF,getRecipes, getRecipeById, addRecipe, getRecipeIngs, removeRecipeIngs, updateRecipe,removeRecipe,recipeAndIngs,
    getR2Ibf,getAllR2I, getR2IById, addR2I
 }
 
