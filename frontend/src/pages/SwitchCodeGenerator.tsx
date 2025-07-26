import React, { useState } from 'react';
import '../css/navigationbar.css';
import '../css/SwitchCodeGenerator.css';

const templates: Record<string, string> = {
  '8': `hostname {{HOSTNAME}}\ninterface Vlan102\n ip address {{MGMT_IP}} 255.255.255.0\ninterface Vlan202\n ip address {{PHONE_IP}} 255.255.255.0\n!\nbanner motd ^C\n{{ASSET_TAG}}\n^C\nend\n`,
  '24': `hostname {{HOSTNAME}}\ninterface Vlan102\n ip address {{MGMT_IP}} 255.255.255.0\ninterface Vlan202\n ip address {{PHONE_IP}} 255.255.255.0\n!\nbanner motd ^C\n{{ASSET_TAG}}\n^C\nend\n`,
  '48': `hostname {{HOSTNAME}}\ninterface Vlan102\n ip address {{MGMT_IP}} 255.255.255.0\ninterface Vlan202\n ip address {{PHONE_IP}} 255.255.255.0\n!\nbanner motd ^C\n{{ASSET_TAG}}\n^C\nend\n`,
};

function substituteTemplate(template: string, values: Record<string, string>) {
  return template.replace(/{{(\w+)}}/g, (_, key) => values[key] || '');
}

const SwitchCodeGenerator: React.FC = () => {
  const [model, setModel] = useState('8');
  const [form, setForm] = useState({
    HOSTNAME: '',
    MGMT_IP: '',
    PHONE_IP: '',
    ASSET_TAG: '',
  });
  const [generated, setGenerated] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
  };

  const handleGenerate = () => {
    setGenerated(substituteTemplate(templates[model], form));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated);
  };

  const handleDownload = () => {
    const blob = new Blob([generated], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `switch-config-${model}port.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="switch-code-generator">
      <h2>Switch Code Generator</h2>
      <label>
        Switch Model:
        <select value={model} onChange={handleModelChange}>
          <option value="8">8 Port</option>
          <option value="24">24 Port</option>
          <option value="48">48 Port</option>
        </select>
      </label>
      <form onSubmit={e => { e.preventDefault(); handleGenerate(); }}>
        <input name="HOSTNAME" placeholder="Hostname" title="Hostname" value={form.HOSTNAME} onChange={handleChange} />
        <input name="MGMT_IP" placeholder="MGMT IP (e.g. 192.168.10.11)" title="MGMT IP" value={form.MGMT_IP} onChange={handleChange} />
        <input name="PHONE_IP" placeholder="Phone IP (e.g. 172.16.1.2)" title="Phone IP" value={form.PHONE_IP} onChange={handleChange} />
        <input name="ASSET_TAG" placeholder="Asset Tag" title="Asset Tag" value={form.ASSET_TAG} onChange={handleChange} />
        <button type="submit">Generate Code</button>
      </form>
      <textarea value={generated} readOnly rows={12} className="generated-code-textarea" placeholder="Generated switch code will appear here" title="Generated switch code" />
      <button onClick={handleCopy} disabled={!generated}>Copy to Clipboard</button>
      <button onClick={handleDownload} disabled={!generated}>Download as .txt</button>
    </div>
  );
};

export default SwitchCodeGenerator;
