<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <style>
        body {
            display: flex;
        }
        .sidebar {
            width: 250px;
            background-color: #343a40;
            color: white;
            padding: 15px;
        }
        .sidebar a {
            color: white;
            text-decoration: none;
            display: block;
            padding: 10px;
        }
        .sidebar a:hover {
            background-color: #495057;
        }
        .content {
            flex: 1;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <h2>Dashboard</h2>
        <a href="/api/students">Quản lý sinh viên</a>
        <a href="/api/classes">Quản lý lớp học</a>
        <a href="/api/subjects">Quản lý môn học</a>
        <a href="/api/academic-levels">Quản lý cấp học</a>
        <a href="/api/grade-levels">Quản lý khối lớp</a>
        <a href="/api/academic-years">Quản lý năm học</a>
    </div>
    <div class="content">
        <h1>Welcome to the Dashboard</h1>
        <p>This is your dashboard where you can manage your application.</p>
    </div>
</body>
</html>
