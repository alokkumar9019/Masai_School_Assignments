/*You have been provided with a script that is intended to handle a system for tracking book collections in a small library. The script uses arrays and objects to manage information but contains logical errors and syntax misuse, especially around ES6 features.*/

const library = {
  books: [{ title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }],

  addBook(book) {
    if (
        typeof book.title !== 'string' ||
        typeof book.author !== 'string' ||
        typeof book.year !== 'number' 
    ) {
      console.log("Book information is incomplete.");
      return;
    }
    this.books.push(book);
  },

  findBookByTitle(title) {
    return this.books.find((book) => book.title === title);
  },

  removeBook(title) {
    const index = this.books.findIndex((book) => book.title === title);

    if (index !== -1) {
      this.books.splice(index, 1);
    } else {
      console.log("Book not found.");
    }
  },
};

library.addBook({title:"Alok",author: "George Orwell", year: 1949});

console.log(library.books.length);
