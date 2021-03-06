<?php

require_once __DIR__ . "../../conexao.php";

$sql = "SELECT id, nome FROM tipos";



if (!$result = $conexao->query($sql)) {
    $retorno["status"] = 0;
    $retorno["qtd"] = 0;
    $retorno["msg"] = "Erro na seleção dos tipos" . $conexao->error;
    $retorno["item"] = [];
} else {
    $tmp_array = array();
    $retorno["status"] = 1;
    $retorno["qtd"] = $result->num_rows;
    
    while ($list = $result->fetch_assoc()) {
        array_push($tmp_array, $list);
    }
    
    $retorno["item"] = $tmp_array;
}

$json = json_encode($retorno, JSON_UNESCAPED_UNICODE);
exit($json);