import React from 'react'

function contacts() {
    return (


  <div className="overlay pt-100 pb-100 ">
    
    <div className="container">
      <div className="row">
        <div className="col-lg-6 d-flex align-items-center">
          
          
          
          
          
          
          
          <div className="contact-info1">

            
            <h2 className="contact-title">Have Any Questions?</h2>
            <p>Got something on your mind? Don't hesitate to ask!
Whether it's about smashing sixes, coding cool projects, or gaming thrills, I'm all ears.
Cricket, tech, or just a random thought—let’s talk!
Drop your question, and let’s keep the conversation going!</p>
            
            <div className="box">

        <div className="about-imageContent1">
        <ul className="contact-info">
              <li>
                <div className="info-left">
                  <i className="fas fa-mobile-alt" />
                </div>
                <div className="info-right">
                  <h4>+11223344550</h4>
                </div>
              </li>
              <li>
                <div className="info-left">
                  <i className="fas fa-at" />
                </div>
                <div className="info-right">
                  <h4>info@example.com</h4>
                </div>
              </li>
              <li>
                <div className="info-left">
                  <i className="fas fa-map-marker-alt" />
                </div>
                <div className="info-right">
                  <h4>1243 Stree New Chandigarh, INDIA</h4>
                </div>
              </li>
            </ul>

        <div className="aboutImg-textBox">
          <i className="bx bx-heart heart-icon flex" />
          <p className="content-description" style={{ color: "black" }} > "I really love Cricklytics. The stats are very accurate!"</p>
        </div>
      </div>





      </div>
            
           
          </div>
        </div>
        <div className="col-lg-6 d-flex align-items-center">
          <div className="contact-form">
            {/*Contact Form*/}
            <form id="contact-form" method="POST"><input type="hidden" name="form-name" defaultValue="contactForm" />
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <input type="text" name="name" className="form-control" id="first-name" placeholder="Enter Your Name *" required="required" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input type="email" name="email" className="form-control" id="email" placeholder="Enter Your Email *" required="required" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea rows={4} name="message" className="form-control" id="description" placeholder="Enter Your Message *" required="required" defaultValue={""} />
                  </div>
                </div>
                <div className="col-md-12">
                  {/*contact button*/}
                  <button className="button">
                    Send Us 
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>


)
}

export default contacts;