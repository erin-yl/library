const container = document.querySelector(".container");
const form = document.querySelector("form");
const showDialog = document.querySelector("#showDialog");
const libraryDialog = document.querySelector("#libraryDialog");
const confirmBtn = libraryDialog.querySelector(".confirm");
const cancelBtn = libraryDialog.querySelector(".cancel");
const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleReadStatus = function() {
  this.readStatus = this.readStatus === "Read" ? "Not read" : "Read";
  return this.readStatus;
};

function addBookToLibrary(title, author, pages, readStatus) {
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);

  const bookDiv = createBookCard(newBook);
  container.prepend(bookDiv);
}

function createBookCard(book) {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("card");
  bookDiv.dataset.id = book.id;

  bookDiv.innerHTML = `
    <p>Title: ${book.title}</p>
    <p>Author: ${book.author}</p>
    <p>Pages: ${book.pages}</p>
    <p class="status">Status: ${book.readStatus}</p>
    <hr>
    <button class="change secondaryBtn">Change read status</button>
    <button class="remove secondaryBtn">Remove book</button>
  `;
  
  const changeBtn = bookDiv.querySelector('.change');
  const removeBtn = bookDiv.querySelector('.remove');

  changeBtn.addEventListener("click", () => {
    const bookIndex = myLibrary.findIndex(b => b.id === book.id);
    if (bookIndex !== -1) {
      const newStatus = myLibrary[bookIndex].toggleReadStatus();
      bookDiv.querySelector('.status').textContent = `Status: ${newStatus}`;
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
  const errorDiv = libraryDialog.querySelector(".errorDiv");
  const errorMsg = libraryDialog.querySelector(".errorMsg");
  
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
  libraryDialog.showModal();
});

cancelBtn.addEventListener("click", (event) => {
  const errorDiv = libraryDialog.querySelector(".errorDiv");

  event.preventDefault();
  libraryDialog.close();
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
    libraryDialog.close();
    form.reset();
  }
});

// Initialize with sample books
addBookToLibrary("Quiet", "Susan Cain", 352, "Read");
addBookToLibrary("Crying in H Mart", "Michelle Zauner", 256, "Read");
addBookToLibrary("The Midnight Library", "Matt Haig", 304, "Read");