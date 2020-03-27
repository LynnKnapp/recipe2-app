import React, {useEffect} from 'react'
import { BrowserRouter as Router } from "react-router"
import { useHistory} from "react-router-dom";
import axios from 'axios'

const myRecipeAxios= axios.create()

myRecipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})



function Appetizer (props) {
    
    const history = useHistory()
   
    
    
        // history.push('/api/myrecipe')
      

    const addToMyRecipes = (id, updates) => {    
        myRecipeAxios.put(`api/myrecipes/${props._id}`, updates)
                .then(res => {
                    this.setState(prevState => ({
                        recipes: prevState.recipes.map(recipe => recipe._id === id ? res.data : recipe)
                    }))
                    console.log(res.data)
                    
                })
                
                .catch(err => console.log(err))       
    }

    const mappedIngredients = props.ingredients.map(ingredient =>{
        return <li>{ingredient}</li>
    })
        return(
            <div className='recipe-container'>
                    <div className='favorite-btn'>
                        <button onClick={addToMyRecipes}>Add to My Recipes</button>
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

export default Appetizer