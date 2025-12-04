<?php
require_once '../config.php';

try {
    $conn = new PDO(
        "pgsql:host=$host;port=$port;dbname=$dbname",
        $user,
        $password
    );
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    
    echo json_encode([
        "sucesso" => false,
        "erro" => "Falha na conexão: " . $e->getMessage()
    ]);
    exit;
}
?>
