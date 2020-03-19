import React from 'react'
import ReactDOM from "react-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/UserProvider'
import "./styles.css"




ReactDOM.render(
    <BrowserRouter>  
        <UserProvider>
                <App/>
        </UserProvider>
    </BrowserRouter> ,
    document.getElementById('root'))

