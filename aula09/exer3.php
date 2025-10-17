<?php
$valor = $_REQUEST["valor"];
$desconto = $_REQUEST["desconto"];

function calcularDesconto($valor, $desconto) {
    if ($desconto < 0  $desconto >100)  
    {
        throw new exemption "desconto"
    }