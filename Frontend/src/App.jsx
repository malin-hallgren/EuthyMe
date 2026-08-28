import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {LoginPage} from './pages/LoginPage.jsx'
import Dashboard from './pages/DashboardPage.jsx'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Auth context here? */}
        <Routes>
          <Route path="/" element={<h1>Home</h1>} /> 
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> {/* Protect this route with auth context */}
        </Routes>
      </BrowserRouter>
      <section id="spacer"></section>
    </>
  )
}

export default App
