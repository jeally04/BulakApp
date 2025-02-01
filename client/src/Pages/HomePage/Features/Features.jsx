import React from 'react'
import './Features.css'
import program1 from '../../../Assets/image recognition.jpg'
import program2 from '../../../Assets/exploreflowers.jpg'
import program3 from '../../../Assets/gardening.jpg'
import programIcon1 from '../../../Assets/local_library_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg'
import programIcon2 from '../../../Assets/psychology_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg'
import programIcon3 from '../../../Assets/school_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg'


const Programs = () => {
   return (
      <div className='programs'>
         <div className='program'>
            <img src={program1} alt="" />
            <div className="caption">
               <img src={programIcon1} alt="" />
               <p>Image Recognition</p>
            </div>
         </div>
         <div className='program'>
            <img src={program2} alt="" />
            <div className="caption">
               <img src={programIcon2} alt="" />
               <p>Explore Flowers</p>
            </div>
         </div>
         <div className='program'>
            <img src={program3} alt="" />
            <div className="caption">
               <img src={programIcon1} alt="" />
               <p>Plant Care Guides</p>
            </div>
         </div>
      </div>
   )
}

export default Programs