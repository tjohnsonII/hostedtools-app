const path = require('path');
const xlsx = require('xlsx');
const fs = require('fs');
const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI;
const client = new MongoClient(MONGO_URI);
const dbName = 'importapp';
const collectionName = 'stretto_imports';

let lastParsedData = [];

exports.handleUpload = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.deleteMany({}); // optional: clear old data
    await collection.insertMany(data);

    lastParsedData = data;
    res.status(200).json({ message: 'Uploaded successfully', data });
  } catch (err) {
    console.error('Upload failed:', err); // Log error to console for debugging
    res.status(500).json({ error: 'Failed to upload file', details: err.message });
  }
};

exports.getData = async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const data = await collection.find().toArray();

    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
};
