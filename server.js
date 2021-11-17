let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let port = 3000;
let book = require('./controllers/routes/book');
let config = require('./config/dev.json'); //we load the db location from the JSON files

//db connection
mongoose.connect(config.DBHost,()=>{
    console.log("successfull");
});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


//parse application/json and look for raw text
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => res.json({message: "Welcome to our Bookstore!"}));

app.route("/book")
    .get(book.getBooks)
    .post(book.postBook);
app.route("/book/:id")
    .get(book.getBook)
    .delete(book.deleteBook)
    .put(book.updateBook);


app.listen(port);
console.log("Listening on port " + port);

// module.exports = app; // for testing