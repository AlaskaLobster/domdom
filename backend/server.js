const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Cấu hình kết nối MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Thay đổi nếu dùng user khác
    password: "",  // Nếu có mật khẩu, thêm vào đây
    database: "qlhocsinh" // Đổi theo database của bạn
});

// Kết nối Database
db.connect(err => {
    if (err) {
        console.error("❌ Lỗi kết nối MySQL:", err);
        return;
    }
    console.log("✅ Kết nối MySQL thành công!");
});

// API lấy danh sách học sinh
app.get("/api/hocsinh", (req, res) => {
    const sql = "SELECT * FROM hoc_sinhs"; // Kiểm tra tên bảng có đúng không

    db.query(sql, (err, results) => {
        if (err) {
            console.error("❌ Lỗi MySQL:", err);
            return res.status(500).json({ error: "Lỗi truy vấn MySQL" });
        }
        if (!results || results.length === 0) {
            console.warn("⚠️ Không có dữ liệu học sinh trong database!");
            return res.status(404).json({ error: "Không có dữ liệu học sinh" });
        }
        res.json(results);
    });
});

// Chạy server trên cổng 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
