import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import Root, { loader as rootLoader } from "./routes/root";
import TeamSchedule, { loader as scheduleLoader } from "./routes/Schedule";
import GameDetail, { loader as gameLoader } from "./routes/GameDetail";
import ErrorPage from "./error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "team/:teamId",
        element: <TeamSchedule />,
        loader: scheduleLoader,
      },
      {
        path: "team/:teamAbv/:season",
        element: <TeamSchedule />,
        loader: scheduleLoader,
      },
      {
        path: "game/:gameId",
        element: <GameDetail />,
        loader: gameLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
