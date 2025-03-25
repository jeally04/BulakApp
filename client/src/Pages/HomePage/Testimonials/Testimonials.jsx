import React, { useRef } from 'react'
import './Testimonials.css'
import next_icon from '../../../Assets/arrow_forward_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg'
import back_icon from '../../../Assets/arrow_back_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg'
import user1 from '../../../Assets/pexels-pixabay-271889.jpg'
import user2 from '../../../Assets/pexels-wildanzainulfaki-3790492.jpg'
import user3 from '../../../Assets/pexels-pixabay-271889.jpg'
import user4 from '../../../Assets/pexels-rdne-7713176.jpg'


const Testimonials = () => {

   const slider = useRef();
   let tx = 0;

   
   const slideForward = ()=>{
      if(tx > -50){
         tx -= 25;
      }
      slider.current.style.transform = `translateX(${tx}%)`;
   }

   const slideBackward = ()=>{
      if(tx < 0){
         tx += 25;
      }
      slider.current.style.transform = `translateX(${tx}%)`;
   }

  return (
    <div className='testimonials'>
      <img src={next_icon} alt="" className='next-btn' onClick={slideForward}/>
      <img src={back_icon} alt="" className='back-btn' onClick={slideBackward}/>
      <div className="slider">
         <ul ref={slider}>
            <li>
               <div className="slide">
                  <div className="user-info">
                     <img src={user1} alt="" />
                     <div>
                        <h3>John Doe</h3>
                        <span>BISU Bilar</span>
                     </div>
                  </div>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae inventore aut officiis! Repellat tempora molestiae, eum non molestias doloremque eos, ducimus, dolorum aperiam incidunt consectetur corrupti mollitia suscipit voluptates vero.</p>
               </div>
            </li>
            <li>
               <div className="slide">
                  <div className="user-info">
                     <img src={user2} alt="" />
                     <div>
                        <h3>Elly Smith</h3>
                        <span>BISU Bilar</span>
                     </div>
                  </div>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae inventore aut officiis! Repellat tempora molestiae, eum non molestias doloremque eos, ducimus, dolorum aperiam incidunt consectetur corrupti mollitia suscipit voluptates vero.</p>
               </div>
            </li>
            <li>
               <div className="slide">
                  <div className="user-info">
                     <img src={user3} alt="" />
                     <div>
                        <h3>Richard Lee</h3>
                        <span>BISU Bilar</span>
                     </div>
                  </div>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae inventore aut officiis! Repellat tempora molestiae, eum non molestias doloremque eos, ducimus, dolorum aperiam incidunt consectetur corrupti mollitia suscipit voluptates vero.</p>
               </div>
            </li>
            <li>
               <div className="slide">
                  <div className="user-info">
                     <img src={user4} alt="" />
                     <div>
                        <h3>Rose Kim</h3>
                        <span>BISU Bilar</span>
                     </div>
                  </div>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae inventore aut officiis! Repellat tempora molestiae, eum non molestias doloremque eos, ducimus, dolorum aperiam incidunt consectetur corrupti mollitia suscipit voluptates vero.</p>
               </div>
            </li>
         </ul>
      </div>
    </div>
  )
}

export default Testimonials