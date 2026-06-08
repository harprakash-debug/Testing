import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Table from "./pages/Table"
import ForgetPassword from "./pages/ForgetPassword"
import ProtectedRoute from "./pages/ProtectedRoute"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Table />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


