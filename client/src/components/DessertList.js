import React, {Component,useEffect, useState} from 'react'
import Dessert from './Dessert'
import axios from 'axios'

const recipeAxios = axios.create()

class DessertList extends Component{
    constructor(){
        super()
        this.state={
            desserts: []
        }
    }

    componentDidMount(){
        this.getDessertRecipes()
        
    }

    getDessertRecipes = () =>{
        recipeAxios.get('/recipes/dessert')
        .then(res => {
            this.setState(prevState =>{
                return {desserts: [...prevState.desserts, ...res.data]}
            })
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    render(){
        const mappedDesserts = this.state.desserts.map(recipe =>{
            return <Dessert healthyArr={this.state.recipe} {...recipe} key={recipe._id}/>
        })
            return(
                <div className='ind-recipe'>
                    {mappedDesserts}
                </div>

            )
    }
}

export default DessertList