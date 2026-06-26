import React, { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import './Testimonials.css'
import user1 from '../../../Assets/pexels-pixabay-271889.jpg'
import user2 from '../../../Assets/pexels-wildanzainulfaki-3790492.jpg'
import user3 from '../../../Assets/pexels-pixabay-271889.jpg'
import user4 from '../../../Assets/pexels-rdne-7713176.jpg'

const testimonials = [
  {
    img: user1,
    name: "Maria Santos",
    role: "Event Stylist, Cebu",
    rating: 5,
    quote: "I scanned an entire arrangement at a client's venue and Bulak identified every single flower in one shot. It saved me so much time explaining the bouquet composition to my whole team.",
  },
  {
    img: user2,
    name: "Carlo Reyes",
    role: "Biology Student, BISU Bilar",
    rating: 5,
    quote: "The multi-flower detection is a lifesaver for fieldwork. I photographed a garden bed and got accurate IDs for six different species instantly. My plant taxonomy reports have never been this easy.",
  },
  {
    img: user3,
    name: "Ana Villanueva",
    role: "Wedding Coordinator",
    rating: 5,
    quote: "The event flower guide changed how I work with couples. It tells me exactly which blooms suit weddings versus birthdays or anniversaries. My clients love the personalized recommendations.",
  },
  {
    img: user4,
    name: "James Uy",
    role: "Gift Shop Owner, Tagbilaran",
    rating: 4,
    quote: "A customer sent a photo of flowers they wanted as a gift. I used Bulak to identify them and suggest in-season alternatives on the spot. It made the whole consultation feel effortless.",
  },
]

const Stars = ({ count }) => (
  <div className="t-stars">
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={15} strokeWidth={1.5} className={i < count ? 't-star-filled' : 't-star-empty'} />
    ))}
  </div>
)

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const total = testimonials.length

  const next = () => setCurrent(c => (c + 1) % total)
  const prev = () => setCurrent(c => (c - 1 + total) % total)

  return (
    <section className="t-section">
      <div className="t-slider">
        <button className="t-nav t-nav-prev" onClick={prev} aria-label="Previous testimonial">
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        <div className="t-track-outer">
          <ul
            className="t-track"
            style={{ transform: `translateX(-${current * 25}%)` }}
          >
            {testimonials.map((t, i) => (
              <li key={i} className="t-slide">
                <div className="t-card">
                  <div className="t-quote-mark">"</div>
                  <Stars count={t.rating} />
                  <p className="t-quote">{t.quote}</p>
                  <div className="t-user">
                    <img src={t.img} alt={t.name} className="t-avatar" />
                    <div className="t-user-info">
                      <h3 className="t-name">{t.name}</h3>
                      <span className="t-role">{t.role}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button className="t-nav t-nav-next" onClick={next} aria-label="Next testimonial">
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div className="t-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`t-dot ${i === current ? 't-dot-active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default Testimonials
