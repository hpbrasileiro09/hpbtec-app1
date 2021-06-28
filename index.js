const express = require("express");
const app = express();
const books = require("./books")

app.use(express.json()); // -> req.body

app.use("/books", books);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('Server is listening on port 5000');
});