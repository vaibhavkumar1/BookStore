let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let port = 3000;
let book = require('./controllers/routes/book');

//db connection
mongoose.connect("mongodb://localhost:27017/mydbname");
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



//parse application/json and look for raw text
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => res.json({message: "Welcome to our Bookstore!"}));

app.post("/book",book.postBook);
app.get("/book",book.getBooks)
app.get("/book/id",book.getBook)
app.delete("/book/id",book.deleteBook)
app.put("/book/id",book.updateBook);


app.listen(port);
console.log("Listening on port " + port);

module.exports = app; // for testing