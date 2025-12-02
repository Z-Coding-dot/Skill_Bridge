import { createBrowserRouter } from "react-router-dom";
import { TaskBoard } from "../pages/TaskBoard/TaskBoard.tsx";
import { Dashboard } from "../pages/Dashboard/Dashboard.tsx";
import { Messages } from "../pages/Messages/Messages.tsx";
import { TaskDetailsPage } from "../pages/TaskDetailsPage/TaskDetailsPage.tsx";
import MainLayout from "../layouts/MainLayout/MainLayout.tsx";
import { Login } from "../pages/Login/Login.tsx";
import { NotFound } from "../pages/404/404NotFound.tsx";
import Home from "../pages/Home/Home.tsx";
import { ROUTES } from "../lib/consts/routeConfig.ts";
import SignUp from "../pages/SignUp/SignUp.tsx";
import { Profile } from "../pages/Profile/Profile.tsx";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute.tsx";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: ROUTES.TASK_BOARD,
        element: <TaskBoard />,
      },
      {
        path: ROUTES.DASHBOARD,
        element:( <ProtectedRoute><Dashboard /></ProtectedRoute>)
      },
      {
        path: ROUTES.MESSAGES,
        element:(<ProtectedRoute> <Messages /></ProtectedRoute>),
      },
      {
        path: ROUTES.PROFILE,
        element: (<ProtectedRoute> <Profile /></ProtectedRoute>),
      },
      {
        path: "/tasks/:id",
        element: <TaskDetailsPage />,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.SIGNUP,
    element: <SignUp />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
