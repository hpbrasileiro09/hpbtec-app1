const express = require("express");
const cors = require('cors');
const app = express();
const books = require("./books")
const params = require("./param")
const entries = require("./entry")
const categories = require("./category")

app.use(cors());

app.use(express.json()); // -> req.body

app.get("/", function(req, res) {
    const resume = {
        description: 'Hpbtec-app1 - Backend',
        author: 'Hernando de Paula Brasileiro',
        created_at: '2021-06-28 17:00',
        updated_at: '2021-08-01 22:32',
        description: 'NodeJs And Postgre API Sample'
    };
    res.json(resume);
});

app.use("/books", books);
app.use("/entries", entries);
app.use("/categories", categories);
app.use("/params", params);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('Server is listening on port 5000');
});