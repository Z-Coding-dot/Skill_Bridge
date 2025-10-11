import { Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout/MainLayout"
import Home from "./pages/Home/Home"

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<MainLayout/>}>
        <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
