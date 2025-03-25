import React from 'react'
import './About.css'
import about_img from '../../../Assets/sample.png'
import play_icon from '../../../Assets/play_circle_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg'

const About = ({setPlayState}) => {
  return (
    <div className='about'>
      <div className="about-left">
         <img src={about_img} alt="" className='about-img'/>
         <img src={play_icon} alt="" className='play-icon' onClick={()=>{setPlayState(true)}}/>
      </div>
      <div className="about-right">
         <h3>ABOUT BulakApp</h3>
         <h2>A Web-Based Flower Detection and Classification System Using YOLOv8</h2>
         <p>       BulakApp is a real-time, web-based flower detection and classification system powered by YOLOv8, designed to identify multiple flower species from live video streams or images. Existing flower identification methods often struggle with real-world complexities, such as overlapping petals, occlusions, and varied lighting conditions, limiting their practicality in dynamic environments. Unlike traditional models that typically focus on single-flower detection, BulakApp addresses this research gap by enabling real-time multi-flower recognition with improved accuracy and efficiency. </p>
    </div>
    </div>
  )
}

export default About