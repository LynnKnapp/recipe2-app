const express = require("express")
const myRecipeRouter = express.Router()
const Recipe = require("../models/recipe")


myRecipeRouter.get('/api/myrecipe', (req, res, next) => {
    Recipe.find((err, recipes) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        res.status(200).send(recipes)
    })
})
//get one
myRecipeRouter.get("/appetizer", (req,res, next)=>{
    Recipe.findOne(
        {_id: req.user._id}, 
        
    ).populate('myrecipe').exec((err, user)=>{
        if(err) {
            res.status(500)
            return next(err)
        }
    
        return res.status(201).send(user.favorites)
    })

})

myRecipeRouter.post("/", (req, res, next) =>{
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

myRecipeRouter.put("/api/myrecipe/:_id", (req,res, next)=>{
    Recipe.findOneAndUpdate(
        {_id: req.user._id}, 
        { $push: { favorites: req.params._id } }, 
        {new: true}, 
        (err, recipe)=>{
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(recipe)
    })

})

myRecipeRouter.delete("/:_id", (req, res, next)=>{
    Recipe.findOneAndRemove({_id: req.params._id},  (err, recipe)=>{
        if(err){
            res.status(500)
        }
        return res.status(200).send("sucessfully deleted")
    })
})

module.exports = myRecipeRouter