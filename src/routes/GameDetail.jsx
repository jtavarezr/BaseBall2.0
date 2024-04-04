import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { getMLBBoxScore, getMLBBoxScoreLocal } from "../utils/functions";
import TeamsPieChart from "./TeamsPieChart";
import TeamsLineChart from "./TeamsLineChart";

/**
 * Loader function to fetch MLB box score data for a specific game.
 * @param {Object} params - Parameters containing the game ID.
 * @returns {Promise<{ game: any }>} An object containing MLB box score data for the game.
 */
export async function loader({ params }) {
  try {
    console.log("loading {PARAMETERS}", params)
    const [game] = await Promise.all([
      getMLBBoxScore(params.gameId),
      console.log("loading game", params.game),
    ]);
    return { game };
  } catch (error) {
    console.error("Error loading game:", error);
    throw error;
  }
}

/**
 * Component to display details of a MLB game.
 * @returns {JSX.Element} The game details component.
 */
const TeamSchedule = () => {
  const { game } = useLoaderData();
  const [data, setData] = useState([]);

  useEffect(() => {
    const scoresByInning = game.body.lineScore.away.scoresByInning || {};
    const awayData = Object.values(scoresByInning).map((score, index) => ({
      name: index.toString(),
      away: score,
      home: game.body.lineScore.home.scoresByInning[index + 1],
      id: `inning-${index}`,
    }));
    setData(awayData);
  }, [game]);

  console.log("Game ->", game);
  console.log("data in team to graph", data);

  const totalAway = data.reduce((acc, curr) => acc + parseInt(curr.away), 0);
  const totalHome = data.reduce((acc, curr) => acc + parseInt(curr.home), 0);

  // Variable dataTotal with the calculated totals
  const dataTotal = [
    { name: "Away", value: totalAway },
    { name: "Home", value: totalHome },
  ];

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h1>Game Details Page</h1>
      <div className="detalle">
        <p>
          Stadium: {game.body.Venue} <br />
          Current Inning: {game.body.currentInning} <br />
          Weather: {game.body.Weather} <br />
          Current Pitcher: {game.body.currentPitcher} <br />
          Game Status: {game.body.gameStatus} <br />
        </p>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "20px" }}>
          <h2>Away</h2>
          <h3>{game.body.away}</h3>
          <p>
            E: {game.body.lineScore.away.E} <br />
            H: {game.body.lineScore.away.H} <br />
            R: {game.body.lineScore.away.R}{" "}
            <span className="text-light bg-dark">
              {" "}
              {data.map((score, index) => (
                <span key={score.id}>{score.away} </span>
              ))}
            </span>
          </p>
        </div>
        <div>
          <h2>Home</h2>
          <h3>{game.body.home}</h3>
          <p>
            E: {game.body.lineScore.home.E} <br />
            H: {game.body.lineScore.home.H} <br />
            R: {game.body.lineScore.home.R}{" "}
            <span className="text-light bg-dark">
              {data.map((score, index) => (
                <span key={score.id}>{score.home} </span>
              ))}
            </span>
          </p>
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {console.warn(data)}
        {console.warn(dataTotal)}
        <TeamsLineChart data={data} />
        <TeamsPieChart dataTotal={dataTotal} />
      </div>
    </div>
  );
};

export default TeamSchedule;
