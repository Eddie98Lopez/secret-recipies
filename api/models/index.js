
const {getIngByFilter,getAllIng, getIngById, addIng} = require('./ingredients_model')

const {getMeasBF,getAllMeas, getMeasById, addMeas} = require('./measurements_model')

const {getRecipeBF,getRecipes, getRecipeById, addRecipe} = require('./recipe_model')

const {getR2Ibf,getAllR2I, getR2IById, addR2I} = require('./r2i_model')

 module.exports = {
    getIngByFilter,getAllIng, getIngById, addIng,
    getMeasBF,getAllMeas, getMeasById, addMeas,
    getRecipeBF,getRecipes, getRecipeById, addRecipe,
    getR2Ibf,getAllR2I, getR2IById, addR2I
 }
 
