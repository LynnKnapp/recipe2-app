import React, {useState} from 'react'
import axios from 'axios'



const recipeAxios = axios.create()

recipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

function FavoriteRecipe (props) { 
    
          const[showRecipes, setShowRecipes]= useState(false)
          const[name, setName] = useState(props.name)
          const[author, setAuthor] = useState(props.author)
          const[description, setDescription] = useState(props.description)
          const[imageAsUrl, setImageAsUrl] = useState(props.imgUrl)
          const[ingredients, setIngredients] = useState([props.ingredients])
          const[type, setType] = useState(props.type)
          const[values, setValues] = useState({})
        
    

    const editToggler = () => {
        
        setShowRecipes(prevshowRecipes =>({
            showRecipes: !prevshowRecipes.showRecipes
        }))
    }

    const handleChange = (e) =>{
       setValues({...values, [e.target.name]: e.target.value})
    }

    const handleIngredientsChange = (e) => {
        const {value} = e.target
        const updatedIngredientsArr = value.split(",")
        setIngredients({
            ingredients: updatedIngredientsArr
        })
    }
    
    const handleSubmit = e =>{
        e.preventDefault()
        const updateObj = {
            name: name,
            author:author,
            description: description,
            imageAsUrl: imageAsUrl,
            ingredients: ingredients,
            type: type,
        }
            props.handleEdit(this.props._id, updateObj)
    }    

    
        const mappedIngredients = ingredients.map(ingredient =>{
            return <li key={ingredient}>{ingredient}</li>
        })
        return (
            <div className='recipe-container'>
                {!showRecipes ?
                <>    
                    <img src={props.imgUrl} alt='recipe'/>
                    <div className='info'>
                        <h1>{props.name}</h1>
                        <h3>{props.description}</h3>
                        <h4>{props.author}</h4>
                    </div>
                    <div className='ingredient-container'>
                        <h4>Ingredients</h4>
                        <ul>{mappedIngredients}</ul>
                    </div>
                    <div className='buttons'>
                        <button onClick={editToggler} 
                           >
                            Edit Recipe</button>
                        / <button onClick={props.toggleForm}>Add Recipe</button> 
                        <button onClick={ ()=> props.handleDelete(props._id)}>Delete Recipe</button>
        
                    </div> 
                </> 
                :
                <>
                <div className='recipeform-container'>
                    <form className= 'recipe-form' onSubmit={handleSubmit}>
                        RecipeName<input
                            type='text'
                            value={name}
                            onChange={handleChange}
                            placeholder='Recipe Name'
                            name='name'/> 
                        Author<input
                            type='text'
                            value={author}
                            onChange={handleChange}
                            placeholder='Author'
                            name='author'/> 
                        Description<input
                            type='text'
                            value={description}
                            onChange={handleChange}
                            placeholder='Description'
                            name='description'/>
                        Ingredients<input
                            type='text'
                            value={ingredients}
                            onChange={handleIngredientsChange}
                            placeholder='Ingredients'
                            name='ingredients'/>
                        Diet Type<select name='dietType' value={type} onChange={handleChange}>
                            <option placeholder= 'Diet Type'>Diet Type</option>    
                            <option value="appetizer">Appetizer</option>
                            <option value="dinner">Dinner</option>
                            <option value="dessert">Dessert</option>
                        </select>
                    <button>Submit</button> 
                    </form>
                </div>
                </>
                }
            </div>
        )
       
}


export default FavoriteRecipe