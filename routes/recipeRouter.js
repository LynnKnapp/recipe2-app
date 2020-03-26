const express = require("express")
const recipeRouter = express.Router()
const Recipe = require("../models/recipe")



recipeRouter.get('/', ( req,res, next) =>{
    Recipe.find((err, recipes)=>{
        if(err) {
            res.status(500)
            return next (err)
        }
        res.status(200).send(recipes) 
    })
})


recipeRouter.get('/appetizer', ( req,res, next) =>{
    const query = { type: "appetizer" }
    const send = (err, resultsOfFind) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(resultsOfFind)
    }
    
    Recipe.find(query, send)
})
recipeRouter.post("/appetizer", (req, res, next) =>{
    const newRecipe = new Recipe(req.body)
    newRecipe.save((err, newRecipe) =>{
        if(err) {
            res.status(500)
            return next(err) 
        }
        return res.status(201).send(newRecipe)
    })
})

recipeRouter.put("/appetizer/:_id", (req,res, next)=>{
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

recipeRouter.delete("/appetizer/:_id", (req, res, next)=>{
    Recipe.findOneAndRemove({_id: req.params._id},  (err, recipe)=>{
        if(err){
            res.status(500)
        }
        return res.status(200).send("sucessfully deleted")
    })
})

recipeRouter.get('/dinner', ( req,res, next) =>{
    const query = { type: 'dinner' }
    const send = (err, resultsOfFind) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(resultsOfFind)
    }
    
    Recipe.find(query, send)

})

recipeRouter.post("/dinner", (req, res, next) =>{
    console.log('working')
    const newRecipe = new Recipe(req.body)
    // newRecipe.user = req.user._id
    newRecipe.save((err, newRecipe) =>{
        if(err) {
            res.status(500)
            return next(err) 
        }
        return res.status(201).send(newRecipe)
    })
})

recipeRouter.put("/dinner/:_id", (req,res, next)=>{
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

recipeRouter.delete("/dinner/:_id", (req, res, next)=>{
    Recipe.findOneAndRemove({_id: req.params._id},  (err, recipe)=>{
        if(err){
            res.status(500)
        }
        return res.status(200).send("sucessfully deleted")
    })
})


recipeRouter.get('/dessert', ( req,res, next) =>{
    const query = { type: "dessert" }
    const send = (err, resultsOfFind) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(resultsOfFind)
    }
    
    Recipe.find(query, send)
})

recipeRouter.post("/dessert", (req, res, next) =>{
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

recipeRouter.put("/dessert/:_id", (req,res, next)=>{
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

recipeRouter.delete("/dessert/:_id", (req, res, next)=>{
    Recipe.findOneAndRemove({_id: req.params._id},  (err, recipe)=>{
        if(err){
            res.status(500)
        }
        return res.status(200).send("sucessfully deleted")
    })
})







module.exports = recipeRouter