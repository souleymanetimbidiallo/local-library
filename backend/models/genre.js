var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
    {
        name: { type: String, required: true, enum: ['Fantasy', 'Science Fiction', 'French Poetry', 'Romance',  'Military', 'History'], default: 'Fantasy' },
    }
);

// Virtual for bookinstance's URL
GenreSchema
    .virtual('url')
    .get(function () {
        return '/catalog/bookinstance/' + this._id;
    });

//Export model
module.exports = mongoose.model('Genre', GenreSchema);
