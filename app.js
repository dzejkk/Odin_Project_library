// Constructor
const myLibrary = [];

function Book(title, author, year, pages, id) {
  this.author = author;
  this.title = title;
  this.year = year;
  this.pages = pages;
  this.id = id;
}

function addBookToLibrary(title, author, year, pages) {
  const id = crypto.randomUUID();

  const newBook = new Book(title, author, year, pages, id);

  myLibrary.push(newBook);

  renderUI(myLibrary); // important for re rendering UI after book is added !!!
  return newBook;
}

/// render UI

function renderUI(data) {
  const bookContainer = document.getElementById("book-container");

  bookContainer.innerHTML = data
    .map(
      (book) =>
        `<div class="book-item">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>Year: ${book.year}</p>
        <p>Pages: ${book.pages}</p>
      </div>`
    )
    .join("");
}

renderUI(myLibrary); //initial render

// add new book to library

const form = document.getElementById("book-form");

function addNewBook(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const publicationYear = document.getElementById("year").value;
  const pages = document.getElementById("pages").value;

  // console.log(title, author, publicationYear, pages);

  addBookToLibrary(title, author, publicationYear, pages); // parameters must match Construtor function exactly !!!!
}

form.addEventListener("submit", addNewBook);
