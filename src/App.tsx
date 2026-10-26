import './App.css'
import {Route, Routes} from "react-router"
import { Login } from './pages/auth/Login'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
    </Routes>
  )
}

export default App