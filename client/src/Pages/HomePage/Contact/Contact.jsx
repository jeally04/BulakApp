import React from 'react'
import './Contact.css'
import messageicon from '../../../Assets/mail_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg'
import email_icon from '../../../Assets/mail_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg'
import call_icon from '../../../Assets/phone_in_talk_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg'
import location_icon from '../../../Assets/pin_drop_24dp_0000F5_FILL0_wght400_GRAD0_opsz24.svg'
import white_Arrow from '../../../Assets/arrow_forward_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg'

const Contact = () => {

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "63c04a58-a43e-471b-97a8-083374deb8b9");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  
  return (
    <div className='contact'>
      <div className="contact-col">
        <h3>Send Us a Message <img src={messageicon} alt="" /></h3>
        <p>Dear Valued User, <br></br>

Thank you for using BulakApp. If you have any questions, require assistance, or would like to share feedback, please feel free to reach out to us. We are committed to providing the best experience and are happy to assist you.</p>
        <ul>
          <li><img src={email_icon} alt="" />jealsotto@gmail.com</li>
          <li><img src={call_icon} alt="" />090909090909</li>
          <li><img src={location_icon} alt="" />Bohol Philippines</li>
        </ul>
      </div>
      <div className="contact-col">
        <form onSubmit={onSubmit}>
          <label>Your Name</label>
          <input type="text" name='name' placeholder='Enter your name' required/>
          <label>Phone Number</label>
          <input type="tel" name='phone' placeholder='Enter you phone number' required />
          <label>Write your message here</label>
          <textarea name="message" rows="6" placeholder='Enter your message' required></textarea>
          <button type='submit' className='btn1 dark-btn'>Submit Now! <img src={white_Arrow} alt="" /></button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  )
}

export default Contact