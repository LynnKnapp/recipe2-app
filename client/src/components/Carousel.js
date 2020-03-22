import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {FaArrowAltCircleLeft, FaArrowAltCircleRight  } from "react-icons/fa";

class Carousel extends React.Component {
    render() {
        return (
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={50}
                totalSlides={10}
                isPlaying= {true}
                className="carousel"
                infinite={true}>
                
                <Slider>
                    <Slide index={0}><Image src="https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="Cute Dog Peeking over Ledge"/></Slide>
                    <Slide index={1}><Image src="https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="Cute Dog Peeking over Ledge"/></Slide>
                    <Slide index={2}><Image src="https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="Cute Dog Peeking over Ledge"/></Slide>
                    <Slide index={3}><Image src="https://images.pexels.com/photos/326875/pexels-photo-326875.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="Cute Dog Peeking over Ledge"/></Slide>
                    <Slide index={4}><Image src="https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="Cute Dog Peeking over Ledge"/></Slide>
                    <Slide index={5}><Image src="https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="Cute Dog Peeking over Ledge"/></Slide>
                    <Slide index={6}><Image src="https://live.staticflickr.com/809/27007426068_a160f24115_b.jpg" alt="Black Lab"/></Slide>
                    <Slide index={7}><Image src="https://images.pexels.com/photos/669015/pexels-photo-669015.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="Cat"/></Slide>
                    <Slide index={8}><Image src="https://images.pexels.com/photos/731022/pexels-photo-731022.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="Dog"/></Slide>
                    <Slide index={9}><Image src="https://images.pexels.com/photos/96938/pexels-photo-96938.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="Cat"/></Slide>
                </Slider>
                
                <div className="carouselBtns">
                    <ButtonBack><FaArrowAltCircleLeft /></ButtonBack>
                    <ButtonNext><FaArrowAltCircleRight /></ButtonNext>
                </div>
            </CarouselProvider>
        )
    }
    
}
export default Carousel