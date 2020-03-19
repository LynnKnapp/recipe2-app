import React from 'react'

const AuthForm = props =>{
    const {username, password, handleChange, handleSubmit, btnText} = props
        return(
            <div className= 'auth-form'>
                <form className ='form' onSubmit ={handleSubmit}>
                    <input 
                    type='text' 
                    name='username' 
                    value={username}
                    onChange={handleChange} 
                    placeholder='Username'/>
                    <input className = 'input'
                    type='text'
                    name='password' 
                    value={password} 
                    onChange={handleChange}
                    placeholder='Password'/>
                    <button className = 'btn'>{btnText}</button>
                </form>
            </div>
        )
}

export default AuthForm