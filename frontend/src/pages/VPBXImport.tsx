import React, { useState } from 'react';
import '../css/navigationbar.css';
// You need to install papaparse: npm install papaparse
import Papa from 'papaparse';

const defaultColumns = [
  'Bill:', 'Row', 'Device ID', 'DirectoryName', 'CID/911CID', 'Site Code', 'WebOrder', 'Attendent', 'D60', 'Attrib Count', 'ASSET ID', 'MAC', 'Make', 'Model', 'ADD|CSV'
];

const VPBXImport: React.FC = () => {
  const [columns, setColumns] = useState<string[]>(defaultColumns);
  const [rows, setRows] = useState<Array<Record<string, string>>>([
    Object.fromEntries(defaultColumns.map(col => [col, ''])),
  ]);

  // Handle file upload and parse
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result: Papa.ParseResult<Record<string, string>>) => {
        const data = result.data;
        if (data.length > 0) {
          setColumns(Object.keys(data[0]));
          setRows(data);
        }
      },
    });
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
    <div className="vpbx-import">
      <h2>VPBX Import</h2>
      <label htmlFor="vpbx-file-upload">Upload CSV file:</label>
      <input
        id="vpbx-file-upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        title="Upload VPBX import CSV"
      />
      <table className="vpbx-table">
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

export default VPBXImport;
