import React from 'react'
import './Features.css'
import program1 from '../../../Assets/favoritesui.png'
import program2 from '../../../Assets/exploreui.png'
import program3 from '../../../Assets/historyui.png'
import { MdFavorite } from "react-icons/md";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaHistory } from "react-icons/fa";


const Programs = () => {
   return (
      <div className='programs'>
         <div className='program'>
            <img src={program1} alt="" />
            <div className="caption">
               <MdFavorite/>
               <p>Add to Favorites</p>
            </div>
         </div>
         <div className='program'>
            <img src={program2} alt="" />
            <div className="caption">
               <MdOutlineTravelExplore/>
               <p>Explore Flowers</p>
            </div>
         </div>
         <div className='program'>
            <img src={program3} alt="" />
            <div className="caption">
               <FaHistory/>
               <p>History</p>
            </div>
         </div>
      </div>
   )
}

export default Programs