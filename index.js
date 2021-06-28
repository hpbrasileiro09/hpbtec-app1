const express = require("express");
const app = express();
const books = require("./books")

app.use(express.json()); // -> req.body

app.use("/books", books);

app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});