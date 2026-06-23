import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="menu">
      <div className="menu-links">
        <NavLink to="/"         className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Início</NavLink>
        <img src="./public/logo.png" alt="Logo" className = "logo"  />
        <NavLink to="/produtos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Produtos</NavLink>
      </div>
    </nav>
  );
}