const container = document.querySelector("#container");
const button = document.querySelector(".button");

const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);

  for (el in myLibrary) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    container.appendChild(bookDiv);
  }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("Harry Potter", "J.K. Rowling", 309, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);