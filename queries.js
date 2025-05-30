// 1. Find all books in a specific genre

db.books.find({ genre: "Fiction" })

db.books.find({ genre: "Fantasy" })

db.books.find({ genre: "Dystopian" })


// 2. Find books published after a certain year

db.books.find({ published_year: { $gt: 1950 } })


db.books.find({ published_year: { $gt: 2000 } })


db.books.find({ published_year: { $gte: 1945 } })


// 3. Find books by a specific author

db.books.find({ author: "George Orwell" })

db.books.find({ author: "J.R.R. Tolkien" })  

db.books.find({ author: "Harper Lee" })


// 4. Update the price of a specific book

db.books.updateOne(
  { title: "The Great Gatsby" },
  { $set: { price: 15.99 } }
)

db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 16.99 } }
)

db.books.updateOne(
  { title: "Brave New World" },
  { $set: { price: 13.99, in_stock: true } }
)


// 5. Delete a book by its title

db.books.deleteOne({ title: "Animal Farm" })

db.books.deleteOne({ title: "Moby Dick" })

db.books.find({ title: "Animal Farm" }) 


// 1. Find books that are both in stock AND published after 2010

db.books.find({
  $and: [
    { in_stock: true },
    { published_year: { $gt: 2010 } }
  ]
})

// 2. PROJECTION - Return only specific fields (title, author, price)

db.books.find(
  { genre: "Fiction" }, 
  { title: 1, author: 1, price: 1}
)

db.books.find(
  { in_stock: true }, 
  { title: 1, author: 1, price: 1 }
)

// 3. SORTING - Display books by price

db.books.find().sort({ price: 1 })

db.books.find().sort({ price: -1 })

db.books.find(
  {}, 
  { title: 1, author: 1, price: 1, _id: 0 }
).sort({ price: 1 })

// 4. PAGINATION - 5 books per page

    // PAGE 1 - First 5 books (skip 0, limit 5)
      db.books.find().limit(5).skip(0)

   // PAGE 2 - Next 5 books (skip 5, limit 5)
      db.books.find().limit(5).skip(5)

  // PAGE 3 - Next 5 books (skip 10, limit 5)
      db.books.find().limit(5).skip(10)


// 1. CALCULATE AVERAGE PRICE BY GENRE 
 
db.books.aggregate([
  { $group: { _id: "$genre", average_price: { $avg: "$price" } } },
  { $sort: { average_price: -1 } }
])

// 2. FIND AUTHOR WITH MOST BOOKS

db.books.aggregate([
  { $group: { _id: "$author", book_count: { $sum: 1 } } },
  { $sort: { book_count: -1 } },
  { $limit: 1 }
])

// 3. GROUP BOOKS BY PUBLICATION DECADE

db.books.aggregate([
  {
    $project: {
      decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] }
    }
  },
  { $group: { _id: "$decade", book_count: { $sum: 1 } } },
  { $sort: { decade: 1 } }
])


// 1. CREATE INDEX ON TITLE FIELD


// Create single field index on title
db.books.createIndex({ title: 1 })

// Verify the index was created
db.books.getIndexes()


// 2. CREATE COMPOUND INDEX ON AUTHOR AND PUBLISHED_YEAR

// Create compound index (multiple fields)
db.books.createIndex({ author: 1, published_year: 1 })

// Alternative: Different sort orders
db.books.createIndex({ author: 1, published_year: -1 })


// 3. PERFORMANCE COMPARISON WITH EXPLAIN()

// BEFORE CREATING INDEXES - Run these first to see slow performance

// Test 1: Search by title (WITHOUT index)
db.books.find({ title: "The Great Gatsby" }).explain("executionStats")

// Test 2: Search by author and year (WITHOUT index) 
db.books.find({ author: "George Orwell", published_year: 1949 }).explain("executionStats")

// NOW CREATE THE INDEXES
db.books.createIndex({ title: 1 })
db.books.createIndex({ author: 1, published_year: 1 })

// AFTER CREATING INDEXES - Run same queries to see improvement

// Test 1: Search by title (WITH index) - Much faster!
db.books.find({ title: "The Great Gatsby" }).explain("executionStats")

// Test 2: Search by author and year (WITH index) - Much faster!
db.books.find({ author: "George Orwell", published_year: 1949 }).explain("executionStats")
