const express = require("express");

const bookController = require("../controllers/BookController");

const router = express.Router();

router.get("/allBooks", bookController.getAllBooks);

router.post("/newBook", bookController.createBook);

router.patch("/update/:bookId", bookController.updateBook);

// delete book only
router.delete("/destroy/:bookId", bookController.deleteBook);

// delete all book with author
router.delete("/delete/:authorId", bookController.deleteAuthor);

module.exports = router;
