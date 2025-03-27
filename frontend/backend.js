const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

// Thiết lập kết nối với MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Thay thế bằng tên người dùng MySQL của bạn
    password: '', // Thay thế bằng mật khẩu MySQL của bạn
    database: 'qlhocsinh' // Thay thế bằng tên cơ sở dữ liệu của bạn
});

// Kết nối đến cơ sở dữ liệu
db.connect((err) => {
    if (err) {
        console.error('Could not connect to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

app.get('/api/hocsinh', (req, res) => {
    // Endpoint để lấy dữ liệu từ bảng hocsinh
    db.query('SELECT * FROM hocsinh', (err, results) => {
        if (err) {
            console.error('Error fetching data from hocsinh:', err);
            return res.status(500).json({ success: false, message: 'Error fetching data' });
        }
        res.json({ success: true, data: results });
    });
    res.header("Access-Control-Allow-Origin", "*"); // Thêm header CORS
});


const PORT = 5000 ;



app.use(cors({
    origin: '*', // Cho phép tất cả các nguồn
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Cho phép các phương thức này
}));

console.log('CORS middleware is set up to allow all origins');


app.use(bodyParser.json());

// Endpoint cho đăng nhập
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log('Incoming request for login with username:', username);

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

    console.log('Response data:', response);
    res.json(response);
});

// Endpoint cho đăng ký người dùng
app.post('/api/users', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Registering user:', req.body);

    // Ở đây bạn sẽ lưu người dùng vào cơ sở dữ liệu
    // Tạo một người dùng mới
    const user = new User({
        name,
        email,
        password,
    });

    try {
        // Lưu người dùng vào cơ sở dữ liệu
        await user.save();
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Error registering user' });
    }
});

app.get('/api/monhoc', (req, res) => {
    db.query('SELECT * FROM monhoc', (err, results) => {
        if (err) {
            console.error('Error fetching data from monhoc:', err);
            return res.status(500).json({ success: false, message: 'Error fetching data' });
        }
        res.json({ success: true, data: results });
    });
});

app.get('/api/diemtrungbinh', (req, res) => {
    console.log('Request received for /api/diemtrungbinh');

    db.query('SELECT * FROM diemtrungbinh', (err, results) => {
        // Endpoint to fetch grade data
        if (err) {
            console.error('Error fetching data from diemtrungbinh:', err);
            return res.status(500).json({ success: false, message: 'Error fetching data' });
        }
        res.json({ success: true, data: results });
    });
});

// New endpoint for classes
app.get('/api/lop', (req, res) => {
    console.log('Request received for /api/lop');

    db.query('SELECT * FROM lop ', (err, results) => {
        // Endpoint to fetch class data
        if (err) {
            console.error('Error fetching data from lop:', err);
            return res.status(500).json({ success: false, message: 'Error fetching data' });
        }
        res.json({ success: true, data: results });
    });
});

// New endpoint for attendance
app.get('/api/diemdanh', (req, res) => {
    console.log('Request received for /api/diemdanh');

    db.query('SELECT * FROM diemdanh ', (err, results) => {
        // Endpoint to fetch attendance data
        if (err) {
            console.error('Error fetching data from diemdanh:', err);
            return res.status(500).json({ success: false, message: 'Error fetching data' });
        }
        res.json({ success: true, data: results });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
