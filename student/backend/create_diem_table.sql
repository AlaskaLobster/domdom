-- Tạo bảng diem
CREATE TABLE diem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    score FLOAT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES hoc_sinhs(id),
    FOREIGN KEY (subject_id) REFERENCES mon_hoc(id)
);
