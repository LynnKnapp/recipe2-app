import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FavoriteRecipe from './FavoriteRecipe'


const recipeAxios = axios.create()

recipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const FavoriteRecipeList = (props) => {

    const [myRecipes, setMyRecipe] = useState([])
    useEffect(() => {
        recipeAxios.get("/api/favorites")
        .then(res => {
            setMyRecipe(prevmyRecipes =>{
                return  [...prevmyRecipes, res.data]
            })
        })
        .catch(err =>console.log(err))
    }, [])
    console.log(myRecipes)
    
    const mappedRecipes = myRecipes.map(recipe => {
        return      <FavoriteRecipe
                        key={recipe._id}
                        {...recipe}
                        _id={recipe._id}
                        user={recipe.user}
                        handleEdit={props.handleEdit}
                        handleDelete={props.handleDelete}
                    />
   })  

    return(
        <div className ='mapped-recipes'>
                {mappedRecipes} 
            </div>
    )
}

export default FavoriteRecipeList