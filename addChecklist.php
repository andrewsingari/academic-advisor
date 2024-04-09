<?php
header('Content-Type: application/json');
$host = 'localhost';
$dbname = 'merri6ic_academics';
$username = 'merri6ic_academics';
$password = 'Stargazers123*';

$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $section = $_POST['section'];
    $courseNames = $_POST['course_name'];
    $courseDescriptions = $_POST['course_description'];
    $semesterHours = $_POST['semester_hours'];

    for ($i = 0; $i < count($courseNames); $i++) {
        if (!empty($courseNames[$i]) && !empty($courseDescriptions[$i]) && !empty($semesterHours[$i])) {
            $courseName = $courseNames[$i];
            $courseDescription = $courseDescriptions[$i];
            $hours = $semesterHours[$i];

            // Check if course already exists in section
            $checkQuery = "SELECT * FROM core_courses WHERE course_name = ? AND section = ?";
            $checkStmt = $pdo->prepare($checkQuery);
            $checkStmt->execute([$courseName, $section]);
            $existingCourse = $checkStmt->fetch(PDO::FETCH_ASSOC);

            if ($existingCourse) {
                // Update existing course
                $updateQuery = "UPDATE core_courses SET course_description = ?, semester_hours = ? WHERE course_name = ? AND section = ?";
                $updateStmt = $pdo->prepare($updateQuery);
                $updateStmt->execute([$courseDescription, $hours, $courseName, $section]);
            } else {
                // Insert new course
                $insertQuery = "INSERT INTO core_courses (course_name, course_description, semester_hours, section) VALUES (?, ?, ?, ?)";
                $insertStmt = $pdo->prepare($insertQuery);
                $insertStmt->execute([$courseName, $courseDescription, $hours, $section]);
            }
        }
    }

    echo json_encode(['status' => 'success']);
}
?>
