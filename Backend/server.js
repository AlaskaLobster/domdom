const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const mysql = require('mysql'); // Import MySQL

const app = express();
const PORT = 5000 ;


app.use(cors()); // Use CORS middleware
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // MySQL username
    password: '', // MySQL password

    database: 'qlhocsinh' // Replace with your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body; // Get username and password from request body
    console.log('Incoming request for login with username:', username); // Log incoming requests with username

    // Dummy authentication logic for multiple roles
    let response;
    if (username === 'admin' && password === 'admin123') {
        response = { success: true, role: 'admin' };
    } else if (username === 'teacher' && password === 'teacher123') {
        response = { success: true, role: 'teacher' };
    } else if (username === 'student' && password === 'student123') {
        response = { success: true, role: 'student' };
    } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    console.log('Response data:', response); // Log the response data for debugging
    res.json(response); // Send the response
});

// Endpoint for fetching students
app.get('/api/hocsinh', (req, res) => {
    console.log('Fetching students data'); // Log when fetching students
    db.query('SELECT * FROM hocsinh', (err, results) => {

        if (err) {
            console.error('Error fetching students:', err);
            return res.status(500).json({ error: 'Error fetching students' });
        }
        res.json(results); // Return the fetched student data
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
