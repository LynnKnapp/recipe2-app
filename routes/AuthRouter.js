const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')



authRouter.post('/signup', (req, res, next)=>{
    User.findOne({username: req.body.username.toLowerCase()}, (err, user)=>{
        if(err){
            res.status(500)
            return next (err)   
        }if(user !== null){
            res.status(400)
            return next(new Error("username is already taken"))
        }
        const newUser = new User(req.body)

        newUser.save((err, savedUser)=>{
            if (err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign({user: savedUser.toObject()}, process.env.SECRET)
            return res.status(201).send({user: savedUser.toObject(), token})
        })
    })
    
})


authRouter.post("/login", (req, res, next)  => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(401)
            return next(new Error("Username or Password is not correct!"))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            res.status(401)
            if(!isMatch){
                 res.status(401)
                 return next(new Error("username or password is incorrect"))
            } else {
                const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
                return res.send({ token: token, user: user.without.Password(), sucess: true})
            }
        })
    })
})


module.exports = authRouter