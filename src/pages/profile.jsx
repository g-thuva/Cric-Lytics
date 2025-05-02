import React from "react";
import profile from "./images/profile.jpg";

const Profile = () => {
  return (
    <div className="profil">
      <div id="wrapper">
        <div id="logo">
          <p>
            <b style={{ fontSize: "40px" }}>
              Welcome to <b>***</b> Profile Page
            </b>
          </p>
        </div>
        <div id="main-content">
          <div id="left-column">
            <div className="about-imageContent1">
              <p
                className="content-description"
                style={{ marginLeft: 25, marginTop: 15 }}
              >
                This is my pitch. Here are my passions:{" "}
              </p>
              <ul style={{ marginTop: 0, padding: 25 }}>
                <li>
                  <b>Batting style</b>
                </li>
                <li>
                  <b>Bowling style</b>
                </li>

                <li>
                  <b>Sixes that soar high :</b>
                </li>
                <li>
                  <b>Wickets that turn the game :</b>
                </li>
                <li>
                  <b>Total balls faced, never wasted :</b>
                </li>
                <li>
                  <b>Fours that race to the boundary :</b>
                </li>
                <li>
                  <b>Tracking every run with Cricklytics :</b>
                </li>
              </ul>

              <div className="aboutImg-textBox">
                <i className="bx bx-heart heart-icon flex" />
                <p className="content-description">
                  {" "}
                  "I really love Cricklytics. The stats are very accurate!"
                </p>
              </div>
            </div>

            <div>
              <div id="nav">
                {" "}
                Some Of My Famous Quotes<br></br>
                <b>
                  <a href="index.html">Overview</a> | <a href="#">Stats</a> |{" "}
                  <a href="#">Matches</a> | <a href="#">News</a> |{" "}
                  <a href="#">Photos</a> | <a href="#">Add Player</a> |{" "}
                  <a href="#">Add Coach</a> |
                  <a href="/OurTeam">Add Match Data</a> |{" "}
                  <a href="/addnews-form">Add News</a> |{" "}
                  <a href="#">Add Moments</a> |{" "}
                  <a href="#">Up Comming Math data</a> |{" "}
                  <a href="/sponsorship_data">Add sponsoreship Details </a> |{" "}
                  <a href="/Add_socialmedia">Add social meadia Details</a>|
                  <a href="/medical-form">Submit Medical</a>|
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {" "}
                    More
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">
                      <b>Add Impotent Note</b>
                    </a>
                    <a class="dropdown-item" href="#">
                      <b>Edit Social Meadia Links</b>
                    </a>
                    <a class="dropdown-item" href="#">
                      <b>Check Requirments</b>
                    </a>
                    <a class="dropdown-item" href="/admin-medical">
                      <b>Check Medical</b>
                    </a>
                    <a class="dropdown-item" href="#">
                      <b>Remove Coach</b>
                    </a>
                    <a class="dropdown-item" href="#">
                      <b>Remove Player</b>
                    </a>

                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                      <b>Help</b>
                    </a>
                  </div>
                </b>
              </div>
            </div>
          </div>
          <div id="right-column">
            <div id="main-image">
              {
                <img
                  src={profile}
                  alt="profile"
                  className="main-imgage"
                  width={100}
                  height={50}
                />
              }
            </div>
            <div className="sidebar">
              <h3>
                <b>Name :</b>
                <b>*</b>{" "}
              </h3>
              <p>
                Bat in my hand, dreams in my heart. <br></br>
                Every match is a battle, every run is a step towards glory!{" "}
              </p>
              <div className="box">
                <ul>
                  <li>
                    <b>Date of birth : </b>*<b> </b>
                  </li>
                  <li>
                    <b>Address : </b>*<b> </b>
                  </li>
                  <li>
                    <b>Roll : </b>*<b> </b>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div></div>

        <em id="randomquote" />
        <div id="footer"></div>
      </div>
    </div>
  );
};

export default Profile;
