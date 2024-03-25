<?php
header('Content-Type: application/json');
$host = 'localhost';
$dbname = 'merri6ic_academics';
$username = 'merri6ic_academics';
$password = 'Stargazers123*';

$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

$courseName = 'CMPT113'; // Preassigned course name
$reviewText = $_POST['reviewText'];

$query = "INSERT INTO reviews (course_name, review_text) VALUES (?, ?)";
$stmt = $pdo->prepare($query);
$stmt->execute([$courseName, $reviewText]);
