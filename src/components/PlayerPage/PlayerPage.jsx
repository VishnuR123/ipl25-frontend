import React, { useState } from "react";
import "./PlayerPage.css";
const PlayerPage = ({ players }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [groupByRole, setGroupByRole] = useState(false);

  const handleCountrySelect = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleGroupByRoleChange = (event) => {
    setGroupByRole(event.target.checked);
  };

  const filteredPlayersS = selectedCountry
    ? players.filter((player) => player.team === selectedCountry)
    : players;

  const filteredPlayers = filteredPlayersS.sort(
    (a, b) => b.totalPoints - a.totalPoints
  );

  const roles = ["Batter", "Bowler", "Allrounder","Wicketkeeper"];

  const renderTable = (players) => (
    <table className="container">
      <thead>
        <tr>
          <th>Name</th>
          <th>Owner</th>
          <th>Country</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.name} className={player.captainStatus}>
            <td>
              {player.name}
              {player.nationality === ("Overseas " || "Overseas") && (
              <img
                src="src/assets/plane.png" 
                alt="Overseas Player"
                className="overseas-icon"
              />
            )}
            </td>
            <td>{player.owner}</td>
            <td>{player.team}</td>
            <td>{player.totalPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="list-container">
      <div className="player-form container">
        <div className="country-form-container ">
          <label>
            Filter by Team : &nbsp;
            <select onChange={handleCountrySelect} value={selectedCountry} className="owner-select">
              <option value="">All Teams</option>
              {Array.from(new Set(players.map((player) => player.team))).map(
                (country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                )
              )}
            </select>
          </label>
        </div>
        <div className="role-form-container">
          <label>
            Group by Role:
            <input
              type="checkbox"
              checked={groupByRole}
              onChange={handleGroupByRoleChange}
            />
          </label>
        </div>
        <div className="legendd">
          <span className="legend-captain">Captain</span>
          <span className="legend-vcaptain">Vice-Captain</span>
        </div>
      </div>
      <div className="tables-container ">
        {groupByRole
          ? roles.map((role) => (
              <div key={role} className="role-sections">
                <h2>
                  {role === "Batter" ? "Batsmen"
                    : role === "Bowler" ? "Bowlers"
                    : role === "Allrounder" ? "All-Rounders"
                    : "Wicket-keepers"}
                </h2>
                {renderTable(
                  filteredPlayers.filter((player) => player.role === role)
                )}
              </div>
            ))
          : renderTable(filteredPlayers)}
      </div>
    </div>
  );
};

export default PlayerPage;
