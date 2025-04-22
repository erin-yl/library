const container = document.querySelector("#container");
const button = document.querySelector("button");
const showBtn = document.getElementById("show-dialog");
const bookDialog = document.getElementById("book-dialog");
const outputBox = document.querySelector("output");
const selectEl = document.querySelector('input[name="read-status"]:checked');
const confirmBtn = bookDialog.querySelector("#confirm-btn");

// "Show the dialog" button opens the <dialog> modally
showBtn.addEventListener("click", () => {
  bookDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
bookDialog.addEventListener("close", (e) => {
  outputBox.value =
    bookDialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${bookDialog.returnValue}.`; // Have to check for "default" rather than empty string
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  bookDialog.close(selectEl.value); // Have to send the select box value here.
});

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
  this.displayInfo = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const myLibrary = new Book(title, author, pages, read);
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");
  container.appendChild(bookDiv);
  bookDiv.textContent = myLibrary.displayInfo();
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "read");
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, "not read");