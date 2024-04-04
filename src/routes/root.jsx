import React, { useState } from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";
import {
  getMLBTeamsLocal,
  getMLBScoresOnlyLocal,
  getCurrentDate,
  getMLBTeams,
  getMLBScoresOnly,
} from "../utils/functions";
import Card from "../Card";

export async function loader() {
  const response = await getMLBTeams();
  const response2 = await getMLBScoresOnly(getCurrentDate().replace(/-/g, ''));
  //const response2 = await getMLBScoresOnly(getCurrentDate());
  console.log("Response:", response);
  return { teams: response, header: response2};
}

const Root = () => {
  const { teams, header} = useLoaderData();
  const currentDate = getCurrentDate();
  const year = currentDate.split("-")[0];
  const pastYears = Array.from({ length: 11 }, (_, index) => year - index);
  const [currentYear, setCurrentYear] = useState(year);

  const handleYearChange = (e) => {
    const selectedYear = parseInt(e.target.value);
    setCurrentYear(selectedYear);
    console.log("Current Year", selectedYear);
  };

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <form id="search-form" role="search">
            {"Season "}
            <select
              id="yearSelect"
              className="form-select"
              value={currentYear}
              onChange={handleYearChange}
            >
              {pastYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <br />
            <br />
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
        </div>
        <nav>
          <ul>
            {teams &&
              teams.body &&
              teams.body.map((team) => (
                <li key={team.teamID}>
                  <Link to={`team/${team.teamAbv}/${currentYear}`}>
                    {team.teamName ? (
                      <>
                        {team.teamName} {team.teamCity}{" "}
                        <img
                          src={team.mlbLogo1}
                          alt={team.teamName}
                          style={{ width: "20px", marginRight: "5px" }}
                        />
                      </>
                    ) : (
                      <i>No Name</i>
                    )}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <nav className="nav-card">
          <Card userData={header} teamsData={teams} onCardClick={handleCardClick} />
        </nav>
        <nav className="nav-home">
          <ul>
            <li className="home-link" key="home-button">
              <Link style={{ color: "white" }} to="/">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Root;

/**
 * Handle click on a game card.
 * @param {number} gamePk - Primary key of the selected game.
 */
const handleCardClick = (gamePk) => {
  setSelectedGamePk(gamePk); // Store selected game primary key in state
};
