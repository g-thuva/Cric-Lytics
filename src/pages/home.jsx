import React from 'react'
import homeImg2 from "./images/homeImg2.jpg";
import aboutImg from "./images/aboutImg.jpg";
import menuImg1 from "./images/menuImg1.png";
import brandImg1 from "./images/brandImg1.png";
import brandImg2 from "./images/brandImg2.png";
import brandImg3 from "./images/brandImg3.png";
import brandImg4 from "./images/brandImg4.png";
import brandImg5 from "./images/brandImg5.png";
import logo1 from "./images/logo1.png";



function home() {
  
  return (
   <div ><main>
  <section className="home" id="home">
    
            { <img src={homeImg2} alt="homeImg2" className="home-img" /> }
            
            <div className="home-details">
              <div className="home-text">
                <h4 className="homeSubtitle">Cricklytics:</h4>
                <h2 className="homeTitle">Where cricket meets analytics <br /> Build strategies, elevate performance</h2>
              </div>
              
            </div>
          
  </section>
  {/* About Section */}
  <section className="section about" id="about">
    <div className="about-content container">
      <div className="about-imageContent">
        { <img src={aboutImg} alt="aboutImg" className="about-img" /> }
        <div className="aboutImg-textBox">
          <i className="bx bx-heart heart-icon flex" />
          <p className="content-description"> "I really love Cricklytics. The stats are very accurate!"</p>
        </div>
      </div>
      <div className="about-details">
        <div className="about-text">
          <h4 className="content-subtitle"><i>Cricklytics</i></h4>
          <h2 className="content-title">Blending tradition with modern <br />analytics for smarter cricket decisions.</h2>
          <p className="content-description">We value your trust and commitment. Our users rely on Cricklytics because they know we deliver the most accurate and insightful cricket data..</p>
          <ul className="about-lists flex">
            <li className="about-list">Player Stats</li>
            <li className="about-list dot">.</li>
            <li className="about-list">Match Analysis</li>
            <li className="about-list dot">.</li>
            <li className="about-list">Team Strategy</li>
          </ul>
        </div>
        <div className="about-buttons flex">
          <a href="/about" >
          <button className="button">About Us</button>
          </a>
          <a href="/about" className="about-link flex">
          
            <span className="link-text">see more</span>
            <i className="bx bx-right-arrow-alt about-arrowIcon" />
          </a>
        </div>
      </div>
    </div>
  </section>
  {/* Menu Section */}
  <section className="section menu" id="menu">
    <div className="menu-container container">
      <div className="meu-text">
        <h4 className="section-subtitle"><i>Our Future Matches</i></h4>
        <h2 className="section-title">Exciting Upcoming Games</h2>
        <p className="section-description">
          We carefully schedule matches to ensure thrilling contests and top performances.
          Each game is planned with team strategy, player form, and match conditions in mind.
        </p>
      </div>
      <div className="menu-content">
        <div className="menu-items">
          <div className="menu-item flex">
          { <img src={menuImg1} alt="menuImg1" className="menu-img" /> }
            <div className="menuItem-details">
              <h4 className="menuItem-topic">A Team vs B Team</h4>
              <p className="menuItem-des">Date : 2025.02.25 <br /> Time : 15.00 PM <br /> Location : bt/pt/paddiruppu school grount </p>
            </div>
          </div>
          <div className="menu-item flex">
          { <img src={menuImg1} alt="menuImg1" className="menu-img" /> }
            <div className="menuItem-details">
              <h4 className="menuItem-topic">A Team vs B Team</h4>
              <p className="menuItem-des">Date : 2025.02.25 <br /> Time : 15.00 PM <br /> Location : bt/pt/paddiruppu school grount </p>
            </div>
          </div>
          <div className="menu-item flex">
          { <img src={menuImg1} alt="menuImg1" className="menu-img" /> }
            <div className="menuItem-details">
              <h4 className="menuItem-topic">A Team vs B Team</h4>
              <p className="menuItem-des">Date : 2025.02.25 <br /> Time : 15.00 PM <br /> Location : bt/pt/paddiruppu school grount </p>
            </div>
          </div>
        </div>
        <div className="time-table">
          <span className="time-topic">Match Time</span>
          <ul className="time-lists">
            <li className="time-list flex">
              <span className="open-day"> 25:02:2025</span>
              <span className="open-time">3.00pm - 6.00pm</span>
            </li>
            <li className="time-list flex">
              <span className="open-day"> 26:02:2025</span>
              <span className="open-time">7.00am - 3.00pm</span>
            </li>
            <li className="time-list flex">
              <span className="open-day"> 27:02:2025</span>
              <span className="open-time">12.00am - 3.00pm</span>
            </li>
            <li className="time-list flex">
              <span className="open-day"> 28:02:2025</span>
              <span className="open-time">-</span>
            </li>
            <li className="time-list flex">
              <span className="open-day"> 01:03:2025</span>
              <span className="open-time">-</span>
            </li>
            <li className="time-list flex">
              <span className="open-day"> 02:03:2025</span>
              <span className="open-time">10.00am - 3.00pm</span>
            </li>
            <li className="time-list flex">
              <span className="open-day"> 03:03:2025</span>
              <span className="open-time">-</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  {/* Brand Section */}
  <section className="section brand">
    <div className="brand-container container">
      <h4 className="section-subtitle"><i>sponsorship brand</i></h4>
      <div className="brand-images">
        <div className="brand-image">
          { <img src={brandImg1} alt="brandImg1" className="brand-img" /> }
        </div>
        <div className="brand-image">
         { <img src={brandImg2} alt="brandImg2" className="brand-img" /> }

        </div>
        <div className="brand-image">
         { <img src={brandImg3} alt="brandImg3" className="brand-img" /> }
        </div>
        <div className="brand-image">
        { <img src={brandImg4} alt="brandImg4" className="brand-img" /> }
        </div>
        <div className="brand-image">
        { <img src={brandImg5} alt="brandImg5" className="brand-img" /> }
        </div>
      </div>
    </div>
  </section>
  {/* Reviews Section */}
  <section className="section review" id="review">
    <div className="review-container container">
      <div className="review-text">
        <h4 className="section-subtitle"><i>Management</i></h4>
        <h2 className="section-title">What Our Team Says</h2>
        <p className="section-description">
          Our management ensures seamless cricket operations, focusing on team coordination, match planning, and player performance analysis. We strive for excellence in every aspect to provide the best experience for players and fans!</p>
      </div>
      
          
          <div className="testi-content swiper-slide flex">
            <img src="images/profileImg1.jpg" alt className="review-img" />
            <p className="review-quote">Your guidance and decisions shape the team's success every time. Thank you for your dedication to strategy, player development, and match planning! The impact you create is invaluable, and your leadership drives the team forward.</p>
            <i className="bx bxs-quote-alt-left quote-icon" />
            <div className="testi-personDetails flex">
              <span className="name">name</span>
              <span className="job">Coach</span>
            </div>
          </div>
        </div>
        <div className="swiper-button-next swiper-navBtn" />
        <div className="swiper-button-prev swiper-navBtn" />
        <div className="swiper-pagination" />
     
  </section>
  {/* Newsletter Section */}
  <section className="section newsletter">
    <div className="newletter-container container">
      <a href="#" className="logo-content flex">
      { <img src={logo1} alt="aboutImg" className="logo-img" /> }

      </a>
      <p className="section-description">Cricklytics – Your Ultimate Cricket Hub<br />
        This is the perfect place to track live matches, analyze player stats, and follow your favorite teams. You'll find match schedules, performance insights, and expert analysis all in one place!</p>
      <div className="newsletter-inputBox">
        <input type="email" placeholder="Cricklytics@gmail.com" className="newletter-input" />
        <button className="button newsletter-button">Subscribe</button>
      </div>
      <div className="newsletter media-icons flex">
        <a href="https://www.facebook.com"><i className="bx bxl-facebook" /></a>
        <a href="https://twitter.com/i/flow/login"><i className="bx bxl-twitter" /></a>
        <a href="https://www.instagram.com/accounts/login"><i className="bx bxl-instagram-alt" /></a>
        <a href="https://github.com/login"><i className="bx bxl-github" /></a>
        <a href="https://www.youtube.com/login"><i className="bx bxl-youtube" /></a>
      </div>
    </div>
  </section>
  {/* Scroll Up */}
  <a href="#home" className="scrollUp-btn flex">
    <i className="bx bx-up-arrow-alt scrollUp-icon" />
  </a>
</main>
</div>

  )
}

export default home;