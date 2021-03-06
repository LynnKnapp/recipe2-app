const express = require("express")
const favoritesRouter = express.Router()
const Recipe = require("../models/recipe")
const User = require('../models/user.js')


// myRecipeRouter.get('/api/myrecipe', (req, res, next) => {
//     Recipe.find((err, recipes) => {
//         if(err) {
//             res.status(500)
//             return next(err)
//         }
//         res.status(200).send(recipes)
//     })
// })

favoritesRouter.get('/', async (req, res, next) => {
    try {
        // Get the updated user object ( so we have their updated array of favorites )
        const user = await User.findOne({_id: req.user._id}) 
        const favoriteRecipes = await Recipe.find({_id: {$in: user.favorites}})
        return res.status(200).send(favoriteRecipes)
    }
    catch(err){
        res.status(500)
        return next(err)
    }
})

//get one
favoritesRouter.get("/", (req,res, next)=>{
    Recipe.findOne(
        {_id: req.user._id}, 
        
    ).populate('favorites').exec((err, user)=>{
        if(err) {
            res.status(500)
            return next(err)
        }
    
        return res.status(201).send(user.favorites)
    })

})

favoritesRouter.post("/", (req, res, next) =>{
    console.log('working')
    const newRecipe = new Recipe(req.body)
    newRecipe.user = req.user._id
    newRecipe.save((err, newRecipe) =>{
        if(err) {
            res.status(500)
            return next(err) 
        }
        return res.status(201).send(newRecipe)
    })
})

favoritesRouter.put("/:_id", (req,res, next)=>{
    User.findOneAndUpdate(
        {_id: req.user._id}, 
        { $push: { favorites: req.params._id } }, 
        {new: true}, 
        (err, user)=>{
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(user)
    })

})

favoritesRouter.delete("/:_id", (req, res, next)=>{
    Recipe.findOneAndRemove({_id: req.params._id},  (err, recipe)=>{
        if(err){
            res.status(500)
        }
        return res.status(200).send("sucessfully deleted")
    })
})

module.exports = favoritesRouter