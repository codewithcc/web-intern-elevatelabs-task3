# 📚 Books REST API (Node.js + Express)
A lightweight REST API built using **Node.js**, **Express**, and **dotenv**.  
It supports full CRUD operations for books, includes an authorization middleware, and stores all data in local memory with auto-incrementing IDs.

## 🚀 Features
- Full CRUD operations (Create, Read, Update, Delete)
- Auto-incrementing book IDs
- Query support: `/books?id=`
- API key authorization
- `.env` support for configuration
- Robust error handling with status codes
- Uses an in-memory array (no database required)

## 🛠️ Tech Stack
- Node.js
- Express.js
- dotenv

## 📦 Installation
Install dependencies:
```bash
npm install
```

## ⚙️ Environment Variables
Create a .env file in the project root:
```dotenv
API_KEY=your-secret-api-key
PORT=3000
```

## ▶️ Start the Server
```bash
npm run dev
```

## 🔐 Authorization
Every request must include this header:
```text
Authorization: Bearer your-secret-api-key
```

## 📘 API Endpoints
### **1. Create a Book**

**POST** ``/book``

Body:
```json
{
  "title": "Book Title",
  "description": "Book Description",
  "author": "Author Name",
  "cost": 500
}
```
Responses:

- **201** Created — Book added
- **400** Bad Request — Missing required fields


### **2. Get Books**
**GET** ``/books``

**GET** ``/books?id=1``

Behavior:

- Without id: returns all books
- With id: returns a specific book

Responses:

- **200** OK
- **404** Not Found

### **3. Update a Book**

**PUT** ``/book?id=1``

Body (partial update allowed):
```json
{
  "title": "Updated Title",
  "cost": 600
}
```

Responses:

- **200** OK — Updated
- **400** Bad Request — Missing ID
- **404** Not Found — Book not found

### **4. Delete a Book**

**DELETE** ``/book?id=1``

Responses:

- **200** OK — Deleted
- **400** Bad Request — Missing ID
- **404** Not Found — Book not found


## 📝 Notes

- This API uses an in-memory array. Restarting the server resets all data.
- Serves as a clean starting point for building larger Node.js REST APIs.

