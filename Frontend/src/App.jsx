import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider} from './context/AuthContext.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import PublicRoute from './routes/PublicRoute.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/DashboardPage.jsx'
import './App.css'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
