import React from 'react'
import './About.css'
import about_img from '../../../Assets/ffflowers.jpg'
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
         <h2>Lorem ipsum dolor sit amet</h2>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo quas suscipit ab fugiat nisi possimus? Numquam accusantium praesentium vitae ipsam non maxime, quod sequi. Nobis unde magni fuga natus, magnam vitae ullam sapiente sequi, maiores repudiandae praesentium dolorum commodi. Dolorem maxime exercitationem obcaecati consectetur ducimus rerum nisi libero accusantium a.</p>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex corporis deserunt voluptatem vel consequatur ut ab autem ullam quisquam quidem! Fuga debitis repudiandae corrupti, et temporibus animi laboriosam maiores praesentium voluptatibus aspernatur quos, eaque qui in quia ullam exercitationem incidunt velit saepe? Consequuntur officia temporibus quis omnis deserunt totam labore.</p>
         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto ad laborum quas pariatur sunt quidem sint numquam consequuntur minus. Distinctio eius rem facere, quidem necessitatibus id nesciunt aut enim. Officiis, repellendus aspernatur? Quasi officiis provident hic in officia excepturi, fuga error itaque, illo laborum aut similique quae ad nobis consequuntur.</p>
    </div>
    </div>
  )
}

export default About