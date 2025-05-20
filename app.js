// Constructor

const myLibrary = [];

function Book(title, year, pages, id) {
  this.title = title;
  this.year = year;
  this.pages = pages;
  this.id = id;
}

function addBookToLibrary(title, year, pages, id) {
  const myFirstBook = new Book(title, year, pages, id);

  myLibrary.push(myFirstBook);

  return;
}

addBookToLibrary("Pan prstenov", 1998, 458, crypto.randomUUID());
addBookToLibrary("Harry Potter", 2001, 469, crypto.randomUUID());
addBookToLibrary("Blue Hustler", 2011, 429, crypto.randomUUID());

console.log(myLibrary);

/// render UI

function renderUI(data) {
  const bookContainer = document.getElementById("book-container");

  bookContainer.innerHTML = data
    .map(
      (book) =>
        `<div class="book-item">
        <h3>${book.title}</h3>
        <p>Year: ${book.year}</p>
        <p>Pages: ${book.pages}</p>
      </div>`
    )
    .join("");
}

console.log(renderUI(myLibrary));

renderUI(myLibrary);
