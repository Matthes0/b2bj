// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import Home from './Home';
// import About from './About';
// import Contact from './Contact';
// import AnimatedCard from './AnimatedCard';
// import UserPage from './UserPage';
// import './index.css';
// import LoginPage from "./LoginPage.jsx"; // Importuj plik CSS






// const App = () => {
//   const [balance, setBalance] = useState(1000); // Inicjalizacja na 1000
//   const [isPanelOpen, setIsPanelOpen] = useState(false);

//   const togglePanel = () => {
//     setIsPanelOpen(!isPanelOpen);
//   };

//   const closePanel = () => {
//     setIsPanelOpen(false);
//   };

//   return (
//     <Router>
//       <header>
//         <div className="header-content">
//           <div className="balance">{balance}</div>
//           <button className="open-panel-button" onClick={togglePanel}>Open Panel</button>
//         </div>
//       </header>
//       {isPanelOpen && (
//         <div className="overlay" onClick={closePanel}>
//           <div className="panel" onClick={(e) => e.stopPropagation()}>
//             <h2>Panel Content</h2>
//             <button onClick={closePanel}>Close Panel</button>
//           </div>
//         </div>
//       )}
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about">About</Link></li>
//           <li><Link to="/contact">Contact</Link></li>
//           <li><Link to="/bj">BJ</Link></li>
//         </ul>
//       </nav>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/user" element={<UserPage />} />
//         <Route path="/bj" element={<AnimatedCard balance={balance} setBalance={setBalance} />} />
//       </Routes>
//       <footer>
//         <div className="footer-content">
//           <div className="footer-column">
//             <h3>Popularne Gry</h3>
//             <ul>
//               <li><Link to="/game1">Gra 1</Link></li>
//               <li><Link to="/game2">Gra 2</Link></li>
//               <li><Link to="/game3">Gra 3</Link></li>
//             </ul>
//           </div>
//           <div className="footer-column">
//             <h3>Pomoc</h3>
//             <ul>
//               <li><Link to="/help1">Pomoc 1</Link></li>
//               <li><Link to="/help2">Pomoc 2</Link></li>
//               <li><Link to="/help3">Pomoc 3</Link></li>
//             </ul>
//           </div>
//           <div className="footer-column">
//             <h3>Zasady</h3>
//             <ul>
//               <li><Link to="/rules1">Zasady 1</Link></li>
//               <li><Link to="/rules2">Zasady 2</Link></li>
//               <li><Link to="/rules3">Zasady 3</Link></li>
//             </ul>
//           </div>
//         </div>
//       </footer>
//     </Router>
//   );
// };
// export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import AnimatedCard from './AnimatedCard';
import UserPage from './UserPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import RequireAuth from './RequireAuth';
import './index.css';

import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { Panel } from './components/Panel/Panel';
import { NavigationPanel } from './components/NavigationPanel/NavigationPanel';
import { Footer } from './components/Footer/Footer/Footer';
import { Mines } from './components/Games/Mines/Mines';
import { DragonTower } from './components/Games/DragonTower/DragonTower';

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => setIsPanelOpen(prev => !prev);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <Router>
       <Header togglePanel={togglePanel} />
      <Panel
        isPanelOpen={isPanelOpen}
        closePanel={closePanel}
      />
      <NavigationPanel />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/" element={<RequireAuth> <Home /> </RequireAuth>} />
        <Route path="/about" element={<RequireAuth> <About /> </RequireAuth>} />
        <Route path="/contact" element={<RequireAuth><Contact /> </RequireAuth>} />
        <Route path="/bj" element={<RequireAuth> <AnimatedCard /> </RequireAuth>} />
        <Route path="/mines" element={<RequireAuth> <Mines /> </RequireAuth>} />
        <Route path="/dragontower" element={<RequireAuth> <DragonTower /> </RequireAuth>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
