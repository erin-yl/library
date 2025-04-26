const container = document.querySelector(".container");
const form = document.querySelector("form");
const showDialog = document.querySelector("#showDialog");
const bookDialog = document.querySelector("#bookDialog");
const confirmBtn = bookDialog.querySelector("#confirmBtn");
const cancelBtn = bookDialog.querySelector("#cancelBtn");
const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, readStatus) {
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);

  const bookDiv = createBookCard(newBook);
  container.prepend(bookDiv);
}

function createBookCard(book) {
  const bookDiv = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookStatus = document.createElement("p");
  const divider = document.createElement("hr");
  const changeBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookTitle.textContent = `Title: ${book.title}`;
  bookAuthor.textContent = `Author: ${book.author}`;
  bookPages.textContent = `Pages: ${book.pages}`;
  bookStatus.textContent = `Status: ${book.readStatus}`;

  bookDiv.classList.add("card");
  bookDiv.dataset.id = book.id;
  
  changeBtn.textContent = "Change read status";
  changeBtn.classList.add("secondaryBtn");

  removeBtn.textContent = "Remove book";
  removeBtn.classList.add("secondaryBtn");

  bookDiv.append(bookTitle, bookAuthor, bookPages, bookStatus, divider, changeBtn, removeBtn);

  changeBtn.addEventListener("click", () => {
    // Update the DOM and myLibrary array
    const bookIndex = myLibrary.findIndex(b => b.id === book.id);
    if (bookIndex !== -1) {
      myLibrary[bookIndex].readStatus = myLibrary[bookIndex].readStatus === "Read" ? "Not read" : "Read";
      bookStatus.textContent = `Status: ${myLibrary[bookIndex].readStatus}`;
    }
  });

  removeBtn.addEventListener("click", () => {
    // Remove from the DOM and myLibrary array
    container.removeChild(bookDiv);
    const bookIndex = myLibrary.findIndex(b => b.id === book.id);
    if (bookIndex !== -1) {
      myLibrary.splice(bookIndex, 1);
    }
  });
  
  return bookDiv;
}

function validateForm() {
  const title = form.elements.title.value.trim();
  const author = form.elements.author.value.trim();
  const pages = form.elements.pages.value;
  const errorDiv = bookDialog.querySelector(".errorDiv");
  const errorMsg = bookDialog.querySelector(".errorMsg");
  
  if (!title || !author || !pages) {
    errorDiv.style.display = "inline-block";
    errorMsg.textContent = "Please enter the book's title, author, and number of pages.";
    return false;
  }

  if (parseInt(pages) <= 0) {
    errorDiv.style.display = "inline-block";
    errorMsg.textContent = "Please enter a positive number for pages.";
    return false;
  }
  
  errorDiv.style.display = "none";
  errorMsg.textContent = "";
  return true;
}

showDialog.addEventListener("click", () => {
  bookDialog.showModal();
});

cancelBtn.addEventListener("click", (event) => {
  const errorDiv = bookDialog.querySelector(".errorDiv");

  event.preventDefault();
  bookDialog.close();
  form.reset();
  errorDiv.style.display = "none";
});

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  
  if (validateForm()) {
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData);
    const readStatus = form.elements.read.checked ? "Read" : "Not read";
    
    addBookToLibrary(formValues.title, formValues.author, formValues.pages, readStatus);
    bookDialog.close();
    form.reset();
  }
});

// Initialize with sample books
addBookToLibrary("Quiet", "Susan Cain", 352, "Read");
addBookToLibrary("Crying in H Mart", "Michelle Zauner", 256, "Read");
addBookToLibrary("The Midnight Library", "Matt Haig", 304, "Read");