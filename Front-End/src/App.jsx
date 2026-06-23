import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Listagem from './pages/Listagem.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/"         element={<Login />} />
      <Route path="/home"     element={<Home />} />
      <Route path="/produtos" element={<Listagem />} />
    </Routes>
  );
}