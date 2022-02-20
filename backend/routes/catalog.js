var express = require('express');
var router = express.Router();

// Require controller modules.
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var genre_controller = require('../controllers/genreController');
var book_instance_controller = require('../controllers/bookinstanceController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', book_controller.index);

router.post('/books', book_controller.book_create);
router.delete('/books/:id', book_controller.book_delete);
router.put('/books/:id', book_controller.book_update);
router.get('/books/:id', book_controller.book_detail);
router.get('/books', book_controller.book_list);

/// AUTHOR ROUTES ///
router.post('/authors', author_controller.author_create);
router.delete('/authors/:id', author_controller.author_delete);
router.put('/authors/:id', author_controller.author_update);
router.get('/authors/:id', author_controller.author_detail);
router.get('/authors', author_controller.author_list);

/// GENRE ROUTES ///
router.post('/genres', genre_controller.genre_create);
router.delete('/genres/:id', genre_controller.genre_delete);
router.put('/genres/:id', genre_controller.genre_update);
router.get('/genres/:id', genre_controller.genre_detail);
router.get('/genres/:id/books', genre_controller.genre_detail_books);
router.get('/genres', genre_controller.genre_list);

/// BOOKINSTANCE ROUTES ///
router.post('/bookinstances', book_instance_controller.bookinstance_create);
router.delete('/bookinstances/:id', book_instance_controller.bookinstance_delete);
router.put('/bookinstances/:id', book_instance_controller.bookinstance_update);
router.get('/bookinstances/:id', book_instance_controller.bookinstance_detail);
router.get('/bookinstances', book_instance_controller.bookinstance_list);

module.exports = router;
