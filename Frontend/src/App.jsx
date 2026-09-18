import {Routes, Route, Navigate} from 'react-router-dom'
import { AuthProvider } from "./context/auth/AuthProvider.jsx";
import { SettingsProvider } from "./context/settings/SettingsProvider.jsx";
import { GlobalErrorProvider } from "./context/global-error/GlobalErrorProvider.jsx";

import ProtectedRoute from './routes/ProtectedRoute.jsx'
import PublicRoute from './routes/PublicRoute.jsx'

import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import AdminDashboardPage from './pages/AdminDashboardPage.jsx'
import Dashboard from './pages/DashboardPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

import Header from './components/UI/header/Header.jsx'
import Footer from './components/UI/footer/Footer.jsx'

function App() {
  return (
    <>
      <GlobalErrorProvider>
        <AuthProvider>
          <SettingsProvider>
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
    
    
                <Route path="*" element={<Navigate to="/404" />} />
                <Route path="/404" element={<NotFoundPage />} />
    
              </Routes>
              <Footer />
            </main>
          </SettingsProvider>
        </AuthProvider>
      </GlobalErrorProvider>
    </>
  )
}

export default App
