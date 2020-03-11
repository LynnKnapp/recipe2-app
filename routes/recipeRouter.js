const express = require("express")
const recipeRouter = express.Router()
const Recipe = require("../models/recipe")
// const User = require('../models/user')



recipeRouter.get('/', ( req,res, next) =>{
    Recipe.find((err, recipes)=>{
        if(err) {
            res.status(500)
            return next (err)
        }
        res.status(200).send(recipes) 
    })
})

recipeRouter.post("/", (req, res, next) =>{
    console.log('working')
    const newRecipe = new Recipe(req.body)
    newRecipe.save((err, newRecipe) =>{
        if(err) {
            res.status(500)
            return next(err) 
        }
        return res.status(201).send(newRecipe)
    })
})

recipeRouter.put("/:_id", (req,res, next)=>{
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

recipeRouter.delete("/:_id", (req, res, next)=>{
    Recipe.findOneAndRemove({_id: req.params._id},  (err, recipe)=>{
        if(err){
            res.status(500)
        }
        return res.status(200).send("sucessfully deleted")
    })
})

recipeRouter.get('/dinner', (req, res, next) =>{
    const query = {type: 'dinner'}
    const send = (err, resultsofFind) =>{
        if(err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(resultsofFind)
    }
    Recipe.find(query, send)
})

recipeRouter.get('/dessert', (req, res, next) => {
    const query = {type: 'dessert'}
    const send =(err, resultsofFind) =>{
        if(err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(resultsofFind)
    }
    Recipe.find(query, send)
})

recipeRouter.get('/appetizers', (req, res, next) => {
    Recipe.find((err, recipes) =>{
        if(err) {
            res.status(500)
            return next(err)
        } 
        res.status(200).send(recipes)
    })
})

recipeRouter.get('/myrecipe', (req, res, next) => {
    Recipe.find((err, recipes) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(recipes)
    })
})

recipeRouter.post("/myrecipe", (req, res, next) =>{
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

recipeRouter.put("/myrecipe/:_id", (req,res, next)=>{
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

recipeRouter.delete("/myrecipe/:_id", (req, res, next)=>{
    Recipe.findOneAndRemove({_id: req.params._id},  (err, recipe)=>{
        if(err){
            res.status(500)
        }
        return res.status(200).send("sucessfully deleted")
    })
})



module.exports = recipeRouter