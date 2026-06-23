import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container">
      <div className="imagem">
        <div className="home-main">
          <h1 className="t1">Supplix</h1>
          <h1 className="t2">Nexora</h1>
          <p className='slogan'>Empresas que fornecem. Pessoas que recebem</p>
            <Link to="/produtos"><button className="btn btn-primary">Produtos</button></Link>
        </div>

      </div>


      </div>
    </div>
  );
}