<?php
header('Content-Type: application/json');
$host = 'localhost';
$dbname = 'merri6ic_academics';
$username = 'merri6ic_academics';
$password = 'Stargazers123*';

$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

$query = "SELECT review_text FROM reviews WHERE course_name = 'CMPT113'";
$stmt = $pdo->query($query);

echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
