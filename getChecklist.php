<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'merri6ic_academics';
$username = 'merri6ic_academics';
$password = 'Stargazers123*';

$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

$section = $_GET['section'] ?? '';

$query = "SELECT course_name, course_description, semester_hours FROM core_courses WHERE section = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$section]);
$courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($courses);
