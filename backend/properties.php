<?php
require_once 'config.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configuration
$uploadDir = __DIR__ . '/uploads/';  // Absolute path
// $baseUrl = 'https://newashoknagarrooms.in/backend/uploads/';  // Change this to your actual domain
$baseUrl = 'http://localhost:8000/uploads/'; 
// Create uploads directory if not exists
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

try {
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method) {
        
        case 'GET':
            $stmt = $pdo->query("SELECT * FROM properties ORDER BY created_at DESC");
            $properties = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Format response for React frontend
            $formattedProperties = array_map(function($property) use ($baseUrl) {
                // Check if image_url is already a full URL or just filename
                $imageUrl = $property['image_url'];
                if (!empty($imageUrl) && !filter_var($imageUrl, FILTER_VALIDATE_URL)) {
                    $imageUrl = $baseUrl . $imageUrl;
                }
                
                return [
                    'id' => $property['id'],
                    'title' => $property['title'],
                    'price' => $property['price'],
                    'type' => $property['type'],
                    'location' => $property['location'],
                    'imageUrl' => $imageUrl,  // ← camelCase for React
                    'image_url' => $property['image_url'],  // ← original for reference
                    'created_at' => $property['created_at']
                ];
            }, $properties);
            
            echo json_encode($formattedProperties);
            break;

        case 'POST':
            // Check if it's update (has id in URL) or insert
            $isUpdate = isset($_GET['id']);
            $id = $isUpdate ? intval($_GET['id']) : null;
            
            // Get form data
            $title = $_POST['title'] ?? '';
            $price = $_POST['price'] ?? '';
            $type = $_POST['type'] ?? '';
            $location = $_POST['location'] ?? '';
            
            // Validation
            if (empty($title) || empty($price)) {
                echo json_encode(["status" => "error", "message" => "Title and price are required"]);
                exit;
            }
            
            // Handle image upload
            $imageFilename = null;
            
            if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
                $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
                $fileType = $_FILES['image']['type'];
                
                if (!in_array($fileType, $allowedTypes)) {
                    echo json_encode(["status" => "error", "message" => "Invalid file type. Only JPG, PNG, WEBP allowed"]);
                    exit;
                }
                
                // Generate unique filename
                $extension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
                $filename = time() . '_' . uniqid() . '.' . $extension;
                $filePath = $uploadDir . $filename;
                
                if (move_uploaded_file($_FILES['image']['tmp_name'], $filePath)) {
                    $imageFilename = $filename;
                } else {
                    echo json_encode(["status" => "error", "message" => "Failed to upload image"]);
                    exit;
                }
            }
            
            if ($isUpdate) {
                // UPDATE existing property
                if ($imageFilename) {
                    // New image uploaded - delete old one if exists
                    $stmt = $pdo->prepare("SELECT image_url FROM properties WHERE id = ?");
                    $stmt->execute([$id]);
                    $oldImage = $stmt->fetchColumn();
                    
                    if ($oldImage && file_exists($uploadDir . $oldImage)) {
                        unlink($uploadDir . $oldImage); // Delete old file
                    }
                    
                    // Update with new image
                    $stmt = $pdo->prepare("UPDATE properties SET title=?, price=?, type=?, location=?, image_url=? WHERE id=?");
                    $stmt->execute([$title, $price, $type, $location, $imageFilename, $id]);
                } else {
                    // Keep existing image
                    $stmt = $pdo->prepare("UPDATE properties SET title=?, price=?, type=?, location=? WHERE id=?");
                    $stmt->execute([$title, $price, $type, $location, $id]);
                }
                
                echo json_encode(["status" => "success", "message" => "Property updated successfully"]);
                
            } else {
                // INSERT new property
                if (!$imageFilename) {
                    echo json_encode(["status" => "error", "message" => "Image is required for new property"]);
                    exit;
                }
                
                $stmt = $pdo->prepare("INSERT INTO properties (title, price, type, location, image_url) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$title, $price, $type, $location, $imageFilename]);
                
                echo json_encode(["status" => "success", "message" => "Property added successfully", "id" => $pdo->lastInsertId()]);
            }
            break;

        case 'DELETE':
            $id = intval($_GET['id']);
            
            // Get image filename before deleting
            $stmt = $pdo->prepare("SELECT image_url FROM properties WHERE id = ?");
            $stmt->execute([$id]);
            $imageFile = $stmt->fetchColumn();
            
            // Delete from database
            $stmt = $pdo->prepare("DELETE FROM properties WHERE id = ?");
            $stmt->execute([$id]);
            
            // Delete image file from server
            if ($imageFile && file_exists($uploadDir . $imageFile)) {
                unlink($uploadDir . $imageFile);
            }
            
            echo json_encode(["status" => "success", "message" => "Property deleted successfully"]);
            break;
            
        default:
            echo json_encode(["status" => "error", "message" => "Method not allowed"]);
            break;
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>