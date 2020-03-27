import React, {Component} from 'react'
import axios from 'axios'


const UserContext = React.createContext()
const myRecipeAxios = axios.create()
const userAxios = axios.create()

userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

class UserProvider extends Component {
    constructor() {
        super()
        this.state={
            user: JSON.parse(localStorage.getItem('user')) || {},
            token: localStorage.getItem('token') || "",
            authErrMsg: "",
            myRecipes: []
            
        }
    }
    appetizerToMyRecipes = (_id) => {    
        myRecipeAxios.put(`/recipe/appetizer/${_id}`)
        .then(res => { 
            this.setState(prevState => ({
                myRecipes: prevState.recipes.map(recipe => recipe._id === _id ? res.data : recipe)
            }))
        })
        .catch(err => console.log(err))
    }

    dinnerToMyRecipes = (_id) => {    
        myRecipeAxios.put(`/recipe/dinner/${_id}`)
        .then(res => { 
            this.setState(prevState => ({
                myRecipes: prevState.recipes.map(recipe => recipe._id === _id ? res.data : recipe)
            }))
        })
        .catch(err => console.log(err))
    }

    dessertsToMyRecipes = (_id) => {    
        myRecipeAxios.put(`/recipe/dessert/${_id}`)
        .then(res => { 
            this.setState(prevState => ({
                myRecipes: prevState.recipes.map(recipe => recipe._id === _id ? res.data : recipe)
            }))
        })
        .catch(err => console.log(err))
    }


      
    signup = credentials => {
        axios.post('/auth/signup', credentials)
            .then(res => {
                const {user, token } = res.data //res.data comes from return res.status(201).send({token, user: savedUser})
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('token', token)
                this.setState(prevState => ({
                        user: user,
                        token: token,
                        authErrMsg: ''
                    }) 
                )
            })
            .catch( err => this.handleAuthErr(err.response.data.errMsg))

    }
   
    
    login = credentials  =>{
        console.log('cred:', credentials)
        axios.post('/auth/login', credentials)
            .then(res => {
                console.log('response: ', res.data)
                const {user, token } = res.data //res.data comes from return res.status(201).send({token, user: savedUser})
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                this.setState(prevState => ({
                        ...prevState,
                        user: user,
                        token: token,
                        authErrMsg: ''
                    }) 
                )
                })    
            .catch( err => this.handleAuthErr(err.response.data.errMsg))

    }

    handleAuthErr = errMsg => {
        alert(errMsg)
        this.setState(prevState =>({
            ...prevState,
            authErrMsg: errMsg
        }))
    }

    clearAuthErr = () => {
        this.setState(prevState => ({
            ...prevState,
            authErrMsg: ""
        }))
    }

    logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.setState({
            user: {},
            token: '',
            authErrMsg: ''
        })
        console.log("you are logged out")
    }

    render(){
        return(
            <UserContext.Provider
                value={{
                    ...this.state,
                    signup: this.signup,
                    login: this.login,
                    logout: this.logout,
                    handleAuthErr: this.handleAuthErr,
                    clearAuthErr: this.clearAuthErr

                }}>
                { this.props.children }
            </UserContext.Provider>    
        )
    }
}

export default UserProvider

export const withUser = C => props => (
    <UserContext.Consumer>
        { value => <C {...value} {...props}/> }
    </UserContext.Consumer>
)
 