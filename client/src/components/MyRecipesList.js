import React, {useState, useEffect} from 'react'
import axios from 'axios'
import MyRecipe from './MyRecipe'


const recipeAxios = axios.create()

recipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const MyRecipeList = (props) => {

    const [myRecipes, setMyRecipe] = useState([])
    
    useEffect(() => {
        recipeAxios.get("/api/myrecipe")
            .then(res => {
                setMyRecipe(prevState =>{
                    return {myRecipes: [...prevState.recipes, res.data]}
                })
            })
            .catch(err =>console.log(err))
    })
    const mappedRecipes = props.recipes.map(recipe => {
        return      <MyRecipe
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

export default MyRecipeList