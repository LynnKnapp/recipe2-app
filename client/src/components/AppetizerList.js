import React, {useState, useEffect}from 'react'
import axios from 'axios'
import Appetizer from './Appetizer'

const recipeAxios = axios.create()

class AppetizerList extends React.Component{
    constructor(){
        super()
        this.state={
            appetizers: []
        }
    }

    componentDidMount(){
        this.getAppetizers()
        
    }

    getAppetizers = () =>{
        recipeAxios.get('/recipe/appetizer')
        .then(res => {
            this.setState(prevState =>{
                return {appetizers: [...prevState.appetizers, ...res.data]}
            })
        })
        .catch(err => console.log(err))
    }

    render(){
        const mappedAppetizers = this.state.appetizers.map(recipe =>{
            return <Appetizer appetizerArr={this.state.recipe} {...recipe} key={recipe._id}/>
        })
            return(
                <div className='ind-recipe'>
                    {mappedAppetizers}
                </div>

            )
    }
}

export default AppetizerList

// function AppetizerList () {

//     const [appetizers, setAppetizers] = useState([])
   

//     useEffect(() => {
//         recipeAxios.get('/recipe/appetizers')
       
//         .then(res => setAppetizers(prevAppetizers =>([
//             ...prevAppetizers, ...res.data
//         ])))
//         .catch(err => console.log(err))
               
//     }, [])
//     const mappedAppetizers = appetizers.map(recipe =>{
//         return <Appetizer appetizerArr={recipe} {...recipe} key={recipe._id} />
//     })
//     return(
//         <div>
//             {mappedAppetizers}
//         </div>
//     )
// }

// export default AppetizerList