import React from "react";
import "./assets/css/Card.css"


const MyComponent = ({ userData, teamsData, handleCardClick }) => {
  return (
    <>
      {userData &&
        userData.body &&
        Object.values(userData.body).map((value, index) => {
          const isEventData = value?.gameType === "E";
          const isValidData =
            value &&
            value !== "" &&
            Object.keys(value).length > 0 &&
            !isEventData;

          if (isValidData) {
            const awayTeamLogo = teamsData.body.find(
              (team) => team?.teamAbv === value.away
            );

            const homeTeamLogo = teamsData.body.find(
              (team) => team?.teamAbv === value.home
            );

            return (
              <div className="card" key={index}>
                <div className="header">
                  <div className="status">{value?.currentInning}</div>
                </div>

                <div className="teams">
                  <div
                    className="team"
                    key={`${value?.gameId}-away`}
                    onClick={() => handleCardClick(value.gameId)}
                  >
                    <img src={awayTeamLogo?.mlbLogo1} alt="" />
                    <span className="team-name">{value?.away}</span>
                    <span className="score">{value?.lineScore?.away?.R}</span>
                  </div>
                  <div
                    className="team"
                    key={`${value?.gameId}-home`}
                    onClick={() => handleCardClick(value.gameId)}
                  >
                    <img src={homeTeamLogo?.mlbLogo1} alt="" />
                    <span className="team-name">{value?.home}</span>
                    <span className="score">{value?.lineScore?.home?.R}</span>
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
    </>
  );
};

export default MyComponent;
