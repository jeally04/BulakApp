import React from 'react'
import './Listing.css'
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";


import img1 from '../../../Assets/Bougainvilleapng.png'
import img2 from '../../../Assets/rosepng.png'
import img3 from '../../../Assets/marigoldpng.png'
import img4 from '../../../Assets/daisypng.png'

import user1 from '../../../Assets/Bougainvilleapng.png'
import user2 from '../../../Assets/rosepng.png'
import user3 from '../../../Assets/marigoldpng.png'
import user4 from '../../../Assets/daisypng.png'



const Listing = () => {
  return (
    <div className="listingSection">
      <div className="heading flex">
        <h1>My Listings</h1>
        <button className="btn flex">
          See all <BsArrowRightShort className='icon'/>
        </button>
      </div>

      <div className="secContainer flex">
        <div className="singleItem">
          <AiFillHeart className='icon'/>
          <img src={img1} alt="list image" />
          <h3>Bougainvillea</h3>
        </div>
      

        <div className="singleItem">
          <AiFillHeart className='icon'/>
          <img src={img2} alt="list image" />
          <h3>Rose</h3>
        </div>
      

        <div className="singleItem">
          <AiOutlineHeart className='icon'/>
          <img src={img3} alt="list image" />
          <h3>Marigold</h3>
        </div>

        <div className="singleItem">
          <AiOutlineHeart className='icon'/>
          <img src={img4} alt="list image" />
          <h3>Daisy</h3>
        </div>

      </div>

      <div className="seller flex">
        <div className="topSeller">
          <div className="heading flex">
            <h3>Top Searched</h3>
            <button className="btn flex">
              See all <BsArrowRightShort className='icon'/>
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={user1} alt="user image" />
              <img src={user2} alt="user image" />
              <img src={user3} alt="user image" />
              <img src={user4} alt="user image" />
            </div>
            <div className="cardText">
              <span>
                  556 Flower searched <br />
                <small>
                  111 users <span className='date'>7 days </span>
                </small>
              </span>
            </div>
          </div>
        </div>

        <div className="featuredSellers">
          <div className="heading flex">
            <h3>Featured Flowers</h3>
            <button className="btn flex">
              See all <BsArrowRightShort className='icon'/>
            </button>
          </div>

          <div className="card flex">
            <div className="users">
              <img src={user1} alt="user image" />
              <img src={user2} alt="user image" />
              <img src={user3} alt="user image" />
              <img src={user4} alt="user image" />
            </div>
            <div className="cardText">
              <span>
                1, 556 Flowers <br />
                <small>
                  91 users visited <span className='date'>31 days </span>
                </small>
              </span>
            </div>
          </div>
        </div>


      </div>
  
    </div>
  )
}

export default Listing