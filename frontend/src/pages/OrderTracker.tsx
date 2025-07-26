import React, { useState } from 'react';
import '../css/navigationbar.css';
import * as XLSX from 'xlsx';

const OrderTracker: React.FC = () => {
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<Array<Record<string, string>>>([]);

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

  const handleCellChange = (rowIdx: number, col: string, value: string) => {
    const updatedRows = rows.map((row, idx) =>
      idx === rowIdx ? { ...row, [col]: value } : row
    );
    setRows(updatedRows);
  };

  const addRow = () => setRows([...rows, Object.fromEntries(columns.map(c => [c, '']))]);
  const removeRow = (idx: number) => setRows(rows.filter((_, i) => i !== idx));

  return (
    <div className="order-tracker">
      <h2>Order Tracker</h2>
      <label htmlFor="order-file-upload">Upload .xlsx file:</label>
      <input
        id="order-file-upload"
        type="file"
        accept=".xls,.xlsx,.xlsm"
        onChange={handleFileUpload}
        title="Upload Order Tracking spreadsheet"
      />
      <table className="order-table">
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

export default OrderTracker;
