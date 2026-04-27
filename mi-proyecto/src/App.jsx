import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Inicio from './Inicio';
import Servicios from './Servicios';
import Contacto from './Contacto';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navegacion">
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/servicios" className={({ isActive }) => isActive ? "active" : ""}>
                Servicios
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" className={({ isActive }) => isActive ? "active" : ""}>
                Contacto
              </NavLink>
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
