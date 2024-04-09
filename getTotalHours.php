<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'merri6ic_academics';
$username = 'merri6ic_academics';
$password = 'Stargazers123*';

$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

$section = $_GET['section'] ?? '';

// calculate the total semester hours for the section
$query = "SELECT SUM(semester_hours) AS total_hours FROM core_courses WHERE section = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$section]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    'totalSemesterHours' => $result['total_hours'] ?? 0
]);
?>
