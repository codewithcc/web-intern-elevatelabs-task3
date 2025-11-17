import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()
let books = []
let nextId = 1
const API_KEY = process.env.API_KEY
const PORT = process.env.PORT || 3001
const authorize = (req, res, next) => {
    const key = req.headers.authorization.split("Bearer ")[1] || null

    if (!key) {
        return res.status(401).json({ error: "Missing API key" })
    }
    if (key !== API_KEY) {
        return res.status(403).json({ error: "Invalid API key" })
    }

    next()
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(authorize)

app.post("/book", (req, res) => {
    try {
        const { title, description, author, cost } = req.body

        if (!title || !description || !author || !cost) {
            return res.status(400).json({ error: "Missing required fields" })
        }

        const newBook = {
            id: nextId++,
            title,
            description,
            author,
            cost,
        }

        books.push(newBook)

        res.status(201).json({
            message: "Book created successfully",
            book: newBook,
        })
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
})

app.get("/books", (req, res) => {
    try {
        const { id } = req.query

        if (id) {
            const bookId = Number(id)
            const book = books.find((b) => b.id === bookId)

            if (!book) {
                return res.status(404).json({ error: "Book not found" })
            }

            return res.json({ book })
        }

        res.json({ books })
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
})

app.put("/book", (req, res) => {
    try {
        const { id } = req.query
        const { title, description, author, cost } = req.body

        if (!id) {
            return res.status(400).json({ error: "Missing id in query" })
        }

        const bookId = Number(id)
        const bookIndex = books.findIndex((b) => b.id === bookId)

        if (bookIndex === -1) {
            return res.status(404).json({ error: "Book not found" })
        }

        books[bookIndex] = {
            ...books[bookIndex],
            title: title ?? books[bookIndex].title,
            description: description ?? books[bookIndex].description,
            author: author ?? books[bookIndex].author,
            cost: cost ?? books[bookIndex].cost,
        }

        res.json({
            message: "Book updated successfully",
            book: books[bookIndex],
        })
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
})

app.delete("/book", (req, res) => {
    try {
        const { id } = req.query

        if (!id) {
            return res.status(400).json({ error: "Missing id in query" })
        }

        const bookId = Number(id)
        const bookIndex = books.findIndex((b) => b.id === bookId)

        if (bookIndex === -1) {
            return res.status(404).json({ error: "Book not found" })
        }

        const deleted = books.splice(bookIndex, 1)

        res.json({
            message: "Book deleted successfully",
            book: deleted[0],
        })
    } catch (error) {
        res.status(500).json({ error: "Server error" })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})