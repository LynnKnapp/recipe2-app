import React from 'react' 
import Carousel from './Carousel'


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
        </div>

    )
}

export default Home