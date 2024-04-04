import React from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";
import {
  getMLBTeamSchedule,
  getMLBTeamScheduleLocal,
  getMLBTeams,
} from "../utils/functions";
import TeamScheduleTable from "../ScheduleTable";

/**
 * Loader function to fetch MLB team schedule and teams data.
 * @param {Object} params - Parameters containing team abbreviation and season.
 * @returns {Promise<{ schedule: any, teams: any }>} An object containing MLB team schedule and teams data.
 */
export async function loader({ params }) {
  try {
    const [schedule, teams] = await Promise.all([
      getMLBTeamSchedule(params.teamAbv, params.season),
      getMLBTeams(),
    ]);
    return { schedule, teams };
  } catch (error) {
    console.error("Error loading data:", error);
    throw error;
  }
}

/**
 * Component to display the schedule of a specific MLB team.
 * @returns {JSX.Element} The team schedule component.
 */
const TeamSchedule = () => {
  const { schedule, teams } = useLoaderData();

  return (
    <div>
      <h1>Team Schedule</h1>
      <TeamScheduleTable sch={schedule} teams={teams} />
    </div>
  );
};

export default TeamSchedule;
