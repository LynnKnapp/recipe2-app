import React from 'react'
import axios from 'axios'


const myRecipeAxios= axios.create()

myRecipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class Dinner extends React.Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        this.addToMyRecipes()
    }

    addToMyRecipes = (id) => {    
        myRecipeAxios.put(`api/myrecipe/${this.props._id}`)
            .then(res => {
                this.setState(prevState => ({
                    recipes: prevState.recipes.map(recipe => recipe._id === id ? res.data : recipe)
                }))
                console.log(res.data.favorites)
            })
            .catch(err => console.log(err))
            
    }


    render(){
        const mappedIngredients = this.props.ingredients.map(ingredient =>{
            return <li>{ingredient}</li>
        })
        return(
            <div className='recipe-container'>
                    <div className='favorite-btn'>
                        <button onClick={this.addToMyRecipes}>Add to My Recipes</button>
                    </div>
                <img src={this.props.imgUrl} alt='recipe'/>
                <div className='info'>
                    <h1 className= 'text'>{this.props.name}</h1>
                    <h3 className= 'text'>{this.props.description}</h3>
                    <h4 className= 'text'>Author: {this.props.author}</h4>
                </div>
                <div className='ingredients'>  
                    <h5 className='ingredient-text'>Ingredients</h5>
                    <ul className= 'text'>{mappedIngredients}</ul>
                </div>
            </div>
        )
    }
}

export default Dinner