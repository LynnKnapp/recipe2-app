const express = require("express")
const myRecipeRouter = express.Router()
const Recipe = require("../models/recipe")
const User = require('../models/user')

myRecipeRouter.get('/myrecipe', (req, res, next) => {
    Recipe.find((err, recipes) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(recipes)
    })
})

myRecipeRouter.post("/myrecipe", (req, res, next) =>{
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

myRecipeRouter.put("/myrecipe/:_id", (req,res, next)=>{
    Recipe.findOneAndUpdate(
        {_id: req.params._id}, 
        req.body, 
        {new: true}, 
        (err, recipe)=>{
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(recipe)
    })

})

myRecipeRouter.delete("/myrecipe/:_id", (req, res, next)=>{
    Recipe.findOneAndRemove({_id: req.params._id},  (err, recipe)=>{
        if(err){
            res.status(500)
        }
        return res.status(200).send("sucessfully deleted")
    })
})

module.exports = myRecipeRouter