// books.js -  route module.

const pool = require("./db");
var express = require('express');
var router = express.Router();

router.get("/", async(req, res) => {
    
    try {

        const allBooks = await pool.query("SELECT * FROM books");
        res.json(allBooks.rows);
    
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }

});

router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const getBook = await pool.query("SELECT * FROM books WHERE id = $1",[ id ]);
        res.json(getBook.rows[0]);
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }
});

router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { title, author } = req.body;
        const updBook = await pool.query(
            "UPDATE books SET title = $1, primary_author = $2 WHERE id = $3 RETURNING *",
            [ title, author, id ]
        );
        res.json(updBook.rows[0]); 
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }
});

router.post("/", async(req, res) => {
    try {
        //console.log(req.body);
        const { title, author } = req.body;
        const newBook = await pool.query(
            "INSERT INTO books ( id, title, primary_author ) VALUES ( nextval('books_sequence'), $1, $2 ) RETURNING *",
            [ title, author ]
        );
        res.json(newBook.rows[0]); 
        //res.json(JSON.stringify({ message: "OK" })); 
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const delBook = await pool.query(
            "DELETE FROM books WHERE id = $1 RETURNING *",
            [ id ]
        );
        res.json(delBook.rows[0]); 
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }
});

module.exports = router;