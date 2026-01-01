import React, { useState } from "react";
import "./PlayerPage.css";
import Overseas from "../../assets/plane.png";

const PlayerPage = ({ players }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [groupByRole, setGroupByRole] = useState(false);
  const [applyBoost, setApplyBoost] = useState(true);
  const [playerType, setPlayerType] = useState("ALL");

  
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
  const nationalityFilteredPlayers = filteredPlayers.filter((player) => {
    if (playerType === "ALL") return true;
    if (playerType === "INDIAN") return player.nationality === "Indian ";
    if (playerType === "OVERSEAS") return player.nationality === "Overseas ";
    return true;
  });

  const roles = ["Batter", "Bowler", "Allrounder", "Wicketkeeper"];

  const getEffectivePoints = (player) => {
    if (!applyBoost) return player.totalPoints;

    if (player.captainStatus === "captain")
      return Math.round(player.totalPoints / 1.5);

    if (player.captainStatus === "vice-captain")
      return Math.round(player.totalPoints / 1.25);

    return player.totalPoints;
  };
  const sortedPlayers = [...filteredPlayersS].sort(
  (a, b) => getEffectivePoints(b) - getEffectivePoints(a)
  );


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
              {player.nationality === "Overseas " && (
                <img
                  src={Overseas}
                  alt="Overseas Player"
                  className="overseas-icon"
                />
              )}
            </td>
            <td>{player.owner}</td>
            <td>{player.team}</td>
            <td>{getEffectivePoints(player)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="list-container">
      <div className="player-form container">
        <div className="country-form-container">
          <label>
            Filter by Team : &nbsp;
            <select
              onChange={handleCountrySelect}
              value={selectedCountry}
              className="owner-select"
            >
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

        <button
          className="boost-toggle-btn"
          onClick={() => setApplyBoost((prev) => !prev)}
        >
          {applyBoost ? "Remove C/VC Boost" : "Show C/VC Boost"}
        </button>
        
        <div className="nationality-toggle">
          <button
            className={playerType === "ALL" ? "active" : ""}
            onClick={() => setPlayerType("ALL")}
          >
            All
          </button>

          <button
            className={playerType === "INDIAN" ? "active" : ""}
            onClick={() => setPlayerType("INDIAN")}
          >
            Indian
          </button>

          <button
            className={playerType === "OVERSEAS" ? "active" : ""}
            onClick={() => setPlayerType("OVERSEAS")}
          >
            Overseas
          </button>
        </div>

        <div className="legendd">
          <span className="legend-captain">Captain</span>
          <span className="legend-vcaptain">Vice-Captain</span>
        </div>
      </div>

      <div className="tables-container">
        {groupByRole
          ? roles.map((role) => (
              <div key={role} className="role-sections">
                <h2>
                  {role === "Batter"
                    ? "Batsmen"
                    : role === "Bowler"
                    ? "Bowlers"
                    : role === "Allrounder"
                    ? "All-Rounders"
                    : "Wicket-keepers"}
                </h2>
                {renderTable(
                  nationalityFilteredPlayers.filter((player) => player.role === role)
                )}
              </div>
            ))
          : renderTable(nationalityFilteredPlayers)}
      </div>
    </div>
  );
};

export default PlayerPage;
