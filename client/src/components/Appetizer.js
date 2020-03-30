import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {withUser} from '../context/UserProvider'

const myRecipeAxios = axios.create()

myRecipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function Appetizer (props) {
    // const [appetizers, setAppetizers] = useState([])
    // useEffect(() => {
    //     appetizerToMyRecipes(props._id)
    // }, [appetizers])
    
    // console.log(appetizers)
    const appetizerToMyRecipes = (_id) => {    
        myRecipeAxios.put(`/api/favorites/${_id}`)
        .then(res => { 
            // setAppetizers(prevAppetizers => (
            //      prevAppetizers.map(recipe => recipe._id === _id ? res.data : recipe)
            // ))
        })
        .catch(err => console.log(err))
    }

    const mappedIngredients = props.ingredients.map(ingredient =>{
        return <li>{ingredient}</li>
    })
        return(
            <div className='recipe-container'>
                    <div className='favorite-btn'>
                        <button onClick={() => appetizerToMyRecipes(props._id)}>Add to My Recipes</button>
                    </div>
                <img src={props.imgUrl} alt='recipe'/>
                <div className='info'>
                    <h1 className= 'text'>{props.name}</h1>
                    <h3 className= 'text'>{props.description}</h3>
                    <h4 className= 'text'>Author: {props.author}</h4>
                </div>
                <div className='ingredients'>  
                    <h5 className='ingredient-text'>Ingredients</h5>
                    <ul className= 'text'>{mappedIngredients}</ul>
                </div>
            </div>
        )
}

export default withUser(Appetizer)