import React from "react";





const Profile = () => {
  return (
    <div className="aa">

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div id="logo">
        <p ><b style={{fontSize: "40px"}}>Welcome to <b>***</b> Profile Page</b></p>
      </div>
<div id="wrapper">

  <div id="main-content">
    <div id="left-column">
      

      

      <div className="box">
        <h2 className="content-title">What You'll Find Here</h2>

        <div className="about-imageContent1">
        <p style={{marginLeft: 25 ,marginTop: 15 }}>This is my pitch. Here are my passions: </p>
        <ul style={{marginTop: 0 , padding: 25}}>
          <li><b>Sixes that soar high :</b></li>
          <li><b>Fours that race to the boundary :</b></li>
          <li><b>Wickets that turn the game :</b></li>
          <li><b>Total balls faced, never wasted :</b></li>
          <li><b>Tracking every run with Cricklytics :</b></li>
        </ul>

        <div className="aboutImg-textBox">
          <i className="bx bx-heart heart-icon flex" />
          <p className="content-description"> "I really love Cricklytics. The stats are very accurate!"</p>
        </div>
      </div>





      </div>
      <h2>Some Of My Famous Quotes</h2>
      <div id="header">
		<div id="nav"><b><a href="index.html">Overview</a> | <a href="#">Stats</a> | <a href="#">Matches</a> | <a href="#">News</a> | 
    <a href="#">Photos</a> | <a href="/add_player">Add Player</a> | <a href="#">Add Coach</a> | <a href="/add_match_data">
    Add Match Data</a> | <a href="#">Add News</a> | <a href="#">Add Moments</a> | <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    
          More
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          
          <a class="dropdown-item" href="#"><b>Add Impotent Note</b></a>
          <a class="dropdown-item" href="#"><b>Edit Social Meadia Links</b></a>
          <a class="dropdown-item" href="#"><b>Check Requirments</b></a>
          <a class="dropdown-item" href="#"><b>Check Medical</b></a>
          <a class="dropdown-item" href="#"><b>Remove Coach</b></a>
          <a class="dropdown-item" href="#"><b>Remove Player</b></a>
          
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#"><b>Help</b></a>
        </div> </b></div> 
		<div id="bg"></div>
	  </div>
      <p>
        <img src="https://web.facebook.com/photo.php?fbid=1441894042538268&set=a.105978852796467.9483.100001530585485&type=3&theater
" width={139} height={75} style={{margin: '0 10px 10px 0', float: 'left'}} />
        <em>"Do It, Do It Right, Do It Right Now"</em> - <b>Me</b><br />
        <em>"Would I rather be feared or loved? Easy, both. I want people to be afraid of how much they love me."</em> - <b>Me</b><br />
        <em>"Make the world more open, and enjoy an open and connected world"</em> - <b>Me</b><br />
        <em>"Don't Learn to patch bugs out, learn to rewrite them, and fix them"</em> - <b>Me</b><br />
      </p>
    </div>
    <div id="right-column">
      <div id="main-image"><img src="https://web.facebook.com/photo.php?fbid=1441894042538268&set=a.105978852796467.9483.100001530585485&type=3&theater
" width={100} height={50} /></div>
      <div className="sidebar">
        <h3><b>Name :</b><b>*</b> </h3>
        <p>Bat in my hand, dreams in my heart. <br></br>
        Every match is a battle, every run is a step towards glory! </p>
        <div className="box">
          <ul >
            <li><b>Date of birth : </b>*<b> </b></li>
            <li><b>Address : </b>*<b> </b></li>
            <li><b>Roll : </b>*<b> </b></li>
            
          </ul>
        </div>
      </div>
    </div>
  </div>
  <em id="randomquote" />
  <div id="footer">
      </div>
</div>
</div>


  );
};

export default Profile;
