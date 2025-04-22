const container = document.querySelector("#container");
const form = document.querySelector("form");
const showBtn = document.getElementById("showDialog");
const bookDialog = document.getElementById("bookDialog");
const confirmBtn = bookDialog.querySelector("#confirmBtn");
const cancelBtn = bookDialog.querySelector("#cancelBtn");

const myLibrary = [];

function Book(title, author, pages, readStatus) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID();
  this.displayInfo = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
  }
}

function addBookToLibrary(title, author, pages, readStatus) {
  const myLibrary = new Book(title, author, pages, readStatus);
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  container.appendChild(bookDiv);
  bookDiv.textContent = myLibrary.displayInfo();
}

showBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

cancelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  bookDialog.close();
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  addBookToLibrary(formValues.title, formValues.author, formValues.pages, formValues.readStatus);
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "read");
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, "not read");