const { checkAllFields } = require('./recipe_middleware')
const {getAll, getByFilter, getById, addNew, getRecipe } = require('./recipe_model')
const router = require('express').Router()


router.post('/', checkAllFields,async(req,res)=>{

    try{
        const recipe = await addNew('recipes',req.recipe)
            console.log('recipe object was added...waiting on ingredients')

        req.ingredients.forEach(async (ing) => {
            /*each "ing" object looks like this
            ing = {
                unit_id
                measurment
                ing_name
            }*/
            const newR2I = {
                measurement_id: '',
                unit_id: ing.unit_id,
                ingredient_id:'',
                recipe_id: recipe.recipe_id
            }

            const ingredient = await getByFilter('ingredients',{ingredient_name:ing.ing_name})
                if(!ingredient){
                   const newIng = await addNew('ingredients',{ingredient_name:ing.ing_name})
                   newR2I.ingredient_id = newIng.ingredient_id
                   console.log(`${newIng.ingredient_name} was added as an ingredient`)
                }
                else{
                    newR2I.ingredient_id = ingredient.ingredient_id
                    console.log(`${ingredient.ingredient_name} already exists so we are creating a new R2I combo with it for the new recipe`)
                }

            const measurement = await getByFilter('measurements', {measurement_amount: ing.measurement})
                if(!measurement){
                    const newMeas = await addNew('measurements',{measurement_amount:ing.measurement})
                    newR2I.measurement_id = newMeas.measurement_id
                    console.log(`A new measurement amount with the value of: "${newMeas.measurement_amount}" was created`)
                }
                else{
                    newR2I.measurement_id = measurement.measurement_amount
                    console.log(`measurement with value of: "${measurement.measurement_amount}" already exists. But using it to create new R2I combo`)
                }

                console.log(newR2I)

                const newCombo = await addNew('recipe2ingredients', newR2I)
                console.log(newCombo, `new combo was created `)

        })

        const wholeRecipe = await getRecipe(recipe.recipe_id)


        res.status(201).json(wholeRecipe)



    }
    catch(err){
        res.status(500).json(err)
    }



})

const recipe = {

    recipe: {

        recipe_title:'',
        recipe_source:'',
        recipe_instructions: '',
        category_id: '',
        user_id: ''
    },

    ingredients: [{
        unit_id:'',
        measurement: '',
        ingredient:''

    }],

}


module.exports = router