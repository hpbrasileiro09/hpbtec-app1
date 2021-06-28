const express = require("express");
const app = express();
const books = require("./books")

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(express.json()); // -> req.body

app.get("/", function(req, res) {
    const resume = {
        description: 'Hpbtec-app1 - Backend',
        author: 'Hernando de Paula Brasileiro',
        created_at: '2021-06-28 17:00'
    };
    res.json(resume);
});

app.use("/books", books);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('Server is listening on port 5000');
});