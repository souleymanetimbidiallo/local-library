var BookInstance = require('../models/bookinstance');

// Display list of all BookInstances.
exports.bookinstance_list = function (req, res, next) {
    BookInstance.find()
        .populate('book')
        .then((bookinstances) => res.status(200).json(bookinstances))
        .catch((error) => res.status(400).json({ error }));
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function (req, res, next) {
    BookInstance
        .findOne({ _id: req.params.id })
        .populate('book')
        .then((bookinstance) => res.status(200).json(bookinstance))
        .catch((error) => res.status(404).json({ error }));
};

// Handle BookInstance create
exports.bookinstance_create = function (req, res, next) {
    var bookinstance = new BookInstance(
        {
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        }
    );
    bookinstance.save()
    .then(() => res.status(201).json({ message: "Book Instance saved successfully !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Handle BookInstance delete
exports.bookinstance_delete = function (req, res, next) {
    BookInstance.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(200).json({ message: 'Deleted!' });
            })
            .catch((error) => {
                res.status(400).json({ error: error });
            });
};

// Handle bookinstance update
exports.bookinstance_update = function (req, res, next) {

    var bookinstance = new BookInstance(
        {
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back,
            _id:req.params.id
        }
    );

    BookInstance.updateOne({ _id: req.params.id }, bookinstance).then(
        () => {
            res.status(201).json({
                message: 'BookInstance updated successfully!'
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
