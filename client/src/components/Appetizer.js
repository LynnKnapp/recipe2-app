import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {withUser} from '../context/UserProvider'

const myRecipeAxios = axios.create()
function Appetizer (props) {

    useEffect(() => {
        appetizerToMyRecipes()
    })
    const appetizerToMyRecipes = (_id) => {    
        myRecipeAxios.put(`/recipe/appetizer/${_id}`)
        .then(res => { 
            this.setState(prevState => ({
                myRecipes: prevState.recipes.map(recipe => recipe._id === _id ? res.data : recipe)
            }))
        })
        .catch(err => console.log(err))
    }

    const mappedIngredients = props.ingredients.map(ingredient =>{
        return <li>{ingredient}</li>
    })
        return(
            <div className='recipe-container'>
                    <div className='favorite-btn'>
                        <button onClick={appetizerToMyRecipes}>Add to My Recipes</button>
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