import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout/MainLayout"
import Home from "./pages/Home/Home"
import { NotFound } from "./pages/404/404NotFound"
import { TaskBoard } from "./pages/TaskBoard/TaskBoard"
import { Dashboard } from "./pages/Dashboard/Dashboard"
import { Messages } from "./pages/Messages/Messages"

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="taskBoard" element={<TaskBoard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="messages" element={<Messages />} />


        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
