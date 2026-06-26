import React from 'react'
import './Top.css'

import { BsArrowRightShort } from "react-icons/bs";
import { MdLocalFlorist, MdCameraAlt } from "react-icons/md";

import flower from '../../../Assets/flowerr.png'
import video from '../../../Assets/Flowers - Video Background HD 1080p.mp4'

const Top = () => {
  return (
    <div className="topSection">
      <div className="cardSection flex">

        {/* Hero / Video Card */}
        <div className="rightCard flex">
          <div className="videoDiv">
            <video src={video} autoPlay muted loop></video>
          </div>
          <div className="overlay" aria-hidden="true"></div>

          <div className="heroContent">
            <h1>Know Extraordinary Flowers</h1>
            <p>Snap a photo of any flower and instantly discover its name, care tips, and more.</p>

            <div className="buttons flex">
              <button className="btn solid">
                <MdCameraAlt className="btnIcon" /> Explore More
              </button>
              <button className="btn outline">
                <MdLocalFlorist className="btnIcon" /> Top Favorites
              </button>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="leftCard flex">
          <div className="main flex">
            <div className="textDiv">
              <h1>My Stats</h1>

              <div className="statsRow flex">
                <div className="statItem">
                  <span className="statLabel">Today</span>
                  <span className="statValue">4 Flowers</span>
                </div>
                <div className="statItem">
                  <span className="statLabel">This Month</span>
                  <span className="statValue">44 Flowers</span>
                </div>
              </div>

              <span className="flex link">
                Go to my Flowers <BsArrowRightShort className="icon" />
              </span>
            </div>

            <div className="imgDiv">
              <img src={flower} alt="Flower illustration" />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Top
