import { createBrowserRouter } from "react-router-dom";
import { TaskBoard } from "../pages/TaskBoard/TaskBoard.tsx";
import { Dashboard } from "../pages/Dashboard/Dashboard.tsx";
import { Messages } from "../pages/Messages/Messages.tsx";
import { TaskDetailsPage } from "../pages/TaskDetailsPage/TaskDetailsPage.tsx";
import MainLayout from "../layouts/MainLayout/MainLayout.tsx";
import { Login } from "../pages/Login/Login.tsx";
import { NotFound } from "../pages/404/404NotFound.tsx";
import Home from "../pages/Home/Home.tsx";
import SignUp from "../pages/SignUp/SignUp.tsx";
import { Profile } from "../pages/Profile/Profile.tsx";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute.tsx";
import { ROUTES } from "./routeConfig.ts";
import { Overview } from "@/components/ui/Dashboard/Overview.tsx";
import { Applications } from "@/components/ui/Dashboard/Applications.tsx";
import { Setting } from "@/components/ui/Dashboard/Settings.tsx";
import { MyTask } from "@/components/ui/Dashboard/MyTask.tsx";
import { Notifications } from "@/components/ui/Dashboard/Notifications.tsx";
import { UserProfile } from "@/pages/Profile/UserProfile.tsx";
import { AdminLayout } from "@/pages/Admin/AdminLayout.tsx";
import { AdminRoute } from "@/components/ProtectedRoute/AdminRoute.tsx";
import { AdminOverview } from "@/pages/Admin/AdminOverview.tsx";
import { AdminUsers } from "@/pages/Admin/AdminUsers.tsx";
import { AdminTasks } from "@/pages/Admin/AdminTasks.tsx";
import { AdminFeedbacks } from "@/pages/Admin/AdminFeedbacks.tsx";

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
        path: "/tasks/:id",
        element: (<ProtectedRoute> <TaskDetailsPage /></ProtectedRoute>),
      },
    ],
  },
  {
  path: "admin",
  element: <AdminRoute><AdminLayout /></AdminRoute>,
  children: [
    { index: true,          element: <AdminOverview />  },
    { path: "users",        element: <AdminUsers />     },
    { path: "tasks",        element: <AdminTasks />     },
    { path: "feedbacks",    element: <AdminFeedbacks /> },
  ],
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
    path: ROUTES.DASHBOARD,
    element:( <ProtectedRoute><Dashboard /></ProtectedRoute>),
    children: [
      {index: true, element: <Overview/>},
      {path: ROUTES.APPLICATIONS, element: <Applications/>},
      {path: ROUTES.NOTIFICATIONS, element: <Notifications/>},
      {path: ROUTES.MY_TASK, element: <MyTask/>},
      {path: ROUTES.SETTINGS, element: <Setting/>},
    ]
  },
  {
    path: "profile/:id",
    element: <ProtectedRoute><UserProfile /></ProtectedRoute>,
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
