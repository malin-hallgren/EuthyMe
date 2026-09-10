import {Routes, Route} from 'react-router-dom'
import { AuthProvider } from "./context/auth/AuthProvider.jsx";
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import PublicRoute from './routes/PublicRoute.jsx'
import Header from './components/Header.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import AdminDashboardPage from './pages/AdminDashboardPage.jsx'
import Dashboard from './pages/DashboardPage.jsx'

function App() {
  return (
    <>
      <AuthProvider>
        <main>
          <Header />
          
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Route>

          </Routes>
        </main>
      </AuthProvider>
    </>
  )
}

export default App
