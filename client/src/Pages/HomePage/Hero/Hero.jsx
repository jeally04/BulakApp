import React from 'react'
import './Hero.css'
import dark_arrow from '../../../Assets/arrow_forward_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg'

const Hero = () => {
   return (
      <div className='hero container1'>
         <div className='hero-text'>
            <h1>BulakApp: Real-Time Flower Detection</h1>
            <p>BulakApp uses advanced AI technology to instantly identify and classify flowers. Simply upload or scan a photo, and explore detailed information about each flower species, from origins to care tips, all in real-time.</p>
            <button className='btn1'>Explore more <img src={dark_arrow} alt="" /></button>
         </div>
      </div>
   )
}

export default Hero