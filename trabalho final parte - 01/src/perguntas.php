<?php
header("Content-Type: application/json; charset=UTF-8");
require_once 'db.php';

try {
    $stmt = $conn->query("
        SELECT id_pergunta, texto_pergunta 
        FROM perguntas 
        WHERE status = 'ativa' 
        ORDER BY id_pergunta ASC
    ");

    $perguntas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "sucesso" => true,
        "perguntas" => $perguntas
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "sucesso" => false,
        "erro" => $e->getMessage()
    ]);
}
?>
