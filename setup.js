import 'dotenv/config';
import pool from './db.js';

(async function setup() {
    try {
        const connection = await pool.getConnection();

        const query = `
            CREATE TABLE IF NOT EXISTS products (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) NOT NULL
            )
        `;

        await connection.query(query);

        connection.release();
    } catch (error) {
        console.error('Error creating table:', error);
    }
})();