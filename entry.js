// entry.js -  route module.

const pool = require("./db");
var express = require('express');
var router = express.Router();

router.get("/", async(req, res) => {
    
    try {

        const allRegs = await pool.query("SELECT * FROM entries");
        res.json(allRegs.rows);
    
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }

});

router.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const getReg = await pool.query("SELECT * FROM entries WHERE id = $1",[ id ]);
        res.json(getReg.rows[0]);
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }
});

router.put("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { id_category, dt_entry, vl_entry, nm_entry, ds_category, ds_subcategory, status, fixed_costs, checked, published, ds_detail } = req.body;
        const updReg = await pool.query(
            "UPDATE entries SET id_category = $1, dt_entry = $2, vl_entry = $3, nm_entry = $4, ds_category = $5, ds_subcategory = $6, status = $7, fixed_costs = $8, checked = $9, published = $10, ds_detail = $11 WHERE id = $12 RETURNING *",
            [ id_category, dt_entry, vl_entry, nm_entry, ds_category, ds_subcategory, status, fixed_costs, checked, published, ds_detail, id ]
        );
        res.json(updReg.rows[0]); 
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }
});

router.post("/", async(req, res) => {
    try {
        const { id_category, dt_entry, vl_entry, nm_entry, ds_category, ds_subcategory, status, fixed_costs, checked, published, ds_detail } = req.body;
        const newReg = await pool.query(
            "INSERT INTO entries ( id, id_category, dt_entry, vl_entry, nm_entry, ds_category, ds_subcategory, status, fixed_costs, checked, published, ds_detail ) VALUES ( nextval('entries_id_seq'), $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 ) RETURNING *",
            [ id_category, dt_entry, vl_entry, nm_entry, ds_category, ds_subcategory, status, fixed_costs, checked, published, ds_detail ]
        );
        res.json(newReg.rows[0]); 
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }
});

router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const delReg = await pool.query(
            "DELETE FROM entries WHERE id = $1 RETURNING *",
            [ id ]
        );
        res.json(delReg.rows[0]); 
    } catch(err) {
        console.log(err.message);
        res.json(JSON.stringify({ message: "NOK" })); 
    }
});

module.exports = router;