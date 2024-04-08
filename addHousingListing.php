<?php
header('Content-Type: application/json');
$host = 'localhost';
$dbname = 'merri6ic_academics';
$username = 'merri6ic_academics';
$password = 'Stargazers123*';

$pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $title = $_POST['title'];
        $price = $_POST['price'];
        $address = $_POST['address'];
        $location = $_POST['location'];
        $username = $_POST['username'];

        $query = "INSERT INTO housing_listings (title, price, address, location, username) VALUES (?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($query);

        $stmt->execute([$title, $price, $address, $location, $username]);

        // Send JSON response
        echo json_encode(["success" => "Listing added successfully"]);
    } else {
        echo json_encode(["error" => "This page expects a POST request."]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
