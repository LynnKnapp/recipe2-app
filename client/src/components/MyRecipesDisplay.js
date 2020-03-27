import React, {Component} from 'react'
import axios from 'axios'
import {withUser} from '../context/UserProvider'
import MyRecipeList from './MyRecipesList'
import MyRecipeForm from './MyRecipeForm'


const recipeAxios = axios.create()

recipeAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class MyRecipesDisplay extends Component{
    constructor(props){
        super(props)
        this.state={
            name: "",
            author: "",
            description: "",
            imgUrl: '',
            ingredients: [],
            dietType: '',
            showForm: false,
            showRecipes: false,
            recipes: [],
           
            
        }
    }

    componentDidMount(){
        this.getRecipes()
        
    }

    toggleForm = () => {
       console.log("editbutton hit")
        return this.setState(prevState =>({
            showForm: !prevState.showForm
        }))
    }
    
    getRecipes = () =>{
        recipeAxios.get("/api/myrecipe")
            .then(res => {
                this.setState(prevState =>{
                    return {myRecipes: [...prevState.recipes, res.data]}
                })
            })
            .catch(err =>console.log(err))
    }

    handleChange = (e) =>{  
        const {name, value} = e.target
        this.setState({
            [name]: value
        }) 
    }

    handleSubmit = (e, imgUrl) =>{
        e.preventDefault()
        const { name, author, description, ingredients, dietType } = this.state
        const newRecipe = { name, author, description, imgUrl, ingredients, dietType }
        recipeAxios.post('/api/myrecipe', newRecipe)
        .then(res =>{
            this.setState(prevState =>({
                name: "",
                author: "",
                description: "",
                imgUrl: "",
                ingredients: "",
                dietType: "",
                recipes: [...prevState.recipes, ...res.data ],
            
            }))
        })
        .catch(err => console.log(err))
    }
    handleDelete = (id) =>{
    
        recipeAxios.delete(`api/myRecipe/${id}`)
            .then((res)=>{
                this.setState(prevState =>{
                    const filteredArr = prevState.recipes.filter(recipe =>{
                        return id = recipe._id
                    })
                    return{recipes: filteredArr}
                })
            })
    }

    handleEdit = (id, updates) => {
        recipeAxios.put(`api/myRecipe/${id}`, updates)
            .then(res => {
                this.setState(prevState => ({
                    recipes: prevState.recipes.map(recipe => recipe._id === id ? res.data : recipe)
                }))
            })
            .catch(err => console.log(err))
    }

render(){  
    return(
        <div className = 'myRecipe-container'>
            { !this.state.showForm ?
            <>    
                <div className ='myRecipes'>
                    <div className='header-container'>
                        <div className ='header'> 
                            <h1>My Recipes</h1> 
                        </div> 
                        <div className='button'>  
                            <button onClick={this.toggleForm}>Add Recipe</button>
                        </div> 
                    </div>   
                        <MyRecipeList 
                            recipes={this.state.recipes}
                            handleDelete={this.handleDelete}
                            handleEdit={this.handleEdit}
                        />   
                </div>
            </>
            :
            <>    
                <div className = 'add-edit'>  
                    <h2>Add a Favorite Recipe</h2>
                    <button onClick={this.toggleForm}>Back to My Recipes</button>
                    <MyRecipeForm
                            name ={this.state.name}
                            description={this.state.description}
                            author={this.state.author}
                            ingredients={this.state.ingredients}
                            dietType={this.state.dietType}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            handleEdit={this.handleEdit}
                            
                    />
                </div>
            </>
            }    
        </div>
    )
}
}


export default withUser(MyRecipesDisplay)