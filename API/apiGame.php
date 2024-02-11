<?php
require_once 'config.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

// Get request method
$method = $_SERVER['REQUEST_METHOD'];

// Retrieve the input data
$data = json_decode(file_get_contents("php://input"), true);

$response = array();

try {
    if ($method == 'GET') {
        $updateSql = "UPDATE games SET score = (SELECT AVG(vote) FROM games_comments WHERE games_comments.game_id = games.game_id) WHERE EXISTS (SELECT 1 FROM games_comments WHERE games_comments.game_id = games.game_id)";
        $updateStmt = $pdo->prepare($updateSql);
        $updateStmt->execute();
        if (isset($_GET['game_id'])) {
            $game_id = $_GET['game_id'];
            $sql = "SELECT * FROM games WHERE game_id = :game_id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':game_id', $game_id, PDO::PARAM_INT);
        } else {
            $sql = "SELECT * FROM games";
            $stmt = $pdo->prepare($sql);
        }

        $stmt->execute();
        $games = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($games as &$game) {
            $game_id = $game['game_id'];
            $sqlcomment = "SELECT * FROM games_comments WHERE game_id = :game_id";
            $stmt_comment = $pdo->prepare($sqlcomment);
            $stmt_comment->bindParam(':game_id', $game_id, PDO::PARAM_INT);
            $stmt_comment->execute();
            $comments = $stmt_comment->fetchAll(PDO::FETCH_ASSOC);

            $comment_arr = array();
            foreach ($comments as $comment) {
                $comment_arr[] = array(
                    'comment_id' => $comment['comment_id'],
                    'comment_text' => $comment['comment'],
                    'vote' => $comment['vote'],
                    'username_text' => $comment['username']
                );
            }

            $game['comment'] = $comment_arr;
            $response[] = $game;
        }
        if (empty($response)) {
            $response = array('status' => 'ข้อผิดพลาด', 'message' => 'ไม่พบข้อมูลสำหรับ game_id ที่ระบุ');
        }
    } elseif ($method == 'POST' && isset($data['game_id']) && isset($data['comment']) && isset($data['vote']) && isset($data['username'])) {
        $game_id = $data['game_id'];
        $comment = $data['comment'];
        $vote = $data['vote'];
        $username = $data['username'];

        $stmt = $pdo->prepare("INSERT INTO games_comments (comment_id, comment, game_id, vote, username) VALUES (NULL, :comment, :game_id, :vote, :username)");
        $stmt->bindParam(':comment', $comment);
        $stmt->bindParam(':game_id', $game_id);
        $stmt->bindParam(':vote', $vote);
        $stmt->bindParam(':username', $username);

        if ($stmt->execute()) {
            $response = array('status' => 'success', 'message' => 'Comment inserted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting comment');
        }
        $response = array('status' => 'สำเร็จแล้ว', 'message' => 'เพิ่มข้อมูลคอมเม้นเรียบร้อยแล้ว');
    } elseif ($method == 'PUT') {
        $game_id = $data['game_id'];
        $game_name = $data['game_name'];
        $game_description = $data['game_description'];
        $game_type = $data['game_type'];
        $img = $data['img'];

        $sql = "UPDATE games SET game_name=:game_name, game_description=:game_description, img=:img, game_type=:game_type WHERE game_id=:game_id";

        // เตรียมคำสั่ง PDO สำหรับการเตรียมคำสั่ง SQL
        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':game_name', $game_name);
        $stmt->bindParam(':game_description', $game_description);
        $stmt->bindParam(':img', $img);
        $stmt->bindParam(':game_type', $game_type);
        $stmt->bindParam(':game_id', $game_id);

        if ($stmt->execute()) {
            $response = array('status' => 'success', 'message' => 'Record updated successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error updating record: ' . $stmt->errorInfo()[2]);
        }
    } elseif ($method == 'POST' && isset($data['game_name']) && isset($data['game_description']) || isset($data['img']) && isset($game_type['game_type'])) {
        $game_name = $data['game_name'];
        $game_description = $data['game_description'];
        $img = $data['img'];
        $game_type = $data['game_type'];

        // Create SQL query for inserting data using placeholders
        $sql = "INSERT INTO games (game_name, game_description, img, game_type) VALUES (:game_name, :game_description, :img, :game_type)";

        // Prepare the PDO statement
        $stmt = $pdo->prepare($sql);

        // Bind values to placeholders
        $stmt->bindParam(':game_name', $game_name);
        $stmt->bindParam(':game_description', $game_description);
        $stmt->bindParam(':img', $img);
        $stmt->bindParam(':game_type', $game_type);

        // Insert data into the database
        if ($stmt->execute()) {
            $response = array('status' => 'success', 'message' => 'Game data inserted successfully');
        } else {
            $response = array('status' => 'error', 'message' => 'Error inserting Game data');
        }
        $stmt = null;
    } elseif ($method == 'DELETE') {
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $gameID = $path[3];

        //if (isset($data['game_id'])) {
        if ($gameID) {
            //$game_id = $data['game_id'];
            $game_id = $gameID;
            $sql = "DELETE FROM games WHERE game_id = :game_id";
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':game_id', $game_id);

            if ($stmt->execute()) {
                $response = array('status' => 'success', 'message' => 'Record deleted successfully');
            } else {
                $response = array('status' => 'error', 'message' => 'Error deleting record: ' . $stmt->errorInfo()[2]);
            }
        } else {
            $response = array('status' => 'error', 'message' => 'Missing or invalid game ID บรรทัด 135 ' . $gameID);
            print_r($response); // แสดงผลการแก้ไขข้อผิดพลาด
        }
    } else {
        $response = array('status' => 'error', 'message' => 'เมธอดคำขอไม่ถูกต้อง');
    }
} catch (PDOException $e) {
    $response['status'] = 'error';
    $response['message'] = 'เกิดข้อผิดพลาด: ' . $e->getMessage();
}

echo json_encode($response);
