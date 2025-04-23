const container = document.querySelector("#container");
const form = document.querySelector("form");
const showDialog = document.querySelector("#showDialog");
const bookDialog = document.querySelector("#bookDialog");
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
  this.showBookInfo = function () {
    return `Title: ${this.title}\nAuthor: ${this.author}\nPages: ${this.pages}\nStatus: ${this.readStatus}`;
  }
}

function addBookToLibrary(title, author, pages, readStatus) {
  const myLibrary = new Book(title, author, pages, readStatus);
  const bookDiv = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookStatus = document.createElement("p");
  const removeBtn = document.createElement("span");

  bookTitle.textContent = `Title: ${myLibrary.title}`;
  bookAuthor.textContent = `Author: ${myLibrary.author}`;
  bookPages.textContent = `Pages: ${myLibrary.pages}`;
  bookStatus.textContent = `Status: ${myLibrary.readStatus}`;

  bookDiv.classList.add("card");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove");

  bookDiv.append(bookTitle, bookAuthor, bookPages, bookStatus, removeBtn);
  container.appendChild(bookDiv);

  removeBtn.addEventListener("click", () => {
    container.removeChild(bookDiv);
  });
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

addBookToLibrary("Quiet", " Susan Cain", 352, "read");
addBookToLibrary("Crying in H Mart", "Michelle Zauner", 256, "read");
addBookToLibrary("The Midnight Library", "Matt Haig", 304, "read");