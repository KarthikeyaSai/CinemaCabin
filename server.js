
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'postgresql://postgres:Visu%402006@localhost/DBMS_Cinema_Cabin',
  database: 'DBMS_Cinema_Cabin',
  password: 'Visu@2006',
  port: 5173,
});

// Example API endpoint to fetch data
app.get('/api/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM your_table');
    res.json(result.rows);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send('Server error');
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});