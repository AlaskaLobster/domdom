<?php
// backend/get_grades.php
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
    
    // Check if diem table exists
    $tableCheck = $pdo->query("SHOW TABLES LIKE 'diem'")->fetch();
    if (!$tableCheck) {
        throw new Exception("Table 'diem' does not exist in database '$dbname'");
    }
    
    // Prepare and execute query with error handling
    $stmt = $pdo->prepare("SELECT * FROM diem");
    $stmt->execute();
    $grades = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($grades)) {
        throw new Exception("No grades found in 'diem' table");
    }

    
    // Basic data validation
    $validatedGrades = array_map(function($grade) {
        return [
            'id' => $grade['id'] ?? null,
            'student_id' => $grade['student_id'] ?? null,
            'subject_id' => $grade['subject_id'] ?? null,
            'score' => $grade['score'] ?? null
        ];
    }, $grades);
    
    // Return JSON response
    echo json_encode($validatedGrades);
} catch(PDOException $e) {
    // Handle connection errors
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'error' => 'Database error',
        'message' => $e->getMessage(),
        'details' => [
            'host' => $host,
            'dbname' => $dbname,
            'username' => $username
        ]
    ]);
} catch(Exception $e) {
    // Handle other errors
    error_log("Application error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'error' => 'Application error',
        'message' => $e->getMessage()
    ]);

}
?>
