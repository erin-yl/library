const container = document.querySelector("#container");
const form = document.querySelector("form");
const showDialog = document.getElementById("showDialog");
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

showDialog.addEventListener("click", () => {
  bookDialog.showModal();
});

cancelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  bookDialog.close();
});

confirmBtn.addEventListener("click", (event) => {
  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);
  if (formValues.title == "" || formValues.author == "" || formValues.pages == "" || formValues.readStatus == undefined) {
    const errorMsg = document.getElementById("errorMsg");
    errorMsg.innerText = "Please fill in all fields";
  } else {
    addBookToLibrary(formValues.title, formValues.author, formValues.pages, formValues.readStatus);
    bookDialog.close();
    form.reset();
    errorMsg.innerText = "";
  }
  event.preventDefault();
});

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "read");
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, "not read");