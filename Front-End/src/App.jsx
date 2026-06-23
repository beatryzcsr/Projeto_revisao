import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Listagem from './pages/Listagem.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<Home />} />
      <Route path="/produtos"  element={<Listagem />} />
    </Routes>
  );
}