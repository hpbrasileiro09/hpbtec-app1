// user.js -  route module.

const auth = require("./middleware/auth");

const pool = require("./db");
var express = require('express');
var router = express.Router();

router.get("/", auth, async(req, res) => {
    
    try {

        const allRegs = await pool.query("SELECT * FROM users");
        res.json(allRegs.rows);
    
    } catch(err) {
        console.log(err.message);
        res.json({ message: "NOK", detail: "" }); 
    }

});

router.get("/:id", auth, async(req, res) => {
    try {
        const { id } = req.params;
        const getReg = await pool.query("SELECT * FROM users WHERE id = $1",[ id ]);
        res.json(getReg.rows[0]);
    } catch(err) {
        console.log(err.message);
        res.json({ message: "NOK", detail: "" }); 
    }
});

router.put("/:id", auth, async(req, res) => {
    try {
        const { id } = req.params;
        const { name, email, username, password, remember_token, role, published, reset_pwd, updated_at } = req.body;
        const updReg = await pool.query(
        "UPDATE users SET name = $1, email = $2, username = $3, password = $4, remember_token = $5, role = $6, published = $7, reset_pwd = $8, updated_at = $9 WHERE id = $10 RETURNING *",
        [ name, email, username, password, remember_token, role, published, reset_pwd, updated_at, id ]
        );
        res.json(updReg.rows[0]); 
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }
});

router.post("/", auth, async(req, res) => {
    try {
        const { name, email, username, password, remember_token, role, published, reset_pwd } = req.body;
        const newReg = await pool.query(
        "INSERT INTO users ( id, name, email, username, password, remember_token, role, published, reset_pwd ) VALUES ( nextval('users_sequence'), $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING *",
        [ name, email, username, password, remember_token, role, published, reset_pwd ]
        );
        res.json(newReg.rows[0]); 
    } catch(err) {
        console.log(err.message);
        res.json({ message: "NOK", detail: "" }); 
    }
});

router.delete("/:id", auth, async(req, res) => {
    try {
        const { id } = req.params;
        const delReg = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING *",
            [ id ]
        );
        res.json(delReg.rows[0]); 
    } catch(err) {
        console.log(err.message);
        res.json({ message: "NOK", detail: "" }); 
    }
});

module.exports = router;