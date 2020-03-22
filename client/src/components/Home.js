import React from 'react' 
import Carousel from './Carousel'
import { Link, withRouter } from 'react-router-dom'
import Shrimp from './assets/Shrimp.png'
import Spagetti from './assets/Spagetti.png'
import Cookie from './assets/Cookie.png'


const Home = () =>{
    return(
        <div className= 'home'>
          <div className= 'title'> 
                <div className= 'img'>
                    <h1>Incredible Edibles</h1>
                </div>     
          </div>
          <div className='sub-title'>
            <h1>We Bring You The Best Tested Recipes</h1>
            <h2>From Our Kitchen To Yours</h2>
                <Carousel />
          </div> 
          <div className = 'category-container'>
           
                <div className= 'about-categories'>
                    <h1>Choose From Our</h1>
                </div>
                <div className= 'categories'>
                    <h2>Appetizers</h2>
                    <h2>Dinners</h2>
                    <h2>Desserts</h2>
                </div>
                <div className='link-container'> 
                    <Link to ='appetizers'><img src={Shrimp} alt='appetizers'/></Link>
                    <Link to ='dinner'><img src={Spagetti} alt='dinner'/></Link>
                    <Link to ='dessert'><img src={Cookie} alt='dessert'/></Link>
                </div> 
           
          </div> 
        </div>

    )
}

export default Home