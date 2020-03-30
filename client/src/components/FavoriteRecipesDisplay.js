import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {withUser} from '../context/UserProvider'
import FavoriteRecipeList from './FavoriteRecipesList'
import FavoriteRecipeForm from './FavoriteRecipeForm'


const recipeAxios = axios.create()

recipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function FavoriteRecipesDisplay () {
    
    const [showRecipes, setShowRecipes] = useState(false)
    const [isToggled, setToggled] = useState(false)
    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [recipes, setRecipes] = useState([]) 
    const [values, setValues] = useState({})
    const [newRecipe, setNewRecipe] = useState({ name, author, description, imageAsUrl, ingredients, type })
        
    

    useEffect(() => {
        getRecipes()
        
    }, [])
        
    

    const toggleForm = () => setToggled(!isToggled);
        
       
        
    
    
    const getRecipes = () =>{
        recipeAxios.get("/api/favorites")
            .then(res => {
                setRecipes(prevRecipes =>{
                    return {favorites: [...prevRecipes, res.data]}
                })
            })
            .catch(err =>console.log(err))
    }

    const handleChange = (e) =>{
        setValues({...values, [e.target.name]: e.target.value})
     }

    const handleSubmit = (e, imgUrl) =>{
        e.preventDefault()
        recipeAxios.post('/api/favorites', newRecipe)
        .then(res =>{
            setNewRecipe(prevState =>({
                name: "",
                author: "",
                description: "",
                imageAsUrl: "",
                ingredients: "",
                type: "",
                recipes: [...prevState.recipes, ...res.data ]
            
            }))
        })
        .catch(err => console.log(err))
    }
    const handleDelete = (id) =>{
        recipeAxios.delete(`api/favorites/${id}`)
            .then((res)=>{
                setRecipes(prevState =>{
                    const filteredArr = prevState.recipes.filter(recipe =>{
                        return id = recipe._id
                    })
                    return{recipes: filteredArr}
                })
            })
    }

    const handleEdit = (id, updates) => {
        recipeAxios.put(`api/favorites/${id}`, updates)
            .then(res => {
                setRecipes(prevState => ({
                    recipes: prevState.recipes.map(recipe => recipe._id === id ? res.data : recipe)
                }))
            })
            .catch(err => console.log(err))
    }


    return(
        <div className = 'myRecipe-container'>
            { !showRecipes ?
            <>    
                <div className ='myRecipes'>
                    <div className='header-container'>
                        <div className ='header'> 
                            <h1>My Recipes</h1> 
                        </div> 
                        <div className='button'>  
                            <button onClick={toggleForm}>Add Recipe</button>
                        </div> 
                    </div>   
                        <FavoriteRecipeList 
                            myRecipes={recipes}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />   
                </div>
            </>
            :
            <>    
                <div className = 'add-edit'>  
                    <h2>Add a Favorite Recipe</h2>
                    <button onClick={toggleForm}>Back to My Recipes</button>
                    <FavoriteRecipeForm
                            name ={name}
                            description={description}
                            author={author}
                            ingredients={ingredients}
                            type={type}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            handleEdit={handleEdit}
                            
                    />
                </div>
            </>
            }    
        </div>
    )
}



export default withUser(FavoriteRecipesDisplay)