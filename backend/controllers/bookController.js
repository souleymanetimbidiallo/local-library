var Book = require('../models/book');
var BookInstance = require('../models/bookinstance');

exports.index = function (req, res, next) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

// Display list of all Books.
exports.book_list = function (req, res) {
    Book.find()
        .sort({ title: 1 })
        .populate('author')
        .populate('genre')
        .then((books) => res.status(200).json(books))
        .catch((error) => res.status(400).json({ error }));
};

// Display detail page for a specific Book.
exports.book_detail = function (req, res) {
    Book.findOne({ _id: req.params.id })
        .populate('author')
        .populate('genre')
        .then((book) => res.status(200).json(book))
        .catch((error) => res.status(404).json({ error }));

};

// Handle Book create
exports.book_create = function (req, res) {
    if (!(req.body.genre instanceof Array)) {
        if (typeof req.body.genre === 'undefined')
            req.body.genre = [];
        else
            req.body.genre = new Array(req.body.genre);
    }
    // Create a Book object with escaped and trimmed data.
    var book = new Book(
        {
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: req.body.genre
        });

    book.save()
        .then(() => res.status(201).json({ message: "Book saved successfully !" }))
        .catch((error) => res.status(400).json({ error }));

};

// Handle Book delete
exports.book_delete = function (req, res) {
    BookInstance.find({ 'book': req.params.id })
    .then((bookInstances) => {
        if(bookInstances.length > 0){
           res.status(400).json({ message: 'Delete failed! You must delete its bookinstances !' });
        }else{
           Book.deleteOne({ _id: req.params.id })
           .then(() => {
               res.status(200).json({ message: 'Deleted!' });
           })
           .catch((error) => {
               res.status(400).json({ error: error });
           });
        }
    })
    .catch((error) => res.status(404).json({ error }));
};

// Handle Book update
exports.book_update = function (req, res) {
    if (!(req.body.genre instanceof Array)) {
        if (typeof req.body.genre === 'undefined')
            req.body.genre = [];
        else
            req.body.genre = new Array(req.body.genre);
    }

    var book = new Book(
        {
            title: req.body.title,
            author: req.body.author,
            summary: req.body.summary,
            isbn: req.body.isbn,
            genre: (typeof req.body.genre === 'undefined') ? [] : req.body.genre,
            _id: req.params.id //This is required, or a new ID will be assigned!
        });


    Book.updateOne({ _id: req.params.id }, book).then(
        () => {
            res.status(201).json({
                message: 'Book updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
