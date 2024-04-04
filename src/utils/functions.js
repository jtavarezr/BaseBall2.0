import axios from "axios";

const api = JSON.parse(import.meta.env.VITE_APP_API_KEY);

const apiOptions = {
  headers: {
    "X-RapidAPI-Key": api.tank01,
    "X-RapidAPI-Host": api.RapidAPI_Host,
  },
};

async function fetchData(url, params = {}) {
  try {
    const response = await axios.get(url, { ...params, ...apiOptions });
    return response.data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
}
// Api for get a list with all the teams in MLB
export async function getMLBTeams( teamStats, topPerformers ) {
  const url =
    "https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeams";
  const params = { teamStats: "true", topPerformers: "true" };
  return fetchData(url, { params });
}

export async function getMLBTeamsLocal(teamStats, topPerformers) {
  const url = "../../TeamList.json";
  return fetchData(url);
}

// Api to  get schedule of one specific team in MLB
export async function getMLBTeamSchedule(teamAbv, season) {
  console.log(`Se recibio teamabv ${teamAbv}`);
  console.log(`Se recibio season ${season}`);
  const url =
  "https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeamSchedule";
  const params = { teamAbv: teamAbv, season: season };
  return fetchData(url, { params });
}

export async function getMLBTeamScheduleLocal( teamAbv, season) {
  console.log(`Se recibio teamabv ${teamAbv}`);
  console.log(`Se recibio season ${season}`);
  const url = "../../TeamSchedule.json";
  return fetchData(url);
}

// Api for get MLB game for Day
export async function getMLBGamesForDate(gameDate) {
  const url =
    "https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBGamesForDate";
  const params = { gameDate: gameDate };
  return fetchData(url, { params });
}


// Api for get MLB game for Daily Scoreboard - Live - Real Time
export async function getMLBScoresOnly(gameDate, topPerformers) {
  console.log("Gaame", gameDate)
  const url =
    "https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBScoresOnly";
  const params = { gameDate: gameDate, topPerformers: 'true' };
  return fetchData(url, { params });
}

export async function getMLBScoresOnlyLocal(gameDate, topPerformers) {
  const url = "../../ForHeader.json";
  return fetchData(url);
}

// Api for get MLB game team score
export async function getMLBBoxScore(gameID, startingLineups) {
  const url =
    "https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBBoxScore";
  const params = { gameID: gameID, startingLineups: "true" };
  return fetchData(url, { params });
}

export async function getMLBBoxScoreLocal(gameID, startingLineups) {
  console.log("Entrando a getMLBBoxScoreLocal");
  const url = "../../getMLBBoxScore.json";
  return fetchData(url);
}




export async function getSeason(season) {
  const url = "https://baseball4.p.rapidapi.com/v1/mlb/seasons";
  const params = { seasonId: season };
  return fetchData(url, { params });
}

export async function getSchedule(date) {
  const url = "https://baseball4.p.rapidapi.com/v1/mlb/schedule";
  const params = { date };
  return fetchData(url, { params });
}

export async function getGamesData(gamePk) {
  const url = "https://baseball4.p.rapidapi.com/v1/mlb/games";
  const params = { gamePk };
  return fetchData(url, { params });
}

export async function getBoxScoreData(gamePk) {
  const url = "https://baseball4.p.rapidapi.com/v1/mlb/games-boxscore";
  const params = { gamePk };
  return fetchData(url, { params });
}
export async function getTeamInfo(teamId) {
  const url = "https://baseball4.p.rapidapi.com/v1/mlb/teams";
  const params = { teamId };
  return fetchData(url, { params });
}

export async function getSeasonLocal(season) {
  const url = "./seasonData.json";
  return fetchData(url);
}

export async function getScheduleLocal(date) {
  const url = "./scheduleData.json";
  return fetchData(url);
}

export async function getGamesLocal(gamesPk) {
  const url = "./gamesData.json";
  return fetchData(url);
}

export async function getBoxScoreLocal(gamePk) {
  const url = "./scoreBox.json";
  return fetchData(url);;
}
export async function getTeamInfoLocal(teamId) {
  const url = "./teamData.json";
  return fetchData(url);;
}


export function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

export function getTeams(gameList) {
  const teams = new Set();

  gameList &&
    Object.values(gameList.body).forEach((value) => {
      if (value.teams) {
        teams.add({
          id: value.teams.home.team.id,
          name: value.teams.home.team.name,
        });
        teams.add({
          id: value.teams.away.team.id,
          name: value.teams.away.team.name,
        });
      }
    });

  return Array.from(teams);
}