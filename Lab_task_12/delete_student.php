<?php
require_once 'db_connect.php';

// Check if ID is provided
if (!isset($_GET['id']) || empty($_GET['id'])) {
    header("Location: management_dashboard.php");
    exit();
}

$student_id = intval($_GET['id']);

// First, check if student exists
$check_sql = "SELECT name FROM students WHERE id = ?";
$check_stmt = $conn->prepare($check_sql);
$check_stmt->bind_param("i", $student_id);
$check_stmt->execute();
$check_result = $check_stmt->get_result();

if ($check_result->num_rows == 0) {
    // Student doesn't exist
    $check_stmt->close();
    $conn->close();
    header("Location: management_dashboard.php");
    exit();
}

$check_stmt->close();

// Delete the student
$delete_sql = "DELETE FROM students WHERE id = ?";
$delete_stmt = $conn->prepare($delete_sql);
$delete_stmt->bind_param("i", $student_id);

if ($delete_stmt->execute()) {
    $delete_stmt->close();
    $conn->close();
    header("Location: management_dashboard.php?success=deleted");
    exit();
} else {
    $delete_stmt->close();
    $conn->close();
    header("Location: management_dashboard.php?error=delete_failed");
    exit();
}
?>