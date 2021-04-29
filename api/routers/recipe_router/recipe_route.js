const { checkAllFields } = require('./recipe_middleware')
//const {getRecipe, addRecipe } = require('./recipe_model')
const {getIngByFilter, addIng, getMeasBF, addMeas, addR2I, addRecipe, getRecipeIngs, getRecipeById, getRecipes} = require('../../models')
const router = require('express').Router()


router.post('/', checkAllFields,async(req,res)=>{

    try{
        //console.log('trying post try')
        //console.log(req.recipe)
        const recipe = await addRecipe(req.recipe)
        //console.log(recipe.recipe_id)
        //console.log("trying to see if recipe was added")
            //console.log('recipe object was added...waiting on ingredients')

        req.ingredients.forEach(async (ing) => {

            //console.log('Made it to ingredients for each Loop')
          
            const newR2I = {
                measurement_id: '',
                unit_id: ing.unit_id,
                ingredient_id:'',
                recipe_id: recipe.recipe_id
            }

            const ingredient = await getIngByFilter({ingredient_name:ing.ingredient_name})
                if(!ingredient){
                   // console.log('ingredient doesnt exist')
                   const newIng = await addIng({ingredient_name:ing.ingredient_name})
                   newR2I.ingredient_id = newIng.ingredient_id
                   //console.log(`${newIng.ingredient_name} was added as an ingredient`)
                }
                else{
                    newR2I.ingredient_id = ingredient.ingredient_id
                    //console.log(`${ingredient.ingredient_name} already exists so we are creating a new R2I combo with it for the new recipe`)
                }
               // console.log('all new ingredients added')

            const measurement = await getMeasBF({measurement_amount: ing.measurement})
                if(!measurement){
                    const newMeas = await addMeas({measurement_amount:ing.measurement})
                    newR2I.measurement_id = newMeas.measurement_id
                    //console.log(`A new measurement amount with the value of: "${newMeas.measurement_amount}" was created`)
                }
                else{
                    newR2I.measurement_id = measurement.measurement_id
                    //console.log(`measurement with value of: "${measurement.measurement_amount}" already exists. But using it to create new R2I combo`)
                }

                //console.log(newR2I)

                const newCombo = await addR2I(newR2I)
                console.log(newCombo, `new combo was created `)

        })
        


        res.status(201).json(recipe)



    }
    catch(err){
        res.status(500).json(err)
    }



})

router.get('/', async(req,res)=>{
    try{
        const recipes = await getRecipes()
        res.status(200).json(recipes)
    }
    catch(err){
        res.status(500).json(err)
    }
})


router.get('/:id', async(req,res)=>{
    const recipeId = req.params.id
    try{

        const recipe = await getRecipeById(recipeId)
        console.log(recipe)
        const recipeIngs = await getRecipeIngs(recipeId)
        console.log(recipeIngs)

        res.status(200).json({recipe,ingredients: recipeIngs})



    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router