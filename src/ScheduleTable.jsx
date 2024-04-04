import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Outlet } from "react-router-dom";

/**
 * Component to display the schedule table for a specific MLB team.
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.sch - The schedule data for the team.
 * @param {Object} props.teams - The list of MLB teams.
 * @returns {JSX.Element} The team schedule table component.
 */
const TeamScheduleTable = ({ sch, teams }) => {
  console.log("Schedule", sch)
  return (
    <>
      <br />
      <br />
      <h1>{sch.body?.team}</h1>
      <div className="table-responsive" style={{ height: "400px" }}>
        <table className="table table-responsive table-bordered border-primary">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Away</th>
              <th>Home</th>
            </tr>
          </thead>
          <tbody>
            {sch &&
              sch.body &&
              sch.body.schedule.map((team) => (
                <tr key={team.gameID}>
                  <td>
                    <Link to={`/game/${team.gameID}`}>{team.gameDate}</Link>
                  </td>
                  <td>
                    {teams &&
                      teams.body &&
                      teams.body.map((t) => {
                        if (t.teamAbv === team.away) {
                          return (
                            <Link to={`/team/${t.teamAbv}`} key={t.teamID}>
                              {t.teamName} {t.teamCity}{" "}
                              <img
                                src={t.mlbLogo1}
                                alt={t.teamName}
                                style={{ width: "20px", marginRight: "5px" }}
                              />
                            </Link>
                          );
                        }
                        return null;
                      })}
                  </td>
                  <td>
                    {teams &&
                      teams.body &&
                      teams.body.map((t) => {
                        if (t.teamAbv === team.home) {
                          return (
                            <Link to={`/team/${t.teamAbv}`} key={t.teamID}>
                              {t.teamName} {t.teamCity}{" "}
                              <img
                                src={t.mlbLogo1}
                                alt={t.teamName}
                                style={{ width: "20px", marginRight: "5px" }}
                              />
                            </Link>
                          );
                        }
                        return null;
                      })}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default TeamScheduleTable;
