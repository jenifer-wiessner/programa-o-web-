<?php
$host = "localhost";
$port = "5432";
$dbname = "trabalhofinal";
$user = "postgres";
$password = "unidavi";

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Erro ao conectar ao banco de dados: " . pg_last_error());
}

?>
