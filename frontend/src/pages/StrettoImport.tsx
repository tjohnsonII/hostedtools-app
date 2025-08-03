import React, { useState } from 'react';
import '../css/navigationbar.css';

const BACKEND_URL = 'http://192.168.254.253:5000'; // Change if needed

const StrettoImport: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState<Array<Record<string, any>>>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
    setRows([]);
    setColumns([]);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch(`${BACKEND_URL}/upload/stretto`, {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        setRows(json.data);
        setColumns(Object.keys(json.data[0]));
      } else {
        setRows([]);
        setColumns([]);
        setError('No data returned from backend.');
      }
    } catch (err: any) {
      setError('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stretto-import">
      <h2>Stretto Import</h2>
      <label htmlFor="stretto-file-upload">Upload .xlsm/.xlsx file:</label>
      <input
        id="stretto-file-upload"
        type="file"
        accept=".xls,.xlsx,.xlsm"
        onChange={handleFileChange}
        title="Upload Stretto import spreadsheet"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="stretto-upload-btn"
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <div className="stretto-error">{error}</div>}
      {rows.length > 0 && (
        <table className="stretto-table stretto-table-margin">
          <thead>
            <tr>
              {columns.map(col => <th key={col}>{col}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map(col => (
                  <td key={col}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StrettoImport;
