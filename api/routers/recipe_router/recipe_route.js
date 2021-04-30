const { checkAllFields } = require('./recipe_middleware')
//const {getRecipe, addRecipe } = require('./recipe_model')
const {getIngByFilter, removeRecipe,updateRecipe,addIng, getMeasBF, addMeas, addR2I, addRecipe, getRecipeIngs, getRecipeById, getRecipes, removeRecipeIngs} = require('../../models')

const router = require('express').Router()


router.post('/',checkAllFields,async(req,res)=>{

    try{
        
        const recipe = await addRecipe(req.recipe)
        
        req.ingredients.forEach(async (ing) => {

          
            const newR2I = {
                measurement_id: '',
                unit_id: ing.unit_id,
                ingredient_id:'',
                recipe_id: recipe.recipe_id
            }

            const ingredient = await getIngByFilter({ingredient_name:ing.ingredient_name})
                if(!ingredient){
                   const newIng = await addIng({ingredient_name:ing.ingredient_name})
                   newR2I.ingredient_id = newIng.ingredient_id
                }
                else{
                    newR2I.ingredient_id = ingredient.ingredient_id
                }
               

            const measurement = await getMeasBF({measurement_amount: ing.measurement})
                if(!measurement){
                    const newMeas = await addMeas({measurement_amount:ing.measurement})
                    newR2I.measurement_id = newMeas.measurement_id
                }
                else{
                    newR2I.measurement_id = measurement.measurement_id
                }


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
        const recipeIngs = await getRecipeIngs(recipeId)

        res.status(200).json({recipe,ingredients: recipeIngs})

    }
    catch(err){
        res.status(500).json(err)
    }
})

router.put('/:id',checkAllFields,async(req,res)=>{
    const id = req.params.id
    try{
        await removeRecipeIngs(id)
        await updateRecipe(id,req.recipe)

        req.ingredients.forEach(async (ing) => {

          
            const newR2I = {
                measurement_id: '',
                unit_id: ing.unit_id,
                ingredient_id:'',
                recipe_id: id
            }

            const ingredient = await getIngByFilter({ingredient_name:ing.ingredient_name})
                if(!ingredient){
                   const newIng = await addIng({ingredient_name:ing.ingredient_name})
                   newR2I.ingredient_id = newIng.ingredient_id
                }
                else{
                    newR2I.ingredient_id = ingredient.ingredient_id
                }
               

            const measurement = await getMeasBF({measurement_amount: ing.measurement})
                if(!measurement){
                    const newMeas = await addMeas({measurement_amount:ing.measurement})
                    newR2I.measurement_id = newMeas.measurement_id
                }
                else{
                    newR2I.measurement_id = measurement.measurement_id
                }


                const newCombo = await addR2I(newR2I)
                console.log(newCombo, `new combo was created `)

        })

        const recipe = getRecipeById(id)
        const ingredients = getRecipeIngs(id)

        res.status(200).json({...recipe,ingredients})

    }
    catch(err){
        res.status(500).json(err.message)
    }

})

router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    try{
        const deletedIngs = await removeRecipeIngs(id)
        const deletedRecipe = await removeRecipe(id)

        res.status(200).json({...deletedRecipe,deletedIngs})
    }
    catch(err){
        res.status(500).json(err.message)
    }

})

module.exports = router