import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'

function Navbar (props) {

const [isToggled, setisToggled] = useState(false)

const toggleTrueFalse = () => setisToggled(!isToggled)

const {token, logout} = props
    return(
        <div className='menu-container'>
           <button className='menu' onClick={toggleTrueFalse}>Menu/Sign-in</button> 
        
        <div style={{visibility: (isToggled ? "" : "hidden")}} className="nav-container">
            <div className='nav' onClick ={toggleTrueFalse}>
                <Link className ={props.location.pathname === "/" ? "active" : ""}
                to="/">Home</Link>
                <Link className={props.location.pathname === "/appetizers" ? "active" : ""}
                to="/appetizers">Appetizer Recipes</Link>
                <Link className={props.location.pathname === "/dinner" ? "active" : ""}
                to="/dinner">Dinner Recipes</Link>
                <Link className={props.location.pathname === "/dessert" ? "active" : ""}
                to="/dessert">Dessert Recipes</Link>
                <Link className={props.location.pathname === "/myrecipe" ? "active" : ""}
                to="myrecipes">My Recipes</Link>
                <Link className={props.location.pathname === "/register" ? "active" : ""}
                to="register">SignIn / Register</Link>
                {token !== "" && <button onClick = {logout}>Logout</button>}
            </div>
        </div>
        </div>
    )
}

export default withRouter(Navbar)