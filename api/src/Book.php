<?php

class Book implements JsonSerializable
{
    private $id;
    private $name;
    private $author;

    public function __construct($name = "", $author = "", $id = -1)
    {
        $this->id = $id;
        $this->name = $name;
        $this->author = $author;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getAuthor()
    {
        return $this->author;
    }

    public function setAuthor($author)
    {
        $this->author = $author;
    }

    public static function loadFromDB($conn, $id)
    {

        $query = "SELECT * FROM books WHERE `id` = $id";

        $result = $conn->query($query);
        
        $row = $result->fetch_assoc();
        
        $book = new Book(
            $row['name'],
            $row['author'],
            $row['id']
        );
        
        return $book;
    }

    public static function loadAllFromDB($conn)
    {

        $query = "SELECT * FROM books";

        $result = $conn->query($query);
        if (!$result) {
            die("Błąd: ".$conn->error);
        }
        
        $books = [];
        foreach ($result as $book) {
            $bookObj = new Book(
                $book['name'],
                $book['author'],
                $book['id']
            );
            $books[] = $bookObj;
        }

        return $books;
    }

    public function save($conn)
    {
        if ($this->id == -1) {
            $query = "INSERT INTO books (`name`, `author`) VALUES ('{$this->name}', '{$this->author}');";
        } else {
            $query = "UPDATE books SET `name`='{$this->name}', `author`='{$this->author}' WHERE `id` = '{$this->id}'";
        }
        $result = $conn->query($query);

        if (!$result) {
            return false;
        }

        return true;
    }

    public static function deleteFromDB($conn, $id)
    {
        if ($id == -1) {
            return false;
        }
        
        $query = "DELETE FROM books WHERE `id` = '$id';";

        $result = $conn->query($query);

        if (!$result) {
            return false;
        }

        return true;
    }


    function jsonSerialize()
    {
        return [$this->id, $this->name, $this->author];
    }
};