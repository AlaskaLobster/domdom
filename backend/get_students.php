<?php
// backend/get_students.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection details
$host = 'localhost';
$dbname = 'qlhocsinh';
$username = 'root';
$password = '';

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    
    // Set error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Prepare and execute query with error handling
    $stmt = $pdo->prepare("SELECT * FROM hocsinh");
    $stmt->execute();
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Basic data validation
    $validatedStudents = array_map(function($student) {
        return [
            'id' => $student['MaHocSinh'] ?? null,
            'ten_hs' => $student['HoTen'] ?? 'Chưa xác định',
            'tuoi' => $student['tuoi'] ?? null,
            'lop' => $student['lop'] ?? 'Chưa phân lớp',
            'diem_tb' => $student['Diemkhongche'] ?? null,
             'email'=>$student['Email'] ?? null,
            'ngay_sinh' => $student['NgaySinh'] ?? null
            
        ];

    },
    $students);
    
    // Return JSON response
    echo json_encode($validatedStudents);
} catch(PDOException $e) {
    // Handle connection errors
    http_response_code(500);
    echo json_encode([
        'error' => 'Database connection failed',
        'message' => $e->getMessage()
    ]);
}
?>
