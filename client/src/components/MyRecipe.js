import React, {Component} from 'react'
import axios from 'axios'



const recipeAxios = axios.create()

recipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class MyRecipe extends Component{ 
    constructor(props){
        super(props)
        this.state={
            showRecipes:false,
            name: props.name,
            author: props.author,
            description: props.description,
            imageAsUrl: props.imgUrl,
            ingredients: props.ingredients,
            dietType: props.dietType,
        }
    }

    editToggler = () => {
        console.log('edit Toggler')
        return this.setState(prevState =>({
            showRecipes: !prevState.showRecipes
        }))
    }

    handleChange = (e) =>{
        const {name, value} = e.target
        this.setState({
            [name]: value
        }) 
    }

    handleIngredientsChange = (e) => {
        const {value} = e.target
        const updatedIngredientsArr = value.split(",")
        this.setState({
            ingredients: updatedIngredientsArr
        })
    }
    
    handleSubmit = e =>{
        e.preventDefault()
        const { name, author, description, imgUrl, ingredients, dietType } = this.state
        const updateObj = {
            name: name,
            author:author,
            description: description,
            imgUrl: imgUrl,
            ingredients: ingredients,
            dietType: dietType,
        }
            this.props.handleEdit(this.props._id, updateObj)
    }    

    render(){
        const mappedIngredients = this.state.ingredients.map(ingredient =>{
            return <li key={ingredient}>{ingredient}</li>
        })
        return (
            <div className='recipe-container'>
                {!this.state.showRecipes ?
                <>    
                    <img src={this.props.imgUrl} alt='recipe'/>
                    <div className='info'>
                        <h1>{this.props.name}</h1>
                        <h3>{this.props.description}</h3>
                        <h4>{this.props.author}</h4>
                    </div>
                    <div className='ingredient-container'>
                        <h4>Ingredients</h4>
                        <ul>{mappedIngredients}</ul>
                    </div>
                    <div className='buttons'>
                        <button onClick={this.editToggler} 
                           >
                            Edit Recipe</button>
                        / <button onClick={this.props.toggleForm}>Add Recipe</button> 
                        <button onClick={ ()=> this.props.handleDelete(this.props._id)}>Delete Recipe</button>
        
                    </div> 
                </> 
                :
                <>
                <div className='recipeform-container'>
                    <form className= 'recipe-form' onSubmit={this.handleSubmit}>
                        RecipeName<input
                            type='text'
                            value={this.state.name}
                            onChange={this.handleChange}
                            placeholder='Recipe Name'
                            name='name'/> 
                        Author<input
                            type='text'
                            value={this.state.author}
                            onChange={this.handleChange}
                            placeholder='Author'
                            name='author'/> 
                        Description<input
                            type='text'
                            value={this.state.description}
                            onChange={this.handleChange}
                            placeholder='Description'
                            name='description'/>
                        Ingredients<input
                            type='text'
                            value={this.state.ingredients}
                            onChange={this.handleIngredientsChange}
                            placeholder='Ingredients'
                            name='ingredients'/>
                        Diet Type<select name='dietType' value={this.state.dietType} onChange={this.handleChange}>
                            <option placeholder= 'Diet Type'>Diet Type</option>    
                            <option value="Healthy">Healthy</option>
                            <option value="Indulgent">Indulgent</option>
                        </select>
                    <button>Submit</button> 
                    </form>
                </div>
                </>
                }
            </div>
        )
    }    
}


export default MyRecipe