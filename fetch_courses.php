<?php
header('Content-Type: application/json');

$host = 'localhost';
$dbname = 'merri6ic_academics';
$user = 'merri6ic_academics';
$pass = 'Stargazers123*';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

$sql = "SELECT name, time_slot, days FROM courses";
$result = $conn->query($sql);

if ($result) {
    $courses = [];
    while ($row = $result->fetch_assoc()) {
        $courses[] = $row;
    }
    echo json_encode($courses);
} else {
    echo json_encode(["error" => "Error fetching courses: " . $conn->error]);
}

$conn->close();
?>
