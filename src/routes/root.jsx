import React, { useState, useEffect } from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";
import {
  getMLBTeamsLocal,
  getMLBScoresOnlyLocal,
  getCurrentDate,
  getMLBTeams,
  getMLBScoresOnly,
  formatDate,
} from "../utils/functions";
import Card from "../Card";

/**
 * Loader function to fetch MLB teams and scores for the current date.
 * @returns {Promise<{ teams: any, header: any }>} An object containing MLB teams and header data.
 */
export async function loader() {
  try {
    const teamsResponse = await getMLBTeams();
    const scoresResponse = await getMLBScoresOnly(getCurrentDate().replace(/-/g, ''));

    console.log("Response:", teamsResponse);
    return { teams: teamsResponse, header: scoresResponse };
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
}

/**
 * Root component for the application.
 * Displays a sidebar with navigation links to MLB teams and a search form.
 * @returns {JSX.Element} The root component.
 */
const Root = () => {
  const { teams: initialTeams, header: initialHeader } = useLoaderData();
  const currentDate = getCurrentDate();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [teams, setTeams] = useState(initialTeams);
  const [header, setHeader] = useState(initialHeader);

  useEffect(() => {
    const formattedDate = formatDate(selectedDate); // Format selected date as yyyymmdd
    // Fetch MLB scores for the selected date
    getMLBScoresOnly(formattedDate.replace(/-/g, ""))
      .then((scoresResponse) => setHeader(scoresResponse))
      .catch((error) => console.error("Error fetching MLB scores:", error));
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setSelectedDate(formatDate(e.target.value));
  };

  const year = getCurrentDate().split("-")[0];
  const pastYears = Array.from({ length: 11 }, (_, index) => year - index);

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
              value={year}
              onChange={() => {}} // Placeholder function for year change
            >
              {pastYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <br />
            <br />
            <label>Calendar :</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />

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
                  <Link to={`team/${team.teamAbv}/${year}`}>
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
          <Card
            userData={header}
            teamsData={teams}
            onCardClick={() => {}} // Placeholder function for card click
          />
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
