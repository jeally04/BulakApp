import React from 'react'
import './Hero.css'
import dark_arrow from '../../../Assets/arrow_forward_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg'

const Hero = () => {
   return (
      <div className='hero container1'>
         <div className='hero-text'>
            <h1>BulakApp: Real-Time Flower Detection</h1>
            <p>BulakApp uses advanced AI technology for instant flower identification and classification. Whether you upload an image, scan a photo, or use live detection via video streaming, BulakApp provides real-time insights. Explore detailed information about each flower species.</p>
            <button className='btn1'>Explore more <img src={dark_arrow} alt="" /></button>
         </div>
      </div>
   )
}

export default Hero