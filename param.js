// params.js -  route module.

const auth = require("./middleware/auth");

const pool = require("./db");
var express = require('express');
var router = express.Router();

router.get("/", auth, async(req, res) => {
    
    try {

        const allRegs = await pool.query("SELECT * FROM params");
        res.json(allRegs.rows);
    
    } catch(err) {
        console.log(err.message);
        res.json({ message: "NOK", detail: "" }); 
    }

});

router.get("/:id", auth, async(req, res) => {
    try {
        const { id } = req.params;
        const getReg = await pool.query("SELECT * FROM params WHERE id = $1",[ id ]);
        res.json(getReg.rows[0]);
    } catch(err) {
        console.log(err.message);
        res.json({ message: "NOK", detail: "" }); 
    }
});

router.put("/:id", auth, async(req, res) => {
    try {
        const { id } = req.params;
        const { label, value, default_value, dt_params, type } = req.body;
        const updReg = await pool.query(
            "UPDATE params SET label = $1, value = $2, default_value = $3, dt_params = $4, type = $5 WHERE id = $6 RETURNING *",
            [ label, value, default_value, dt_params, type, id ]
        );
        res.json(updReg.rows[0]); 
    } catch(err) {
        console.log(err.message);
        res.json({ message: "NOK", detail: "" }); 
    }
});

router.post("/", auth, async(req, res) => {
    try {
        const { label, value, default_value, dt_params, type } = req.body;
        const newReg = await pool.query(
            "INSERT INTO params ( id, label, value, default_value, dt_params, type ) VALUES ( nextval('params_id_seq'), $1, $2, $3, $4, $5 ) RETURNING *",
            [ id, label, value, default_value, dt_params, type ]
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
            "DELETE FROM params WHERE id = $1 RETURNING *",
            [ id ]
        );
        res.json(delReg.rows[0]); 
    } catch(err) {
        console.log(err.message);
        res.json({ message: "NOK", detail: "" }); 
    }
});

module.exports = router;