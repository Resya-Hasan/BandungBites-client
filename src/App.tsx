import './App.css'
import { Route, Routes } from "react-router"
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import Home from './pages/user/Home'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/store'
import { refreshSession } from './features/auth/authSlice'
import { useEffect } from 'react';
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector((state: RootState) => state.auth.status)

  useEffect(() => {
    if (status === "idle") {
      dispatch(refreshSession());
    }
  }, [dispatch, status])

  if (status === "idle" || status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />\
      </Route>
    </Routes>
  )
}

export default App