<?php
function getHighScores() {
    global $pdo;
    try {
        $stmt = $pdo->query("
            SELECT u.username, s.score, s.create_at 
            FROM scores s 
            JOIN users u ON s.user_id = u.id 
            ORDER BY s.score DESC 
            LIMIT 10
        ");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return [];
    }
}

?>