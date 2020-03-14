const express = require("express")
const User = require("../models/userSchema.js")
const router = ('express').Router()
const jwt = require("jsonwebtoken")

router.post("/signup", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error('that username is already taken'))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.toObject(),process.env.SECRET)
    
            return res.status(201).send({ user: savedUser, token})
        })
    })
})    
       
            
            // authRouter.post("/login", (req, res, next) => {
            //     User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
            //         if (err) {
            //             res.status(500)
            //             return next(err)
            //         }
            
            //         if (!user) {
            //             res.status(401)
            //             return next(new Error("Username or Password are incorrect"))
            //         }
            
            //         user.checkPassword(req.body.password, (err, isMatch) => {
            //             if (err) {
            //                 res.status(500)
            //                 return next(err)
            //             }
            
            //             if (!isMatch) {
            //                 res.status(401)
            //                 return next(new Error("Username or Password are incorrect"))
            //             }
            
            //             const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            //             return res.send({ token: token, user: user.withoutPassword(), success: true })
            //         })
            //     })
            
                       
module.exports = router