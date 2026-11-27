import './App.css'
import { Route, Routes } from "react-router"
import { Toaster } from 'react-hot-toast'
import { AuthPage } from './pages/auth/AuthPage'
import Home from './pages/user/Home'
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/store'
import { refreshSession } from './features/auth/authSlice'
import { useEffect } from 'react';
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicRoute from './components/auth/PublicRoute'
import Profile from './pages/user/Profile'
import { toastOptions } from './utils/toastOptions'
import MainLayout from './layouts/MainLayout'

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.auth.status)

  useEffect(() => {
    if (status === "idle") {
      dispatch(refreshSession());
    }
  }, [dispatch, status])

  return (
    <>
      <Toaster position="top-right" gutter={10} toastOptions={toastOptions} />

      {status === "idle" || status === "loading" ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<PublicRoute />}>
            <Route path="/register" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      )}
    </>
  )
}

export default App