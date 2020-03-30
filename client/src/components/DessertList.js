import React, {Component,useEffect, useState} from 'react'
import Dessert from './Dessert'
import axios from 'axios'

const recipeAxios = axios.create()


class DessertList extends React.Component{
    constructor(){
        super()
        this.state={
            desserts: []
        }
    }

    componentDidMount(){
        this.getDesserts()
        
    }

    getDesserts = () =>{
        recipeAxios.get('/recipe/dessert')
        .then(res => {
            this.setState(prevState =>{
                return {desserts: [...prevState.desserts, ...res.data]}
            })
        })
        .catch(err => console.log(err))
    }

    render(){
        const mappedDesserts = this.state.desserts.map(recipe =>{
            return <Dessert dessertArr={this.state.recipe} {...recipe} key={recipe._id}/>
        })
            return(
                <div className='ind-recipe'>
                    {mappedDesserts}
                </div>

            )
    }
}

export default DessertList


