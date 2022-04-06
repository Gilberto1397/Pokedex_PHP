<?php
header('Access-Control-Allow-Origin: *');

$servidor = "localhost" ;
$usuario = "root" ;
$senha = "" ;

$banco = "pokedex" ;
$conexao = new mysqli($servidor, $usuario, $senha, $banco) ; // obj de conexão do php 7

if (mysqli_connect_errno()) { // para caso de erro
    trigger_error((mysqli_connect_errno()));
    exit();
}

mysqli_set_charset($conexao, "utf8");
