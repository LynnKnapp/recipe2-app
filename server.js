const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
const expressJwt = require("express-jwt")
require("dotenv").config()
const path = require("path")
const PORT = process.env.PORT || 6000

app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))


mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/recipedb',
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, () => console.log('connected to DB'))

app.use('/auth', require('./routes/authRouter.js'))
// app.use('/api', expressJwt({secret: process.env.SECRET}))
app.use('/recipes', require('./routes/recipeRouter.js')) 
// app.use('api/myrecipe', ('./routes/myrecipeRouter.js'))


app.use((err, req, res, next) =>{
    console.log(err)
    if(err.name === 'UnauthorizedError')
        res.status(err.status)
    return res.send({errMsg: err.message})
})   

app.get("*", (req ,res) =>{
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
});



app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})