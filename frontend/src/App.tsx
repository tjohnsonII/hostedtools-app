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
import './css/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Phone Code Generator</Link></li>
            <li><Link to="/expansion">Expansion Module Generator</Link></li>
            <li><Link to="/fullconfig">Full Config</Link></li>
            <li><Link to="/mikrotik">Mikrotik Code Generator</Link></li>
            <li><Link to="/switch">Switch Code Generator</Link></li>
            <li><Link to="/fax">Fax Code Generator</Link></li>
            <li><Link to="/callcenter">Call Center</Link></li>
            <li><Link to="/diagnostics">Diagnostics</Link></li>
            <li><Link to="/reference">Reference</Link></li>
          </ul>
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
