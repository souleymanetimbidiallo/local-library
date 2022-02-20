var Genre = require('../models/genre');
var Book = require('../models/book');

// Display list of all Genre.
exports.genre_list = function (req, res, next) {
    Genre.find()
        .then((genres) => res.status(200).json(genres))
        .catch((error) => res.status(400).json({ error }));
};

// Display detail page for a specific Genre.
exports.genre_detail = function (req, res, next) {
    Genre
        .findOne({ _id: req.params.id })
        .then((genre) => res.status(200).json(genre))
        .catch((error) => res.status(404).json({ error }));
};
// Display detail page for a specific Genre.
exports.genre_detail_books = function (req, res, next) {
    Book.find({'genre': req.params.id})
        .then((genres) => res.status(200).json(genres))
        .catch((error) => res.status(404).json({ error }));
};

// Handle Genre create
exports.genre_create = function (req, res, next) {
    var genre = new Genre({ name: req.body.name });

     // Check if Genre with same name already exists.
     Genre.findOne({ 'name': req.body.name })
     .exec( function(err, found_genre) {
        if (err) { return next(err); }

        if (found_genre) {
          res.status( res.status(201).json({ message: "This Genre already exists. !" }));
        }
        else {
          genre.save()
          .then(() => res.status(201).json({ message: "Genre saved successfully !" }))
          .catch((error) => res.status(400).json({ error }));
        }
    });

};

// Handle Genre delete
exports.genre_delete = function (req, res) {
    Genre.deleteOne({ _id: req.params.id })
    .then(() => {
        res.status(200).json({ message: 'Deleted!' });
    })
    .catch((error) => {
        res.status(400).json({ error: error });
    });
};

// Handle Genre update
exports.genre_update = function (req, res) {
    const genre = new Genre({
        _id: req.params.id,
        name: req.body.name
    });
    Genre.updateOne({ _id: req.params.id }, genre).then(() => {
        res.status(201).json({message: 'Genre updated successfully!'});
    })
    .catch((error) => {
        res.status(400).json({error: error});
    });
};
