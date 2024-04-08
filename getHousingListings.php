<?php
header('Content-Type: application/json');
$host = 'localhost';
$dbname = 'merri6ic_academics';
$username = 'merri6ic_academics';
$password = 'Stargazers123*';

$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);

$query = "SELECT * FROM housing_listings";
$stmt = $pdo->query($query);
$listings = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($listings);
?>
