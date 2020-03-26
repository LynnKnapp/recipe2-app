import React, {useState, useEffect} from 'react'
import Dinner from './Dinner'
import axios from 'axios'

const recipeAxios = axios.create()

class DinnerList extends React.Component{
    constructor(){
        super()
        this.state={
            dinners: []
        }
    }

    componentDidMount(){
        this.getDinners()
        
    }

    getDinners = () =>{
        recipeAxios.get('/recipe/dinner')
        .then(res => {
            this.setState(prevState =>{
                return {dinners: [...prevState.dinners, ...res.data]}
            })
        })
        .catch(err => console.log(err))
    }

    render(){
        const mappedDinners = this.state.dinners.map(recipe =>{
            return <Dinner dinnerArr={this.state.recipe} {...recipe} key={recipe._id}/>
        })
            return(
                <div className='ind-recipe'>
                    {mappedDinners}
                </div>

            )
    }
}



export default DinnerList
