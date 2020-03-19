import React, {Component} from 'react'
import AuthForm from './AuthForm.js'
import {  withUser } from '../../context/UserProvider.js'
import { Redirect } from 'react-router-dom'



class Auth extends Component {
    constructor(){
        super()
        this.state={
            username: '',
            password: '',
            toggle: false
        }
    }

    toggler = () => {
        this.setState(prevState => ({ toggle: !prevState.toggle}))
    }

    handleChange = e =>{
        const {name, value} = e.target
        this.setState({ [name]: value})
    }

    handleSignupSubmit = e => {
        e.preventDefault()
        const creds ={
            username: this.state.username,
            password: this.state.password
        }
        this.props.signup(creds)
    }

    handleLoginSubmit = e => {
        e.preventDefault()
        const creds ={
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(creds)
    }
    
    render(){
        console.log(this.props)
        if(this.props.token){
            return (<Redirect to='/' />)
        }
        
        return(
            <>
                { !this.state.toggle ? 
                   <div className='login'> 
                        <AuthForm
                            username= {this.state.username}
                            password={this.state.password}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSignupSubmit}
                            btnText='Sign Up'
                        />
                        <p style={{color: 'blue'}}>{this.props.authErrMsg} </p>
                        <button  className='toggler-btn' onClick={this.toggler}>Already have an account?</button>
                    </div>
                : 
                    <div className='signup'>
                        <AuthForm
                            username= {this.state.username}
                            password={this.state.password}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleLoginSubmit}
                            btnText='Login'
                        /> 
                        <button className='toggler-btn' onClick={this.toggler}> Sign-up for an account</button>
                        <p style={{color: 'red'}}>{this.props.authErrMsg} </p>
                    </div>
                }
            </>
        )
    }
}


export default withUser(Auth)
