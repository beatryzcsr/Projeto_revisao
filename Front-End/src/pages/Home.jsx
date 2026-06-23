import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container">

        <img src="./public/sakura.png" alt="Sakura" className="element1" />

        <div className="home-main">
          <h1 className="t1">Lotus</h1>
          <h1 className="t2">Byte</h1>
          <p>Armazene e Administre seu estoque!</p>
            <Link to="/produtos"><button className="btn btn-primary">Produtos</button></Link>
        </div>

        <img src="./public/comida.png" alt="comida" className="element2" />
        <img src="./public/sakura.png" alt="Sakura" className="element3" />

      </div>
    </div>
  );
}