const container = document.querySelector(".container");
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
}

function addBookToLibrary(title, author, pages, readStatus) {
  const myLibrary = new Book(title, author, pages, readStatus);
  const bookDiv = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookStatus = document.createElement("p");
  const divider = document.createElement("hr");
  const changeBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookTitle.textContent = `Title: ${myLibrary.title}`;
  bookAuthor.textContent = `Author: ${myLibrary.author}`;
  bookPages.textContent = `Pages: ${myLibrary.pages}`;
  bookStatus.textContent = `Status: ${myLibrary.readStatus}`;

  bookDiv.classList.add("card");
  changeBtn.textContent = "Change read status";
  changeBtn.classList = "secondaryBtn";
  removeBtn.textContent = "Remove book";
  removeBtn.classList.add("secondaryBtn");

  bookDiv.append(bookTitle, bookAuthor, bookPages, bookStatus, divider, changeBtn, removeBtn);
  container.prepend(bookDiv);

  changeBtn.addEventListener("click", () => {
    if (bookStatus.textContent == "Status: Read") {
      bookStatus.textContent = "Status: Not read";
    } else {
      bookStatus.textContent = "Status: Read";
    }
  });

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
  const errorMsg = bookDialog.querySelector("#errorMsg");
  
  if (formValues.title == "" || formValues.author == "" || formValues.pages == "") {
    errorMsg.textContent = "Please fill out the required fields";
  } else {
    const checkbox = bookDialog.querySelector("#read");
    const hiddenInput = bookDialog.querySelector("#notRead");
    hiddenInput.value = checkbox.checked ? "Read" : "Not read";
    addBookToLibrary(formValues.title, formValues.author, formValues.pages, hiddenInput.value);
    bookDialog.close();
    form.reset();
    errorMsg.textContent = "";
  }
  event.preventDefault();
});

addBookToLibrary("Quiet", " Susan Cain", 352, "Read");
addBookToLibrary("Crying in H Mart", "Michelle Zauner", 256, "Read");
addBookToLibrary("The Midnight Library", "Matt Haig", 304, "Read");