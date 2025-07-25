import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PhoneCodeGenerator from './pages/PhoneCodeGenerator';
import ExpansionModuleGenerator from './pages/ExpansionModuleGenerator';
import FullConfig from './pages/FullConfig';
import MikrotikCodeGenerator from './pages/MikrotikCodeGenerator';
import SwitchCodeGenerator from './pages/SwitchCodeGenerator';
import FaxCodeGenerator from './pages/FaxCodeGenerator';
import CallCenter from './pages/CallCenter';
import Diagnostics from './pages/Diagnostics';
import Reference from './pages/Reference';
import './css/navigationbar.css';
import './css/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-logo">Hosted Tools</div>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Phone Code Generator</Link>
            <Link to="/expansion" className="navbar-link">Expansion Module Generator</Link>
            <Link to="/fullconfig" className="navbar-link">Full Config</Link>
            <Link to="/mikrotik" className="navbar-link">Mikrotik Code Generator</Link>
            <Link to="/switch" className="navbar-link">Switch Code Generator</Link>
            <Link to="/fax" className="navbar-link">Fax Code Generator</Link>
            <Link to="/callcenter" className="navbar-link">Call Center</Link>
            <Link to="/diagnostics" className="navbar-link">Diagnostics</Link>
            <Link to="/reference" className="navbar-link">Reference</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<PhoneCodeGenerator />} />
          <Route path="/expansion" element={<ExpansionModuleGenerator />} />
          <Route path="/fullconfig" element={<FullConfig />} />
          <Route path="/mikrotik" element={<MikrotikCodeGenerator />} />
          <Route path="/switch" element={<SwitchCodeGenerator />} />
          <Route path="/fax" element={<FaxCodeGenerator />} />
          <Route path="/callcenter" element={<CallCenter />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/reference" element={<Reference />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
