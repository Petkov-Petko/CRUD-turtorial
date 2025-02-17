import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "crud"
});

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.json({ message: 'Hello World'});
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(data);
        }
    });
});


app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover
    ];

    db.query(q, [values], (err, data) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json("Book added successfully");
        }
    });
});

app.delete("/books/:id", (req, res) => {
 const bookID = req.params.id
 const q = "DELETE FROM books WHERE id = ?";

 db.query(q, [bookID], (err, data) => {
     if (err) {
         res.status(500).json({ error: err });
     } else {
         res.json("Book deleted successfully");
     }
 });
});
app.put("/books/:id", (req, res) => {
 const bookID = req.params.id
 const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ? WHERE id = ?";

 const values = [
    req.body.title,
    req.body.desc,
    req.body.cover
 ]

 db.query(q, [...values, bookID], (err, data) => {
     if (err) {
         res.status(500).json({ error: err });
     } else {
         res.json("Book updated successfully");
     }
 });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});