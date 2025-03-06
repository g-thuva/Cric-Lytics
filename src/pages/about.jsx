import React from "react";
const AboutUs = () => {
  return (

    

    <div>
      <section className="aboout">
        <h1><b>About Us</b></h1>
        <p style={{ fontWeight: "bold" }}>
        Cricklytics provides real-time cricket analytics to boost performance and insights.
        </p>
        <div className="aboout-info">
        
          <div>
            <p>
            Cricklytics is an innovative platform designed to provide comprehensive analytics and insights for cricket enthusiasts and professionals. Offering detailed performance tracking, statistics, and personalized insights, it aims to empower players, coaches, and fans with data-driven knowledge. From match analysis to player performance breakdowns, Cricklytics helps users stay ahead of the game, making it a trusted source for cricket analytics across the globe.
            </p>
            <br />
            <p>
            Cricklytics is the ultimate destination for cricket enthusiasts, players, and analysts seeking in-depth insights and performance metrics. Combining cutting-edge data analytics with a passion for the sport, Cricklytics delivers real-time performance statistics, match analytics, and player progress tracking. With a user-friendly interface and advanced features, it offers a dynamic and interactive platform for fans and professionals alike. Trusted by cricket communities worldwide, Cricklytics is the go-to tool for improving skills, making informed decisions, and staying connected with the ever-evolving world of cricket.

            </p>
            
          </div>
        </div>
      </section>
      <section className="team">
        <h1>Managing Team</h1>
        <div className="team-cards">
          {/* Card 1 */}
          <div className="card">
            <div className="card-img">
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20230824122630/business-office-business-woman-professional.jpg"
                alt="User 1"
              />
            </div>
            <div className="card-info">
              <h2 className="card-name">Jane</h2>
              <p className="card-role">COACH</p>
              <p className="card-email">jane@example.com</p>
              <p>
                <button className="button">Contact</button>
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="card">
            <div className="card-img">
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20230822183347/man-portrait-businessman-male.jpg"
                alt="User 2"
              />
            </div>
            <div className="card-info">
              <h2 className="card-name">Miller</h2>
              <p className="card-role">ADMIN</p>
              <p className="card-email">Miller@example.com</p>
              <p>
                <button className="button">Contact</button>
              </p>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
