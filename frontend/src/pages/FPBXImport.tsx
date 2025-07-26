import React, { useState } from 'react';
import '../css/navigationbar.css';
// You need to install xlsx: npm install xlsx
import * as XLSX from 'xlsx';

const defaultColumns = ['Extension', 'Name', 'Email', 'Phone', 'Department'];

const FPBXImport: React.FC = () => {
  const [columns, setColumns] = useState<string[]>(defaultColumns);
  const [rows, setRows] = useState<Array<Record<string, string>>>([
    { Extension: '', Name: '', Email: '', Phone: '', Department: '' },
  ]);

  // Handle file upload and parse
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json<Record<string, string>>(worksheet, { defval: '' });
      if (json.length > 0) {
        setColumns(Object.keys(json[0]));
        setRows(json);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Handle cell edit
  const handleCellChange = (rowIdx: number, col: string, value: string) => {
    const updatedRows = rows.map((row, idx) =>
      idx === rowIdx ? { ...row, [col]: value } : row
    );
    setRows(updatedRows);
  };

  // Add/remove row
  const addRow = () => setRows([...rows, Object.fromEntries(columns.map(c => [c, '']))]);
  const removeRow = (idx: number) => setRows(rows.filter((_, i) => i !== idx));

  return (
    <div className="fpbx-import">
      <h2>FPBX Import</h2>
      <label htmlFor="fpbx-file-upload">Upload .xlsm/.xlsx file:</label>
      <input
        id="fpbx-file-upload"
        type="file"
        accept=".xls,.xlsx,.xlsm"
        onChange={handleFileUpload}
        title="Upload FPBX import spreadsheet"
      />
      <table className="fpbx-table">
        <thead>
          <tr>
            {columns.map(col => <th key={col}>{col}</th>)}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {columns.map(col => (
                <td key={col}>
                  <input
                    type="text"
                    value={row[col] || ''}
                    onChange={e => handleCellChange(rowIdx, col, e.target.value)}
                    placeholder={col}
                    title={col}
                  />
                </td>
              ))}
              <td>
                <button onClick={() => removeRow(rowIdx)} disabled={rows.length === 1}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add Row</button>
    </div>
  );
};

export default FPBXImport;
