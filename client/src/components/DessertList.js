import React, {Component,useEffect, useState} from 'react'
import Dessert from './Dessert'
import axios from 'axios'

const recipeAxios = axios.create()


function DessertList () {

   const [desserts, setDesserts] = useState([])
   console.log(desserts)

    
    

    
     useEffect(() => {
         recipeAxios.get('/recipes/dessert')
         .then(res => setDesserts(prevDesserts => ([ 
             ...prevDesserts, ...res.data
         ])))
         .catch(err => console.log(err))
   
    }, [])     
    
        
            return(
                <div className='ind-recipe'>
                {desserts.map(dessert => <h1>{dessert.name}</h1>)}
                </div>

            )
           
}


export default DessertList