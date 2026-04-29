<?php
require_once 'config.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];

try {

    switch($method) {

        case 'GET':
            $stmt = $pdo->query("SELECT * FROM leads ORDER BY created_at DESC");
            $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($leads);
            break;

        case 'POST':
            $data = json_decode(file_get_contents("php://input"));

            if (!$data) {
                echo json_encode(["status" => "error", "message" => "Invalid JSON"]);
                exit;
            }

            // Bulk Delete
            if (isset($data->action) && $data->action == 'bulk_delete') {
                $ids = implode(',', array_map('intval', $data->ids));
                $pdo->exec("DELETE FROM leads WHERE id IN ($ids)");
                echo json_encode(["status" => "success"]);
                break;
            }

            // Validation
            if (empty($data->name) || empty($data->phone)) {
                echo json_encode(["status" => "error", "message" => "Missing fields"]);
                exit;
            }

            // Insert
            $stmt = $pdo->prepare("INSERT INTO leads (name, phone, budget, property_type) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $data->name,
                $data->phone,
                $data->budget,
                $data->propertyType
            ]);

            echo json_encode([
                "status" => "success",
                "id" => $pdo->lastInsertId()
            ]);
            break;

        case 'DELETE':
            $id = intval($_GET['id']);
            $stmt = $pdo->prepare("DELETE FROM leads WHERE id = ?");
            $stmt->execute([$id]);

            echo json_encode(["status" => "success"]);
            break;
    }

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>