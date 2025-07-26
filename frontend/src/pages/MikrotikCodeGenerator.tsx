import React, { useState } from 'react';
import '../css/navigationbar.css';
import '../css/MikrotikCodeGenerator.css';

// Example template with placeholders
const mikrotikTemplate = `/interface vlan\nadd interface={{INTERFACE}} name=vlan{{VLAN_ID}} vlan-id={{VLAN_ID}}\n/ip pool\nadd name=Phones ranges={{DHCP_RANGE}}\n/ip dhcp-server\nadd address-pool=Phones interface=vlan{{VLAN_ID}} name="Phones DHCP"\n/ip address\nadd address={{GATEWAY}} interface=vlan{{VLAN_ID}} network={{NETWORK}}\n/ip dhcp-server network\nadd address={{NETWORK}} dns-server={{DNS_SERVERS}} gateway={{GATEWAY}} netmask=24\n`;

function substituteTemplate(template: string, values: Record<string, string>) {
  return template.replace(/{{(\w+)}}/g, (_, key) => values[key] || '');
}

const MikrotikCodeGenerator: React.FC = () => {
  const [form, setForm] = useState({
    INTERFACE: '',
    VLAN_ID: '',
    DHCP_RANGE: '',
    GATEWAY: '',
    NETWORK: '',
    DNS_SERVERS: '',
  });
  const [generated, setGenerated] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    setGenerated(substituteTemplate(mikrotikTemplate, form));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated);
  };

  return (
    <div className="mikrotik-code-generator">
      <h2>Mikrotik Code Generator</h2>
      <form onSubmit={e => { e.preventDefault(); handleGenerate(); }}>
        <input name="INTERFACE" placeholder="Interface (e.g. ether9)" title="Interface" value={form.INTERFACE} onChange={handleChange} />
        <input name="VLAN_ID" placeholder="VLAN ID (e.g. 202)" title="VLAN ID" value={form.VLAN_ID} onChange={handleChange} />
        <input name="DHCP_RANGE" placeholder="DHCP Range (e.g. 172.16.1.3-172.16.1.10)" title="DHCP Range" value={form.DHCP_RANGE} onChange={handleChange} />
        <input name="GATEWAY" placeholder="Gateway (e.g. 172.16.1.1/24)" title="Gateway" value={form.GATEWAY} onChange={handleChange} />
        <input name="NETWORK" placeholder="Network (e.g. 172.16.1.0)" title="Network" value={form.NETWORK} onChange={handleChange} />
        <input name="DNS_SERVERS" placeholder="DNS Servers (e.g. 1.1.1.1,8.8.8.8)" title="DNS Servers" value={form.DNS_SERVERS} onChange={handleChange} />
        <button type="submit">Generate Code</button>
      </form>
      <textarea value={generated} readOnly rows={10} className="generated-code-textarea" placeholder="Generated Mikrotik code will appear here" title="Generated Mikrotik code" />
      <button onClick={handleCopy} disabled={!generated}>Copy to Clipboard</button>
    </div>
  );
};

export default MikrotikCodeGenerator;
