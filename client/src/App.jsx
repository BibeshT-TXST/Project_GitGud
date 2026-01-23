import LoginPage from './components/Login';
import LandingPage from './pages/Landing_page'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  );
}

export default App
