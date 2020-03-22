import React, {useState, useEffect}from 'react'
import axios from 'axios'
import Appetizer from './Appetizer'

const recipeAxios = axios.create()

function AppetizerList (props) {

    const [appetizers, setAppetizers] = useState([])
   

    useEffect(() => {
        recipeAxios.get('/recipe/appetizers')
        .then(res => setAppetizers(prevAppetizers =>([
            ...prevAppetizers, ...res.data
        ])))
        .catch(err => console.log(err))
               
    }, [])
    const mappedAppetizers = appetizers.map(recipe =>{
        return <Appetizer appetizerArr={recipe} {...recipe} key={recipe._id} />
    })
    return(
        <div>
            {mappedAppetizers}
        </div>
    )
}

export default AppetizerList