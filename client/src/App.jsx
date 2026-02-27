import LandingPage from './pages/Landing_page'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import SuccessfulLogout from './pages/Successful_logout.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/successful-logout" element={<SuccessfulLogout />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/landing/*" element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App
