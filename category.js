// category.js -  route module.

const auth = require("./middleware/auth");

const pool = require("./db");
var express = require('express');
var router = express.Router();

router.get("/", auth, async(req, res) => {
    
    try {

        const allRegs = await pool.query("SELECT * FROM categories");
        res.json(allRegs.rows);
    
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }

});

router.get("/:id", auth, async(req, res) => {
    try {
        const { id } = req.params;
        const getReg = await pool.query("SELECT * FROM categories WHERE id = $1",[ id ]);
        res.json(getReg.rows[0]);
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }
});

router.put("/:id", auth, async(req, res) => {
    try {
        const { id } = req.params;
        const { name, published, vl_prev, day_prev, ordem, type } = req.body;
        const updReg = await pool.query(
            "UPDATE categories SET name = $1, published = $2, vl_prev = $3, day_prev = $4, ordem = $5, type = $6 WHERE id = $7 RETURNING *",
            [ name, published, vl_prev, day_prev, ordem, type, id ]
        );
        res.json(updReg.rows[0]); 
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }
});

router.post("/", auth, async(req, res) => {
    try {
        const { name, published, vl_prev, day_prev, ordem, type } = req.body;
        const newReg = await pool.query(
            "INSERT INTO categories ( id, name, published, vl_prev, day_prev, ordem, type ) VALUES ( nextval('categories_id_seq'), $1, $2, $3, $4, $5, $6 ) RETURNING *",
            [ id, name, published, vl_prev, day_prev, ordem, type ]
        );
        res.json(newReg.rows[0]); 
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }
});

router.delete("/:id", auth, async(req, res) => {
    try {
        const { id } = req.params;
        const delReg = await pool.query(
            "DELETE FROM categories WHERE id = $1 RETURNING *",
            [ id ]
        );
        res.json(delReg.rows[0]); 
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }
});

module.exports = router;