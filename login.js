// login.js -  route module.

const pool = require("./db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();

router.post("/", async(req, res) => {
    try {
        const { username, password } = req.body;
        if (!(username && password)) {
            res.json({ message: "NOK", detail: "All input is required!" }); 
        } else {
            const getReg = await pool.query("SELECT * FROM users WHERE username = $1",[ username ]);
            if (getReg.rows.length > 0) {
                var user = getReg.rows[0]; 
                if (user && (await bcrypt.compare(password, user.password))) {
                    // Create token
                    const token = jwt.sign(
                        { user_id: user.id, email: user.email },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "2h",
                        }
                    );
                    // save user token
                    user.token = token;            
                    res.json(user);
                } else {
                    res.json({ message: "NOK", detail: "Invalid credentials!" }); 
                }
            } else {
                res.json({ message: "NOK", detail: "You are not welcome here!" }); 
            }
        }
    } catch(err) {
        res.json({ message: "NOK", detail: "" }); 
    }
});

module.exports = router;