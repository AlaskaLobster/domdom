const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",  // Thay bằng username MySQL của bạn
    password: "",  // Nếu có mật khẩu thì điền vào
    database: "student_management"  // Đảm bảo trùng với tên trong file SQL
});

connection.connect(err => {
    if (err) {
        console.error("Lỗi kết nối MySQL:", err);
    } else {
        console.log("Kết nối MySQL thành công!");
    }
});

module.exports = connection;
