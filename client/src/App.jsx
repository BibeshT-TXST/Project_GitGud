import LandingPage from './pages/Landing_page'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  );
}

export default App
