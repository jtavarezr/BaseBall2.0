import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TeamScheduleTable = ({ sch, teams }) => {
  console.warn(sch);

  return (
    <div className="table-responsive">
      <div>
        <div>
          <h1>{sch.body?.team}</h1>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Away / Logo Away</th>
            <th>Home / Logo Home</th>
          </tr>
        </thead>
        <tbody>
          {sch &&
            sch.body &&
            sch.body.schedule.map((team) => (
              <tr key={team.gameID}>
                <td>{team.gameDate}</td>
                <td>
                  {team.away}{" "}
                  {teams &&
                    teams.body &&
                    teams.body.map((t) => {
                      if (t.teamAbv === team.away) {
                        return (
                          <img
                            key={t.teamID}
                            src={t.mlbLogo1}
                            alt={t.teamName}
                            style={{ width: "20px", marginRight: "5px" }}
                          />
                        );
                      }
                      return null;
                    })}
                </td>
                <td>
                  {team.home}{" "}
                  {teams &&
                    teams.body &&
                    teams.body.map((t) => {
                      if (t.teamAbv === team.home) {
                        return (
                          <img
                            key={t.teamID}
                            src={t.mlbLogo1}
                            alt={t.teamName}
                            style={{ width: "20px", marginRight: "5px" }}
                          />
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
  );
};

export default TeamScheduleTable;
