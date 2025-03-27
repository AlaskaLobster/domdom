const express = require('express');

const mysql = require('mysql');
const cors = require('cors'); // Thêm middleware CORS
const app = express();
const port = 5000;

// Thiết lập middleware CORS
app.use(cors()); // Cho phép tất cả các nguồn truy cập vào API
app.use(express.json()); // Thêm middleware để phân tích cú pháp JSON

// Thiết lập kết nối tới cơ sở dữ liệu MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Sử dụng tên người dùng MySQL
    password: '', // Sử dụng mật khẩu rỗng
    database: 'qlhocsinh' // Tên cơ sở dữ liệu
});

// Kết nối tới cơ sở dữ liệu
db.connect(err => {
    if (err) {
        console.error('Lỗi kết nối tới cơ sở dữ liệu:', err);
        return;
    }
    console.log('Kết nối tới cơ sở dữ liệu thành công!');
});

app.get('/api/giaovien', (req, res) => {
    db.query('SELECT * FROM giaovien', (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi lấy danh sách giáo viên.');
        }
        res.json(results);
    });
});

app.get('/api/giaovien', (req, res) => {
    db.query('SELECT * FROM giaovien', (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi lấy danh sách giáo viên.');
        }
        res.json(results);
    });
});

app.post('/api/login', (req, res) => {
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

app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi lấy danh sách người dùng.');
        }
        res.json(results);
    });
});

// Định nghĩa các API







app.get('/api/hocsinh', (req, res) => {
    db.query('SELECT * FROM hocsinh', (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi lấy danh sách học sinh.');
        }
        res.json(results);
    });
});

// Endpoint RESTful cho môn học
app.get('/api/monhoc', (req, res) => {
    db.query('SELECT * FROM monhoc', (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi lấy danh sách môn học.');
        }
        res.json(results);
    });
});

app.post('/api/monhoc', (req, res) => {
    const { tenMonHoc } = req.body;
    db.query('INSERT INTO monhoc (tenMonHoc) VALUES (?)', [tenMonHoc], (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi thêm môn học.');
        }
        res.status(201).send('Môn học đã được thêm thành công.');
    });
});

app.put('/api/monhoc/:id', (req, res) => {
    const { id } = req.params;
    const { tenMonHoc } = req.body;
    db.query('UPDATE monhoc SET tenMonHoc = ? WHERE id = ?', [tenMonHoc, id], (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi cập nhật môn học.');
        }
        res.send('Môn học đã được cập nhật thành công.');
    });
});

app.delete('/api/monhoc/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM monhoc WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi xóa môn học.');
        }
        res.send('Môn học đã được xóa thành công.');
    });
});

// Endpoint RESTful cho bài tập
app.get('/api/homework', (req, res) => {
    db.query('SELECT * FROM homework', (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi lấy danh sách bài tập.');
        }
        res.json(results);
    });
});

app.post('/api/homework', (req, res) => {
    const { MaLop, content, deadline } = req.body;
    db.query('INSERT INTO homework (MaLop, content, deadline) VALUES (?, ?, ?)', [MaLop, content, deadline], (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi thêm bài tập.');
        }
        res.status(201).send('Bài tập đã được thêm thành công.');
    });
});

app.put('/api/homework/:id', (req, res) => {
    const { id } = req.params;
    const { content, deadline } = req.body;
    db.query('UPDATE homework SET content = ?, deadline = ? WHERE id = ?', [content, deadline, id], (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi cập nhật bài tập.');
        }
        res.send('Bài tập đã được cập nhật thành công.');
    });
});

app.delete('/api/homework/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM homework WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi xóa bài tập.');
        }
        res.send('Bài tập đã được xóa thành công.');
    });
});

// Endpoint RESTful cho lớp học
app.get('/api/lop', (req, res) => {
    db.query('SELECT * FROM lop', (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi lấy danh sách lớp học.');
        }
        res.json(results);
    });
});

app.post('/api/lop', (req, res) => {
    const { tenLop } = req.body;
    db.query('INSERT INTO lop (tenLop) VALUES (?)', [tenLop], (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi thêm lớp học.');
        }
        res.status(201).send('Lớp học đã được thêm thành công.');
    });
});

app.put('/api/lop/:id', (req, res) => {
    const { id } = req.params;
    const { tenLop } = req.body;
    db.query('UPDATE lop SET tenLop = ? WHERE id = ?', [tenLop, id], (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi cập nhật lớp học.');
        }
        res.send('Lớp học đã được cập nhật thành công.');
    });
});

app.delete('/api/lop/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM lop WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi xóa lớp học.');
        }
        res.send('Lớp học đã được xóa thành công.');
    });
});

// Endpoint RESTful cho điểm danh
app.get('/api/diemdanh', (req, res) => {
    db.query('SELECT * FROM diemdanh', (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi lấy danh sách điểm danh.');
        }
        res.json(results);
    });
});

app.post('/api/diemdanh', (req, res) => {
    const { MaLop, MaHocSinh, trangThai } = req.body;
    db.query('INSERT INTO diemdanh (MaLop, MaHocSinh, trangThai) VALUES (?, ?, ?)', [MaLop, MaHocSinh, trangThai], (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi thêm điểm danh.');
        }
        res.status(201).send('Điểm danh đã được thêm thành công.');
    });
});

app.put('/api/diemdanh/:id', (req, res) => {
    const { id } = req.params;
    const { trangThai } = req.body;
    db.query('UPDATE diemdanh SET trangThai = ? WHERE id = ?', [trangThai, id], (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi cập nhật điểm danh.');
        }
        res.send('Điểm danh đã được cập nhật thành công.');
    });
});

app.delete('/api/diemdanh/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM diemdanh WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi xóa điểm danh.');
        }
        res.send('Điểm danh đã được xóa thành công.');
    });
});


app.post('/api/hocsinh/assign-homework', (req, res) => {
    const { MaLop, homeworkContent, deadline } = req.body; // Nhận thông tin từ yêu cầu

    // Kiểm tra xem lớp có tồn tại không
    db.query('SELECT * FROM lop WHERE MaLop = ?', [MaLop], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).send('Lớp không tồn tại.');
        }
    });

    // Kiểm tra xem học sinh có tồn tại không
    db.query('SELECT * FROM hocsinh WHERE MaLop = ?', [MaLop], (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).send('Không có học sinh trong lớp này.');
        }
    });

    const createdAt = new Date().toISOString();
    
    db.query('INSERT INTO homework (MaLop, content, deadline, created_at) VALUES (?, ?, ?, ?)', [MaLop, homeworkContent, deadline, createdAt], (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi giao bài tập.');
        }
        res.send(`Đã giao bài tập cho lớp với ID: ${MaLop}`);
    });
});
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Simulated user data
    const users = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'teacher', password: 'teacher123', role: 'teacher' },
        { username: 'student', password: 'student123', role: 'student' }
    ];

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        return res.json({ success: true, role: user.role });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});



app.get('/api/homework', (req, res) => {
    db.query('SELECT * FROM homework', (err, results) => {
        if (err) {
            return res.status(500).send('Lỗi khi lấy danh sách bài tập.');
        }
        res.json(results);
    });
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



// Khởi động server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
