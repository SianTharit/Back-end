const { Author, Book } = require("../models");
const createError = require("../utils/createError");

exports.getAllBooks = async (req, res, next) => {
   try {
      const result = await Book.findAll({
         include: {
            model: Author,
            as: "author",
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
         },
         attributes: { exclude: ["id", "createdAt", "updatedAt", "authorId"] },
      });
      console.log(JSON.parse(JSON.stringify(result)));

      res.json({ result });
   } catch (err) {
      next(err);
   }
};

exports.createBook = async (req, res, next) => {
   try {
      const { name, genre, authorName, gender } = req.body;

      if (!name) {
         createError("name of book is required", 400);
      }

      if (!genre) {
         createError("genre of book is required", 400);
      }

      if (!authorName) {
         createError("author name of book is required", 400);
      }

      if (!gender) {
         createError("gender is required", 400);
      }

      const findAuthor = await Author.findOne({
         where: { name: authorName },
      });

      if (findAuthor) {
         const result = await Book.create({
            authorId: findAuthor.id,
            name,
            genre,
         });
         res.status(201).json({
            result,
            message: "created successfully",
         });
      } else {
         const createAuthor = await Author.create({
            name: authorName,
            gender,
         });
         const result = await Book.create({
            authorId: createAuthor.id,
            name,
            genre,
         });
         res.status(201).json({
            result,
            message: "created successfully",
         });
      }
   } catch (err) {
      next(err);
   }
};

exports.updateBook = async (req, res, next) => {
   try {
      const { bookId } = req.params;
      const { name, genre, authorName, gender } = req.body;
      const foundBook = await Book.findOne({
         where: { id: bookId },
      });

      const author = JSON.parse(JSON.stringify(foundBook));
      console.log(author);
      const authorId = author.id;

      const updatedBook = await Book.update(
         {
            name,
            genre,
         },
         { where: { id: bookId } }
      );
      const updateAuthor = await Author.update(
         {
            name: authorName,
            gender,
         },
         { where: { id: authorId } }
      );

      res.status(201).json({ updatedBook, updateAuthor });
   } catch (err) {
      next(err);
   }
};

exports.deleteBook = async (req, res, next) => {
   try {
      const { bookId } = req.params;
      const findBook = await Book.findOne({
         where: { id: bookId },
      });

      await findBook.destroy();
      res.json({ message: "deleted successfully" });
   } catch (err) {
      next(err);
   }
};

exports.deleteAuthor = async (req, res, next) => {
   try {
      const { authorId } = req.params;
      const findAuthor = await Author.findOne({
         where: { id: authorId },
      });
      await findAuthor.destroy();
      await Book.destroy({
         where: { authorId },
      });
      res.json({ message: "deleted successfully" });
   } catch (err) {
      next(err);
   }
};
