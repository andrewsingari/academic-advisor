<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'merri6ic_academics';
$username = 'merri6ic_academics';
$password = 'Stargazers123*';

$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

$section = $_GET['section'] ?? '';

if ($section === 'all') {
    $query = "SELECT SUM(semester_hours) AS total_hours FROM core_courses";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
} else {
    $query = "SELECT SUM(semester_hours) AS total_hours FROM core_courses WHERE section = :section";
    $stmt = $pdo->prepare($query);
    $stmt->execute(['section' => $section]);
}

$result = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    'totalSemesterHours' => $result['total_hours'] ?? 0
]);
