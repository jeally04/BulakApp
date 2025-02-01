import React from 'react'
import './Top.css'

import { BsArrowRightShort } from "react-icons/bs";

import flower from '../../../Assets/flowerr.png'
import video from '../../../Assets/Flowers - Video Background HD 1080p.mp4'

const Top = () => {
  return (
    <div className="topSection">
      

      <div className="cardSection flex">
        <div className="rightCard flex">
          <h1>Know extraordinary Flowers</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>

          <div className="buttons flex">
            <button className="btn">Explore More!</button>
            <button className="btn transparent">Top Favorite</button>
          </div>

          <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>
          </div>
        </div>

        <div className="leftCard flex">
          <div className="main flex">
            <div className="textDiv">
              <h1>My Stat</h1>

              <div className="flex">
                <span>
                  Today <br /> <small>4 Flowers</small>
                </span>

                <span>
                  This Month <br /> <small>44 Flowers</small>
                </span>
              </div>

              <span className="flex link">
                Go to my Flowers <BsArrowRightShort className="icon"/>
              </span>
            </div>

            <div className="imgDiv">
              <img src={flower} alt="Image" />
            </div> 


          </div>
        </div>
      </div>
    </div>
  )
}

export default Top