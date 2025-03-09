const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Dữ liệu người dùng tạm thời
const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'teacher', password: 'teacher123', role: 'teacher' },
  { username: 'student', password: 'student123', role: 'student' }
];

// Endpoint đăng nhập
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true, role: user.role });
  } else {
    res.status(401).json({ success: false, message: 'Thông tin đăng nhập không hợp lệ' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
