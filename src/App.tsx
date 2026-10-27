import './App.css'
import {Route, Routes} from "react-router"
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'

function App() {

  return (
    <Routes>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
    </Routes>
  )
}

export default App