import React from "react";
import "./assets/css/Card.css";
import { Link } from "react-router-dom";

/**
 * Component to display a card for each event in the user data.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.userData - The user data containing event information.
 * @param {Object} props.teamsData - The list of MLB teams.
 * @param {Function} props.handleCardClick - The function to handle card clicks.
 * @returns {JSX.Element} The card component.
 */
const Card = ({ userData, teamsData, handleCardClick }) => {
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
              <Link to={`/game/${value.gameID}`} key={index}>
                <div className="card">
                  <div className="header">
                    <div className="status">{value?.currentInning}</div>
                  </div>

                  <div className="teams">
                    <div className="team" key={`${value?.gameId}-away`}>
                      <img src={awayTeamLogo?.mlbLogo1} alt="" />
                      <span className="team-name">{value?.away}</span>
                      <span className="score">{value?.lineScore?.away?.R}</span>
                    </div>
                    <div className="team" key={`${value?.gameId}-home`}>
                      <img src={homeTeamLogo?.mlbLogo1} alt="" />
                      <span className="team-name">{value?.home}</span>
                      <span className="score">{value?.lineScore?.home?.R}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          } else {
            return null;
          }
        })}
    </>
  );
};

export default Card;
