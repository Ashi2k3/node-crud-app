const express = require("express");
const Book = require("../models/book"); // Import book model

const router = express.Router();

// ✅ GET all books
router.get("/books", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error });
    }
});

// ✅ GET books by published year (Query Param)
router.get("/books/search", async (req, res) => {
    try {
        const { publishedYear } = req.query;
        if (!publishedYear) {
            return res.status(400).json({ message: "Published year is required" });
        }
        const books = await Book.find({ publishedYear: parseInt(publishedYear) });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Error searching books", error });
    }
});

// ✅ GET a single book by ID
router.get("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error });
    }
});

// ✅ POST a new book
router.post("/books", async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(500).json({ message: "Error adding book", error });
    }
});

// ✅ PUT (Update) a book by ID
router.put("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error });
    }
});

// DELETE a book by ID
router.delete("/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully", deletedBook });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error });
    }
});


module.exports = router;
