// register.js -  route module.

require('dotenv/config');

const pool = require("./db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();

router.post("/", async(req, res) => {
    try {
        const { name, email, username, password, remember_token, role, published, reset_pwd } = req.body;
        const getReg = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2",[ username, email ]);
        if (getReg.rows.length == 0) {
            const encryptedPassword = await bcrypt.hash(password, 10);            
            const newReg = await pool.query(
            "INSERT INTO users ( id, name, email, username, password, remember_token, role, published, reset_pwd ) VALUES ( nextval('users_sequence'), $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING *",
            [ name, email, username, encryptedPassword, remember_token, role, published, reset_pwd ]
            );
            var user = newReg.rows[0]; 
            // Create token
            const token = jwt.sign(
                { user_id: user.id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // save user token
            user.token = token;            
            res.json(user);
        } else {
            res.json({ message: "NOK", detail: "Username or e-mail already in use!" }); 
        } 
    } catch(err) {
        res.json({ message: "NOK", detail: "" }); 
    }
});

module.exports = router;