<?php
require_once 'db_connect.php';

$errors = [];
$success = false;

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $course = trim($_POST['course']);

    // Validation
    if (empty($name)) {
        $errors[] = "Name is required.";
    } elseif (strlen($name) < 3) {
        $errors[] = "Name must be at least 3 characters long.";
    }

    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    } else {
        // Check if email already exists
        $check_sql = "SELECT id FROM students WHERE email = ?";
        $check_stmt = $conn->prepare($check_sql);
        $check_stmt->bind_param("s", $email);
        $check_stmt->execute();
        $check_result = $check_stmt->get_result();
        
        if ($check_result->num_rows > 0) {
            $errors[] = "Email already exists in the database.";
        }
        $check_stmt->close();
    }

    if (empty($course)) {
        $errors[] = "Course is required.";
    }

    // If no errors, insert into database
    if (empty($errors)) {
        $insert_sql = "INSERT INTO students (name, email, course) VALUES (?, ?, ?)";
        $insert_stmt = $conn->prepare($insert_sql);
        $insert_stmt->bind_param("sss", $name, $email, $course);
        
        if ($insert_stmt->execute()) {
            $insert_stmt->close();
            $conn->close();
            header("Location: management_dashboard.php?success=added");
            exit();
        } else {
            $errors[] = "Error adding record: " . $conn->error;
        }
        $insert_stmt->close();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New Student</title>
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
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .container {
            max-width: 600px;
            width: 100%;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            padding: 40px;
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2em;
            text-align: center;
        }

        .subtitle {
            text-align: center;
            color: #718096;
            margin-bottom: 30px;
            font-size: 14px;
        }

        .form-group {
            margin-bottom: 25px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #2d3748;
            font-weight: 600;
            font-size: 14px;
        }

        input, select {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 15px;
            transition: all 0.3s ease;
            font-family: inherit;
        }

        input:focus, select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .error-box {
            background: #fff5f5;
            border-left: 4px solid #f56565;
            padding: 15px;
            margin-bottom: 25px;
            border-radius: 8px;
        }

        .error-box ul {
            list-style: none;
        }

        .error-box li {
            color: #c53030;
            margin-bottom: 5px;
            font-size: 14px;
        }

        .error-box li:before {
            content: "⚠️ ";
            margin-right: 5px;
        }

        .button-group {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }

        .btn {
            flex: 1;
            padding: 14px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            text-align: center;
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

        .btn-secondary {
            background: #e2e8f0;
            color: #2d3748;
        }

        .btn-secondary:hover {
            background: #cbd5e0;
        }

        .required {
            color: #f56565;
        }

        .back-link {
            display: inline-block;
            margin-bottom: 20px;
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.2s ease;
        }

        .back-link:hover {
            color: #5568d3;
            transform: translateX(-5px);
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="management_dashboard.php" class="back-link">← Back to Dashboard</a>
        
        <h1>➕ Add New Student</h1>
        <p class="subtitle">Fill in the student information below</p>

        <?php if (!empty($errors)): ?>
            <div class="error-box">
                <ul>
                    <?php foreach ($errors as $error): ?>
                        <li><?php echo htmlspecialchars($error); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endif; ?>

        <form method="POST" action="">
            <div class="form-group">
                <label for="name">Full Name <span class="required">*</span></label>
                <input type="text" 
                       id="name" 
                       name="name" 
                       value="<?php echo isset($_POST['name']) ? htmlspecialchars($_POST['name']) : ''; ?>"
                       placeholder="Enter student's full name"
                       required>
            </div>

            <div class="form-group">
                <label for="email">Email Address <span class="required">*</span></label>
                <input type="email" 
                       id="email" 
                       name="email" 
                       value="<?php echo isset($_POST['email']) ? htmlspecialchars($_POST['email']) : ''; ?>"
                       placeholder="student@example.com"
                       required>
            </div>

            <div class="form-group">
                <label for="course">Course <span class="required">*</span></label>
                <select id="course" name="course" required>
                    <option value="">Select a course</option>
                    <option value="Computer Science" <?php echo (isset($_POST['course']) && $_POST['course'] == 'Computer Science') ? 'selected' : ''; ?>>Computer Science</option>
                    <option value="Information Technology" <?php echo (isset($_POST['course']) && $_POST['course'] == 'Information Technology') ? 'selected' : ''; ?>>Information Technology</option>
                    <option value="Software Engineering" <?php echo (isset($_POST['course']) && $_POST['course'] == 'Software Engineering') ? 'selected' : ''; ?>>Software Engineering</option>
                    <option value="Data Science" <?php echo (isset($_POST['course']) && $_POST['course'] == 'Data Science') ? 'selected' : ''; ?>>Data Science</option>
                    <option value="Cybersecurity" <?php echo (isset($_POST['course']) && $_POST['course'] == 'Cybersecurity') ? 'selected' : ''; ?>>Cybersecurity</option>
                    <option value="Business Administration" <?php echo (isset($_POST['course']) && $_POST['course'] == 'Business Administration') ? 'selected' : ''; ?>>Business Administration</option>
                    <option value="Engineering" <?php echo (isset($_POST['course']) && $_POST['course'] == 'Engineering') ? 'selected' : ''; ?>>Engineering</option>
                    <option value="Other" <?php echo (isset($_POST['course']) && $_POST['course'] == 'Other') ? 'selected' : ''; ?>>Other</option>
                </select>
            </div>

            <div class="button-group">
                <a href="management_dashboard.php" class="btn btn-secondary">Cancel</a>
                <button type="submit" class="btn btn-primary">💾 Add Student</button>
            </div>
        </form>
    </div>
</body>
</html>

<?php
$conn->close();
?>