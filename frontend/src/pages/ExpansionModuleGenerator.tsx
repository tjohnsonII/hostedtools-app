import React, { useState } from 'react';
import YealinkExpansionModule from '../images/YealinkExpansionModule.jpeg';
import PolycomExpansionModule from '../images/PolycomExpansionModule.jpeg';


const initialYealinkRow = { label: '', value: '', type: '', extension: '' };
const initialPolycomRow = { label: '', value: '', type: '', extension: '' };

const ExpansionModuleGenerator: React.FC = () => {
  const [yealinkRows, setYealinkRows] = useState([{ ...initialYealinkRow }]);
  const [moduleName, setModuleName] = useState('');
  const [baseExtension, setBaseExtension] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [polycomRows, setPolycomRows] = useState([{ ...initialPolycomRow }]);
  const [polycomModuleName, setPolycomModuleName] = useState('');
  const [polycomBaseExtension, setPolycomBaseExtension] = useState('');
  const [polycomGeneratedCode, setPolycomGeneratedCode] = useState('');

  const handleRowChange = (idx: number, field: string, value: string) => {
    const updatedRows = yealinkRows.map((row, i) =>
      i === idx ? { ...row, [field]: value } : row
    );
    setYealinkRows(updatedRows);
  };

  const addRow = () => setYealinkRows([...yealinkRows, { ...initialYealinkRow }]);
  const removeRow = (idx: number) => {
    if (yealinkRows.length > 1) {
      setYealinkRows(yealinkRows.filter((_, i) => i !== idx));
    }
  };

  const handleGenerateCode = () => {
    // Placeholder: Replace with real code generation logic
    const code = yealinkRows.map((row, idx) =>
      `Key ${idx + 1}: Label=${row.label}, Value=${row.value}, Type=${row.type}, Extension=${row.extension}`
    ).join('\n');
    setGeneratedCode(`# Module: ${moduleName}\n# Base Extension: ${baseExtension}\n${code}`);
  };

  const handlePolycomRowChange = (idx: number, field: string, value: string) => {
    const updatedRows = polycomRows.map((row, i) =>
      i === idx ? { ...row, [field]: value } : row
    );
    setPolycomRows(updatedRows);
  };

  const addPolycomRow = () => setPolycomRows([...polycomRows, { ...initialPolycomRow }]);
  const removePolycomRow = (idx: number) => {
    if (polycomRows.length > 1) {
      setPolycomRows(polycomRows.filter((_, i) => i !== idx));
    }
  };

  const handlePolycomGenerateCode = () => {
    // Placeholder: Replace with real code generation logic
    const code = polycomRows.map((row, idx) =>
      `Key ${idx + 1}: Label=${row.label}, Value=${row.value}, Type=${row.type}, Extension=${row.extension}`
    ).join('\n');
    setPolycomGeneratedCode(`# Module: ${polycomModuleName}\n# Base Extension: ${polycomBaseExtension}\n${code}`);
  };

  return (
    <div className="expansion-module-generator">
      <h2>Expansion Module Generator</h2>
      <div className="expansion-module-images">
        <div className="expansion-module-image-block yealink-block">
          <img src={YealinkExpansionModule} alt="Yealink Expansion Module" className="expansion-module-image" />
          <div className="expansion-module-label">Yealink</div>
          <div className="yealink-input-section">
            <div className="yealink-meta-fields">
              <input
                type="text"
                placeholder="Module Name"
                title="Module Name"
                value={moduleName}
                onChange={e => setModuleName(e.target.value)}
                className="yealink-meta-input"
              />
              <input
                type="text"
                placeholder="Base Extension"
                title="Base Extension"
                value={baseExtension}
                onChange={e => setBaseExtension(e.target.value)}
                className="yealink-meta-input"
              />
            </div>
            <table className="yealink-input-table">
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Value</th>
                  <th>Type</th>
                  <th>Extension</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {yealinkRows.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <input
                        type="text"
                        placeholder="Label"
                        title="Label"
                        value={row.label}
                        onChange={e => handleRowChange(idx, 'label', e.target.value)}
                        className="yealink-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Value"
                        title="Value"
                        value={row.value}
                        onChange={e => handleRowChange(idx, 'value', e.target.value)}
                        className="yealink-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Type"
                        title="Type"
                        value={row.type}
                        onChange={e => handleRowChange(idx, 'type', e.target.value)}
                        className="yealink-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Extension"
                        title="Extension"
                        value={row.extension}
                        onChange={e => handleRowChange(idx, 'extension', e.target.value)}
                        className="yealink-input"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="remove-row-btn"
                        onClick={() => removeRow(idx)}
                        aria-label="Remove row"
                        disabled={yealinkRows.length === 1}
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="add-row-btn" onClick={addRow} aria-label="Add row">+</button>
            <button type="button" className="generate-code-btn" onClick={handleGenerateCode} aria-label="Generate code">Generate Code</button>
            <div className="yealink-graphical-representation">
              {/* Simple graphical representation placeholder */}
              <div className="yealink-module-graphic">
                <span>Graphical representation of Yealink module here</span>
              </div>
            </div>
            <textarea
              className="generated-code-textarea"
              value={generatedCode}
              readOnly
              placeholder="Generated code will appear here"
              title="Generated code"
              rows={6}
            />
          </div>
        </div>
        <div className="expansion-module-image-block polycom-block">
          <img src={PolycomExpansionModule} alt="Polycom Expansion Module" className="expansion-module-image" />
          <div className="expansion-module-label">Polycom</div>
          <div className="polycom-input-section">
            <div className="polycom-meta-fields">
              <input
                type="text"
                placeholder="Module Name"
                title="Module Name"
                value={polycomModuleName}
                onChange={e => setPolycomModuleName(e.target.value)}
                className="polycom-meta-input"
              />
              <input
                type="text"
                placeholder="Base Extension"
                title="Base Extension"
                value={polycomBaseExtension}
                onChange={e => setPolycomBaseExtension(e.target.value)}
                className="polycom-meta-input"
              />
            </div>
            <table className="polycom-input-table">
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Value</th>
                  <th>Type</th>
                  <th>Extension</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {polycomRows.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <input
                        type="text"
                        placeholder="Label"
                        title="Label"
                        value={row.label}
                        onChange={e => handlePolycomRowChange(idx, 'label', e.target.value)}
                        className="polycom-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Value"
                        title="Value"
                        value={row.value}
                        onChange={e => handlePolycomRowChange(idx, 'value', e.target.value)}
                        className="polycom-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Type"
                        title="Type"
                        value={row.type}
                        onChange={e => handlePolycomRowChange(idx, 'type', e.target.value)}
                        className="polycom-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Extension"
                        title="Extension"
                        value={row.extension}
                        onChange={e => handlePolycomRowChange(idx, 'extension', e.target.value)}
                        className="polycom-input"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="remove-row-btn"
                        onClick={() => removePolycomRow(idx)}
                        aria-label="Remove row"
                        disabled={polycomRows.length === 1}
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button type="button" className="add-row-btn" onClick={addPolycomRow} aria-label="Add row">+</button>
            <button type="button" className="generate-code-btn" onClick={handlePolycomGenerateCode} aria-label="Generate code">Generate Code</button>
            <div className="polycom-graphical-representation">
              {/* Simple graphical representation placeholder */}
              <div className="polycom-module-graphic">
                <span>Graphical representation of Polycom module here</span>
              </div>
            </div>
            <textarea
              className="generated-code-textarea"
              value={polycomGeneratedCode}
              readOnly
              placeholder="Generated code will appear here"
              title="Generated code"
              rows={6}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpansionModuleGenerator;
