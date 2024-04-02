<?php
header('Content-Type: application/json');

// Credentials
$host = 'localhost';
$dbname = 'merri6ic_academics';
$user = 'merri6ic_academics';
$pass = 'Stargazers123*';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if (!$data) {
    echo json_encode(["error" => "Invalid JSON data"]);
    exit();
}

$name = $data["name"] ?? null;
$time_slot = $data["time_slot"] ?? null;
$days = $data["days"] ?? null;

if (!$name || !$time_slot || !$days) {
    echo json_encode(["error" => "Missing data for name, time slot, or days"]);
    exit();
}

// SQL query
$sql = "INSERT INTO courses (name, time_slot, days) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["error" => "Error preparing statement: " . $conn->error]);
    exit();
}

$stmt->bind_param("sss", $name, $time_slot, $days);
$executeResult = $stmt->execute();

if ($executeResult) {
    echo json_encode(["message" => "New course added successfully!"]);
} else {
    echo json_encode(["error" => "Error adding course: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
