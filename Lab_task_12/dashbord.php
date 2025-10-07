<?php
require_once 'db_connect.php';

// Handle success/error messages
$message = '';
if (isset($_GET['success'])) {
    if ($_GET['success'] == 'updated') {
        $message = '<div class="alert alert-success">Student record updated successfully!</div>';
    } elseif ($_GET['success'] == 'deleted') {
        $message = '<div class="alert alert-success">Student record deleted successfully!</div>';
    } elseif ($_GET['success'] == 'added') {
        $message = '<div class="alert alert-success">Student added successfully!</div>';
    }
}

// Fetch all students
$sql = "SELECT * FROM students ORDER BY id DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Management Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            padding: 30px;
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2.5em;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #667eea;
        }

        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover {
            background: #5568d3;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-edit {
            background: #48bb78;
            color: white;
            padding: 8px 16px;
            font-size: 13px;
        }

        .btn-edit:hover {
            background: #38a169;
        }

        .btn-delete {
            background: #f56565;
            color: white;
            padding: 8px 16px;
            font-size: 13px;
        }

        .btn-delete:hover {
            background: #e53e3e;
        }

        .alert {
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-weight: 500;
        }

        .alert-success {
            background: #c6f6d5;
            color: #22543d;
            border-left: 4px solid #48bb78;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: white;
        }

        thead {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        th, td {
            padding: 15px;
            text-align: left;
        }

        th {
            font-weight: 600;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 0.5px;
        }

        tbody tr {
            border-bottom: 1px solid #e2e8f0;
            transition: background 0.2s ease;
        }

        tbody tr:hover {
            background: #f7fafc;
        }

        .actions {
            display: flex;
            gap: 10px;
        }

        .no-records {
            text-align: center;
            padding: 40px;
            color: #718096;
            font-size: 18px;
        }

        .student-count {
            color: #718096;
            font-size: 14px;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div>
                <h1>📚 Student Management Dashboard</h1>
                <p class="student-count">
                    <?php 
                    $count = $result->num_rows;
                    echo "Total Students: " . $count;
                    ?>
                </p>
            </div>
            <a href="add_student.php" class="btn btn-primary">+ Add New Student</a>
        </div>

        <?php echo $message; ?>

        <?php if ($result->num_rows > 0): ?>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($row = $result->fetch_assoc()): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($row['id']); ?></td>
                            <td><?php echo htmlspecialchars($row['name']); ?></td>
                            <td><?php echo htmlspecialchars($row['email']); ?></td>
                            <td><?php echo htmlspecialchars($row['course']); ?></td>
                            <td>
                                <div class="actions">
                                    <a href="edit_student.php?id=<?php echo $row['id']; ?>" 
                                       class="btn btn-edit">✏️ Edit</a>
                                    <a href="delete_student.php?id=<?php echo $row['id']; ?>" 
                                       class="btn btn-delete"
                                       onclick="return confirm('Are you sure you want to delete this student?\n\nName: <?php echo htmlspecialchars($row['name']); ?>\nEmail: <?php echo htmlspecialchars($row['email']); ?>');">
                                       🗑️ Delete
                                    </a>
                                </div>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        <?php else: ?>
            <div class="no-records">
                <p>📭 No students found in the database.</p>
                <p style="margin-top: 10px;">Click "Add New Student" to get started!</p>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>

<?php
$conn->close();
?>