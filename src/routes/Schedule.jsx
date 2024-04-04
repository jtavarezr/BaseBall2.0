import React from "react";
import { Outlet, Link, useLoaderData } from "react-router-dom";
import { getMLBTeamSchedule, getMLBTeamScheduleLocal, getMLBTeamsLocal } from "../utils/functions";
import TeamScheduleTable from "../ScheduleTable";

export async function loader({ params }) {
  const [schedule, teams] = await Promise.all([
    getMLBTeamScheduleLocal(params.teamAbv, params.season),
    getMLBTeamsLocal(),
  ]);
  return { schedule, teams };
}


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
