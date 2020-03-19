import React from 'react'
import {Switch, Route} from 'react-router-dom'
import {withUser} from './context/UserProvider'
import Navbar from './components/Navbar.js'
import Home from './components/Home.js'
import AppetizersDisplay from './components/AppetizerDisplay'
import DinnerDisplay from './components/DinnerDisplay'
import DessertsDisplay from './components/DessertsDisplay'
import MyRecipesDisplay from './components/MyRecipesDisplay'
import Auth from './components/Auth/Auth'


const App = (props) =>{

    const {token, logout} = props
        
        return(
            <div className= 'app'> 
       
                <Navbar token ={token} logout ={logout}/>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/appetizers' component={AppetizersDisplay}/>
                        <Route path='/dinner' component={DinnerDisplay}/>
                        <Route path='/desserts' component={DessertsDisplay}/> 
                        <Route path='/myrecipes' component={MyRecipesDisplay} />
                        <Route exact path = "/register" render={rProps => <Auth {...rProps}/>}
                        />
                </Switch>             
            </div>
        ) 
    
}
export default withUser(App)