import React, { useState } from 'react';
import '../css/navigationbar.css';
import '../css/PhoneCodeGenerator.css';

const phoneTypes = [
  'Yealink',
  'Polycom',
];

const customOptions = [
  { key: 'mwi', label: 'Change Voicemail Indicator (MWI)' },
  { key: 'blfSteal', label: 'Enable BLF Line Steal' },
  { key: 'labelLength', label: 'Extend Line Label Length' },
  { key: 'missedCall', label: 'Disable Missed Call Notification/Light' },
  { key: 'recordUnavailable', label: 'Record Unavailable' },
  { key: 'recordBusy', label: 'Record Busy' },
  { key: 'recordName', label: 'Record Name' },
  { key: 'recordDND', label: 'Record DND/Unreachable' },
  { key: 'promptFeature', label: 'Prompt for Numerical Input (Feature Code)' },
  { key: 'timeDate', label: 'Time and Date Override' },
  { key: 'parkLines', label: 'Park Lines' },
];

const PhoneCodeGenerator: React.FC = () => {
  const [selectedPhone, setSelectedPhone] = useState(phoneTypes[0]);
  const [useStandard, setUseStandard] = useState(true);
  const [selectedCustom, setSelectedCustom] = useState<string[]>([]);
  const [config, setConfig] = useState('');
  const [pbxServer, setPbxServer] = useState('');
  const [pbxSecret, setPbxSecret] = useState('');
  const [extensionNum, setExtensionNum] = useState('');
  const [labelName, setLabelName] = useState('');
  const [lineKeyNum, setLineKeyNum] = useState('');
  const [indexNum, setIndexNum] = useState('');
  const [lineKeys, setLineKeys] = useState([
    { lineKeyNum: '', labelName: '', extensionNum: '', type: '', value: '' }
  ]);

  const handleCustomChange = (key: string) => {
    setSelectedCustom(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleGenerate = () => {
    // Placeholder: Will tie in backend logic later
    let result = `Phone Type: ${selectedPhone}\n`;
    result += useStandard ? 'Standard config selected\n' : 'Standard config not selected\n';
    if (selectedCustom.length) {
      result += 'Custom options:\n';
      selectedCustom.forEach(opt => {
        const label = customOptions.find(o => o.key === opt)?.label;
        result += `- ${label}\n`;
      });
    }
    setConfig(result);
  };

  const handleLineKeyChange = (idx: number, field: string, value: string) => {
    setLineKeys(prev => prev.map((lk, i) => i === idx ? { ...lk, [field]: value } : lk));
  };

  const handleAddLineKey = () => {
    setLineKeys(prev => [...prev, { lineKeyNum: '', labelName: '', extensionNum: '', type: '', value: '' }]);
  };

  const handleRemoveLineKey = (idx: number) => {
    setLineKeys(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  };

  return (
    <div className="phone-code-generator">
      <h2>Phone Code Generator</h2>
      <div className="pcg-controls">
        <label htmlFor="phoneType">Select Phone Type:</label>
        <select
          id="phoneType"
          value={selectedPhone}
          onChange={e => setSelectedPhone(e.target.value)}
        >
          {phoneTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <div className="pcg-section">
          <label>
            <input
              type="checkbox"
              checked={useStandard}
              onChange={e => setUseStandard(e.target.checked)}
            />
            Use Standard Config
          </label>
          {useStandard && (
            <div className="pcg-extra-inputs">
              <label>
                PBX Server:
                <input
                  type="text"
                  value={pbxServer}
                  onChange={e => setPbxServer(e.target.value)}
                  placeholder="e.g. 216.109.194.130"
                />
              </label>
              <label>
                PBX Secret:
                <input
                  type="password"
                  value={pbxSecret}
                  onChange={e => setPbxSecret(e.target.value)}
                  placeholder="PBX Secret"
                />
              </label>
              <label>
                Extension Number:
                <input
                  type="number"
                  value={extensionNum}
                  onChange={e => setExtensionNum(e.target.value)}
                  min="1"
                  placeholder="e.g. 1001"
                />
              </label>
              <label>
                Label Name:
                <input
                  type="text"
                  value={labelName}
                  onChange={e => setLabelName(e.target.value)}
                  placeholder="e.g. Main Line Pickup"
                />
              </label>
              <label>
                Line Key Number:
                <input
                  type="number"
                  value={lineKeyNum}
                  onChange={e => setLineKeyNum(e.target.value)}
                  min="1"
                  placeholder="e.g. 1"
                />
              </label>
              <label>
                Index Number:
                <input
                  type="number"
                  value={indexNum}
                  onChange={e => setIndexNum(e.target.value)}
                  min="1"
                  placeholder="e.g. 1"
                />
              </label>
            </div>
          )}
        </div>
        <div className="pcg-section">
          <span>Custom Options:</span>
          {customOptions.map(opt => (
            <label key={opt.key} className="pcg-custom-option">
              <input
                type="checkbox"
                checked={selectedCustom.includes(opt.key)}
                onChange={() => handleCustomChange(opt.key)}
              />
              {opt.label}
            </label>
          ))}
        </div>
        <div className="pcg-section">
          <span>Line Keys</span>
          <table className="pcg-linekey-table">
            <thead>
              <tr>
                <th>Line Key #</th>
                <th>Label Name</th>
                <th>Extension #</th>
                <th>Type</th>
                <th>Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lineKeys.map((lk, idx) => (
                <tr key={idx}>
                  <td><input type="number" value={lk.lineKeyNum} onChange={e => handleLineKeyChange(idx, 'lineKeyNum', e.target.value)} min="1" placeholder="e.g. 1" title="Line Key Number" /></td>
                  <td><input type="text" value={lk.labelName} onChange={e => handleLineKeyChange(idx, 'labelName', e.target.value)} placeholder="e.g. Main Line" title="Label Name" /></td>
                  <td><input type="number" value={lk.extensionNum} onChange={e => handleLineKeyChange(idx, 'extensionNum', e.target.value)} min="1" placeholder="e.g. 1001" title="Extension Number" /></td>
                  <td><input type="text" value={lk.type} onChange={e => handleLineKeyChange(idx, 'type', e.target.value)} placeholder="e.g. 16 (BLF)" title="Type" /></td>
                  <td><input type="text" value={lk.value} onChange={e => handleLineKeyChange(idx, 'value', e.target.value)} placeholder="e.g. 1001" title="Value" /></td>
                  <td><button type="button" onClick={() => handleRemoveLineKey(idx)} disabled={lineKeys.length === 1}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="pcg-add-linekey-btn" onClick={handleAddLineKey}>Add Line Key</button>
        </div>
        <button onClick={handleGenerate} className="pcg-generate-btn">Generate Config</button>
      </div>
      <label htmlFor="pcg-output">Generated Configuration:</label>
      <textarea
        id="pcg-output"
        className="pcg-output"
        value={config}
        readOnly
        rows={16}
        placeholder="Generated config will appear here."
        title="Generated phone configuration output"
      />
    </div>
  );
};

export default PhoneCodeGenerator;
