import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Inicio from './Inicio';
import Servicios from './Servicios';
import Contacto from './Contacto';
import './App.css';

function App() {
  const [tema, setTema] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema);
  }, [tema]);

  const toggleTema = () => {
    setTema(tema === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div>
        <nav className="navegacion">
          <ul>
            <li><NavLink to="/">Inicio</NavLink></li>
            <li><NavLink to="/servicios">Servicios</NavLink></li>
            <li><NavLink to="/contacto">Contacto</NavLink></li>
            <li>
              <button onClick={toggleTema} className="btn-tema">
                {tema === 'light' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
              </button>
            </li>
          </ul>
        </nav>

        <main className="contenido">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
