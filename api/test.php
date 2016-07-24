<?php
//header('Content-Type: application/json');

require_once 'src/Book.php';
require_once 'src/db_connection.php';
$conn = connectToDB();

$book = Book::loadAllFromDB($conn);

//if($_SERVER['REQUEST_METHOD'] == 'GET') {
//    echo("GET<br>");
//    var_dump($_GET);
//} elseif($_SERVER['REQUEST_METHOD'] == 'PUT') {
//    echo("PUT<br>");
//    parse_str(file_get_contents("php://input"), $put_vars);
//    var_dump($put_vars);
//} elseif($_SERVER['REQUEST_METHOD'] == 'DELETE') {
//    echo("DELETE<br>");
//    parse_str(file_get_contents("php://input"), $del_vars);
//    var_dump($del_vars);
//}

$bookJSON = json_encode($book);
//var_dump($book);
echo ($bookJSON);