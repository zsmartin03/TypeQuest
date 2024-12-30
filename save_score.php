<?php
include('db.php');
session_start();

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'User not authenticated']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['score']) || !is_numeric($data['score'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid score']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO scores (score, user_id) VALUES (?, ?)");
    $stmt->execute([$data['score'], $_SESSION['user_id']]);
    
    echo json_encode(['success' => true, 'message' => 'Score saved successfully']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save score']);
}