<?php
require_once 'config.php';

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $data->email;
    $password = $data->password;

    // Hardcoded for now as per your requirement
    if ($email === 'admin@newashoknagarrooms.in' && $password === 'admin123') {
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(401);
        echo json_encode(["error" => "Invalid credentials"]);
    }
}
?>
