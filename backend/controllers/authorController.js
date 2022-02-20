var Author = require('../models/author');
var Book = require('../models/book');
var async = require('async');

// Display list of all Authors.
exports.author_list = function (req, res, next) {
    Author.find()
        .sort([['family_name', 'ascending']])
        .then((authors) => res.status(200).json(authors))
        .catch((error) => res.status(400).json({ error }));

};

// Display detail page for a specific Author.
exports.author_detail = function (req, res) {
    Author
        .findOne({ _id: req.params.id })
        .then((author) => res.status(200).json(author))
        .catch((error) => res.status(404).json({ error }));


};

// Handle Author create
exports.author_create = function (req, res, next) {
    var author = new Author(
        {
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        }
    );
    author.save()
        .then(() => res.status(201).json({ message: "Saved author !" }))
        .catch((error) => res.status(400).json({ error }));
};

// Handle Author delete
exports.author_delete = function (req, res) {
    Book.find({ 'author': req.params.id })
     .then((books) => {
         if(books.length > 0){
            res.status(400).json({ warning: 'Delete failed! You must delete its books !' });
         }else{
            Author.deleteOne({ _id: req.params.id })
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


// Handle Author update
exports.author_update = function (req, res) {
    const author = new Author(
        {
            _id: req.params.id,
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        });
    Author.updateOne({ _id: req.params.id }, author).then(
        () => {
            res.status(201).json({
                message: 'Author updated successfully!'
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
