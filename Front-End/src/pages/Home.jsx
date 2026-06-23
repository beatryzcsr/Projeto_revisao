import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="container">     

 
        <div className="home-main">
          <h1 className="t1">Supplix</h1>
          <h1 className="t2">Nexora</h1>
          <p className='slogan'>Empresas que fornecem. Pessoas que recebem</p>
          
          <div className="home-actions">
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to="/produtos">
              <button className="btn btn-primary">Ver Produtos</button>
            </Link>
          </div>
        </div>

        <section className="info">
          <div className="aboutUs">
            <h1 className="t3">Mega</h1>
            <h1 className="t4">mind</h1>
            <p>
              Nós somos o Megamind, uma equipe de programadoras focadas no desenvolvimento de sistemas. 
              Somos formadas por 5 integrantes pertencentes à rede SESI - SENAI de Valinhos. 
              Nossa missão é entregar sites funcionais e bem desenvolvidos, sempre priorizando a experiência e expectativa dos nossos clientes.
            </p>
          </div>

          <div className="obj">
            <h1 className="t5">Surica</h1>
            <h1 className="t6">team</h1>
            <p>
              Nós somos o Suricateam, uma equipe de desenvolvedores focada na criação de sites digitais 
              e evolução de sistemas. Nosso grupo é composto por estudantes do curso de Desenvolvimento 
              de Sistemas da rede SESI - SENAI de Valinhos. O nosso grupo é divertido e alegre.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}