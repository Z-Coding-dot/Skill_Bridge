import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout/MainLayout"
import Home from "./pages/Home/Home"
import { NotFound } from "./pages/404/404NotFound"

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout/>}>
        <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
