import express from 'express';
import 'dotenv/config';
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
    try {
        res.send('Hello, World!');
    } catch (error) {
        res.status(500).send('An error occurred');
    }
});

app.post('/', (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        return res.status(400).send('Name and Age are required!');
    }

    try {
        res.status(201).send('Success');
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.get('/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (error) {
        res.status(500).send('Error getting prodiucts');
    }
});

app.post('/products', async (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).send('Name and Price are required!');
    }

    try {
        const [result] = await pool.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
        res.status(201).send(`Product ${result.insertId} added successfully`);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});