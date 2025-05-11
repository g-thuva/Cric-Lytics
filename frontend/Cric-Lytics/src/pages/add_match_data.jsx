import React, { useState } from "react";

const AddMatchData = () => {
  const [players, setPlayers] = useState([{ id: 1 }]);

  const addPlayer = () => {
    setPlayers([...players, { id: players.length + 1 }]);
  };

  const submitForm = () => {
    alert("Form Submitted Successfully!");
  };

  return (
  
    <div className="add_match_data">
          <p >Add Match Data</p>
      <main id="main" className="container">
        <div id="form-container">
          {players.map((player) => (
            <div key={player.id} className="player-form">
              <h1>Player {player.id} Details</h1>
              <form method="GET" action="">
                <label>Name *
                  <input type="text" name={`name${player.id}`} placeholder="Enter your name" required />
                </label>
                <label>Email *
                  <input type="email" name={`email${player.id}`} placeholder="Enter your email" required />
                </label>
                <label style={{ textAlign: 'center' }}>Player Role</label>
                <div className="radio-group">
  <input type="radio" id={`bowlers${player.id}`} name={`role${player.id}`} value="bowlers" defaultChecked />
  <label htmlFor={`bowlers${player.id}`}>Bowlers</label>

  <input type="radio" id={`batters${player.id}`} name={`role${player.id}`} value="Batters" />
  <label htmlFor={`batters${player.id}`}>Batters</label>

  <input type="radio" id={`wicketKeeper${player.id}`} name={`role${player.id}`} value="Wicket Keeper" />
  <label htmlFor={`wicketKeeper${player.id}`}>Wicket Keeper</label>

  <input type="radio" id={`allRounder${player.id}`} name={`role${player.id}`} value="All Rounder" />
  <label htmlFor={`allRounder${player.id}`}>All Rounder</label>
</div>

                <label>Total Runs *
                  <input type="number" name={`runs${player.id}`} min={0} placeholder="Enter Total Runs" required />
                </label>
                <label>Total Wickets *
                  <input type="number" name={`wickets${player.id}`} min={0} placeholder="Enter Total Wickets" required />
                </label>
                <label>Balls *
                  <input type="number" name={`balls${player.id}`} min={0} placeholder="Enter Balls" required />
                </label>
                <label>Total Fours *
                  <input type="number" name={`fours${player.id}`} min={0} placeholder="Enter Total Fours" required />
                </label>
                <label>Total Sixes *
                  <input type="number" name={`sixes${player.id}`} min={0} placeholder="Enter Total Sixes" required />
                </label>
                <label>Balls Faced *
                  <input type="number" name={`ballsFaced${player.id}`} min={0} placeholder="Enter Balls Faced" required />
                </label>
                <label>Any Record..
                  <textarea name={`suggestions${player.id}`} maxLength={194} defaultValue={""} />
                </label>
                <label>Upload Momant*</label>
                <label for="imageUpload" class="image-label">Upload  
                    <input type="file" id="imageUpload" name="playerImage" accept="image/*" />
                </label>


              </form>
            </div>
          ))}
        </div>
        <div class="button-container">
        <button onClick={addPlayer} className="btn">Add another player details</button>
         <button onClick={submitForm} className="btn">Submit the form</button>
         </div>
      </main>
    </div>
  );
};

export default AddMatchData;  
