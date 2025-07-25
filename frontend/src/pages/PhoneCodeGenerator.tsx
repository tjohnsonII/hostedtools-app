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
