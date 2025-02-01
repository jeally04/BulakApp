import React from 'react'
import './activity.css'

import { BsArrowRightShort } from "react-icons/bs";
import user3 from '../../../Assets/mikha.jpg'


const Activity = () => {
  return (
    <div className="activitySection">
      <div className="heading flex">
        <h1>Recent Activity</h1>
        <button className="btn flex">
          See All <BsArrowRightShort className='icon'/>
        </button>
      </div>

      <div className="secContainer grid">

        <div className="singleCustomer flex">
          <img src={user3} alt="Customer Image" />
          
          <div className="customerDetails">
            <span className="name">You</span>
            <small>Searched a rose flower</small>
          </div>

          <div className="duration">
            2 mins ago
          </div>
        </div>

        <div className="singleCustomer flex">
          <img src={user3} alt="Customer Image" />
          
          <div className="customerDetails">
            <span className="name">You</span>
            <small>Searched a gumamela flower</small>
          </div>

          <div className="duration">
            6 mins ago
          </div>
        </div>

        <div className="singleCustomer flex">
          <img src={user3} alt="Customer Image" />
          
          <div className="customerDetails">
            <span className="name">You</span>
            <small>Searched a santan flower</small>
          </div>

          <div className="duration">
            21 mins ago
          </div>
        </div>

        <div className="singleCustomer flex">
          <img src={user3} alt="Customer Image" />
          
          <div className="customerDetails">
            <span className="name">You</span>
            <small>Scanned a rose flower</small>
          </div>

          <div className="duration">
            43 mins ago
          </div>
        </div>

        <div className="singleCustomer flex">
          <img src={user3} alt="Customer Image" />
          
          <div className="customerDetails">
            <span className="name">You</span>
            <small>Scanned a rose flower</small>
          </div>

          <div className="duration">
            43 mins ago
          </div>
        </div>


        <div className="singleCustomer flex">
          <img src={user3} alt="Customer Image" />
          
          <div className="customerDetails">
            <span className="name">You</span>
            <small>Scanned a rose flower</small>
          </div>

          <div className="duration">
            43 mins ago
          </div>
        </div>


        <div className="singleCustomer flex">
          <img src={user3} alt="Customer Image" />
          
          <div className="customerDetails">
            <span className="name">You</span>
            <small>Scanned a rose flower</small>
          </div>

          <div className="duration">
            43 mins ago
          </div>
        </div>


        <div className="singleCustomer flex">
          <img src={user3} alt="Customer Image" />
          
          <div className="customerDetails">
            <span className="name">You</span>
            <small>Scanned a rose flower</small>
          </div>

          <div className="duration">
            43 mins ago
          </div>
        </div>


        <div className="singleCustomer flex">
          <img src={user3} alt="Customer Image" />
          
          <div className="customerDetails">
            <span className="name">You</span>
            <small>Scanned a rose flower</small>
          </div>

          <div className="duration">
            43 mins ago
          </div>
        </div>


        <div className="singleCustomer flex">
          <img src={user3} alt="Customer Image" />
          
          <div className="customerDetails">
            <span className="name">You</span>
            <small>Scanned a rose flower</small>
          </div>

          <div className="duration">
            43 mins ago
          </div>
        </div>


        <div className="singleCustomer flex">
          <img src={user3} alt="Customer Image" />
          
          <div className="customerDetails">
            <span className="name">You</span>
            <small>Scanned a rose flower</small>
          </div>

          <div className="duration">
            43 mins ago
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity