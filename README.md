[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19664809&assignment_repo_type=AssignmentRepo)
# MongoDB Fundamentals Assignment

This assignment focuses on learning MongoDB fundamentals including setup, CRUD operations, advanced queries, aggregation pipelines, and indexing.

## Assignment Overview

You will:
1. Set up a MongoDB database
2. Perform basic CRUD operations
3. Write advanced queries with filtering, projection, and sorting
4. Create aggregation pipelines for data analysis
5. Implement indexing for performance optimization

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install MongoDB locally or set up a MongoDB Atlas account
4. Run the provided `insert_books.js` script to populate your database
5. Complete the tasks in the assignment document

## Files Included

- `Week1-Assignment.md`: Detailed assignment instructions
- `insert_books.js`: Script to populate your MongoDB database with sample book data

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- MongoDB Shell (mongosh) or MongoDB Compass

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all tasks in the assignment
2. Add your `queries.js` file with all required MongoDB queries
3. Include a screenshot of your MongoDB database
4. Update the README.md with your specific setup instructions

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/) 


# MongoDB Bookstore Project

A comprehensive MongoDB project demonstrating CRUD operations, advanced queries, aggregation pipelines, and performance optimization using a bookstore database.

## 📋 Table of Contents

- [Overview](#overview)
- [Database Structure](#database-structure)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Tasks](#project-tasks)
- [Performance Optimization](#performance-optimization)
- [Using MongoDB Compass](#using-mongodb-compass)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Learning Objectives](#learning-objectives)
- [Contributing](#contributing)
- [Resources](#resources)

## Overview

This project implements a bookstore management system using MongoDB, featuring:

- **Database Name**: `plp_bookstore`
- **Collection**: `books`
- **Total Documents**: 12 books
- **Genres**: 8 different genres (Fiction, Fantasy, Dystopian, Romance, etc.)

## Database Structure

### Document Schema

```javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  genre: String,
  published_year: Number,
  price: Number,
  in_stock: Boolean,
  pages: Number,
  publisher: String
}
```

### Sample Document

```javascript
{
  title: "To Kill a Mockingbird",
  author: "Harper Lee",
  genre: "Fiction",
  published_year: 2011,
  price: 12.99,
  in_stock: true,
  pages: 336,
  publisher: "J. B. Lippincott & Co."
}
```

## Prerequisites

- MongoDB installed and running
- MongoDB Shell (mongosh)
- MongoDB Compass (optional but recommended)
- Basic knowledge of JavaScript and MongoDB concepts

## Getting Started

### 1. Connect to MongoDB

```bash
# Using MongoDB Shell
mongosh mongodb://localhost:27017/

# Switch to project database
use plp_bookstore
```

### 2. Insert Sample Data

```javascript
// Insert all 12 books
db.books.insertMany([
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    published_year: 2011,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: "J. B. Lippincott & Co."
  },
  // ... (additional 11 books - see sample-data/books.json)
])
```

### 3. Verify Installation

```javascript
// Check document count
db.books.countDocuments()  // Should return 12

// View all books
db.books.find().pretty()
```

## Project Tasks

### Task 1: Basic CRUD Operations

#### Create Operations
```javascript
// Insert single book
db.books.insertOne({
  title: "New Book",
  author: "Author Name",
  genre: "Fiction",
  published_year: 2024,
  price: 15.99,
  in_stock: true,
  pages: 300,
  publisher: "Publisher Name"
})
```

#### Read Operations
```javascript
// Find all Fiction books
db.books.find({ genre: "Fiction" })

// Find books by specific author
db.books.find({ author: "George Orwell" })

// Find books published after 1950
db.books.find({ published_year: { $gt: 1950 } })
```

#### Update Operations
```javascript
// Update book price
db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 15.99 } }
)
```

#### Delete Operations
```javascript
// Delete book by title
db.books.deleteOne({ title: "Book Title" })
```

### Task 2: Advanced Queries

#### Multiple Conditions
```javascript
// Books in stock AND published after 2010
db.books.find({ 
  in_stock: true, 
  published_year: { $gt: 2010 } 
})
```

#### Projection (Specific Fields)
```javascript
// Show only title, author, price
db.books.find(
  {}, 
  { title: 1, author: 1, price: 1, _id: 0 }
)
```

#### Sorting
```javascript
// Sort by price (ascending)
db.books.find().sort({ price: 1 })

// Sort by price (descending)
db.books.find().sort({ price: -1 })
```

#### Pagination
```javascript
// Page 1: First 5 books
db.books.find().limit(5).skip(0)

// Page 2: Next 5 books
db.books.find().limit(5).skip(5)
```

### Task 3: Aggregation Pipelines

#### Average Price by Genre
```javascript
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      average_price: { $avg: "$price" },
      book_count: { $sum: 1 }
    }
  },
  { $sort: { average_price: -1 } }
])
```

#### Author with Most Books
```javascript
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      book_count: { $sum: 1 },
      books: { $push: "$title" }
    }
  },
  { $sort: { book_count: -1 } },
  { $limit: 1 }
])
```

#### Books by Publication Decade
```javascript
db.books.aggregate([
  {
    $project: {
      decade: {
        $multiply: [
          { $floor: { $divide: ["$published_year", 10] } },
          10
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      book_count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])
```

### Task 4: Indexing & Performance

#### Create Indexes
```javascript
// Single field index on title
db.books.createIndex({ title: 1 })

// Compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })
```

#### Performance Testing
```javascript
// Test query performance
db.books.find({ title: "The Great Gatsby" }).explain("executionStats")

// Compare before and after index creation
// Look for "COLLSCAN" vs "IXSCAN" in results
```

#### Index Management
```javascript
// View all indexes
db.books.getIndexes()

// Drop specific index
db.books.dropIndex({ title: 1 })
```

## Performance Optimization

### Index Strategy

- **Title Index**: Fast book lookups by title
- **Author + Year Compound Index**: Efficient author queries with date filtering
- **Genre Index**: Quick genre-based filtering

### Query Optimization Tips

- Use indexes for frequently queried fields
- Limit result sets with `.limit()`
- Use projection to return only needed fields
- Analyze queries with `.explain()`

### Expected Performance Improvements

With proper indexing:
- **Title searches**: COLLSCAN → IXSCAN
- **Author queries**: 12 documents examined → 1-2 documents examined
- **Compound queries**: Significant performance improvement

## Using MongoDB Compass

### Connection Details
- **Connection String**: `mongodb://localhost:27017`
- **Database**: `plp_bookstore`
- **Collection**: `books`

### Key Features Used
- **Documents Tab**: View and edit documents
- **Aggregations Tab**: Build aggregation pipelines visually
- **Schema Tab**: Analyze data structure
- **Indexes Tab**: Manage indexes
- **Explain Plan**: Analyze query performance

## Project Structure

```
mongodb-bookstore-project/
├── README.md
├── sample-data/
│   └── books.json
├── queries/
│   ├── basic-crud.js
│   ├── advanced-queries.js
│   ├── aggregations.js
│   └── indexing.js
└── screenshots/
    ├── compass-overview.png
    ├── query-results.png
    └── aggregation-results.png
```

## Troubleshooting

### Common Issues

**Connection Refused Error**
```
MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB service via `services.msc` or `net start MongoDB`

**Compass Won't Connect**
**Solution**: Verify MongoDB service is running and try `mongodb://localhost:27017`

**Shell Commands Not Working**
**Solution**: Ensure you're connected to the correct database with `use plp_bookstore`

## Learning Objectives

- ✅ MongoDB installation and setup
- ✅ Basic CRUD operations
- ✅ Advanced query techniques
- ✅ Aggregation pipeline mastery
- ✅ Index creation and performance optimization
- ✅ MongoDB Compass proficiency
- ✅ Real-world database design principles

## Expected Results

### Sample Query Results
- **Total Books**: 12
- **Genres**: 8 different genres
- **Authors with Multiple Books**: George Orwell (2), J.R.R. Tolkien (2)
- **Price Range**: $7.99 - $19.99
- **Publication Years**: 1813 - 2025

## Contributing

This is an educational project. Feel free to extend it with additional features such as:

- User authentication system
- Order management functionality
- Inventory tracking capabilities
- Advanced search functionality
- RESTful API integration

## Resources

- [MongoDB Official Documentation](https://docs.mongodb.com/)
- [MongoDB Compass Guide](https://docs.mongodb.com/compass/)
- [Aggregation Pipeline Reference](https://docs.mongodb.com/manual/aggregation/)
- [MongoDB Indexing Best Practices](https://docs.mongodb.com/manual/applications/indexes/)

---

