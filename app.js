///*@ts-check*/

// Constructor
const myLibrary = [];

function Book(title, author, year, pages, id, hasBeenRead) {
  this.author = author;
  this.title = title;
  this.year = year;
  this.pages = pages;
  this.id = id;
  this.hasBeenRead = hasBeenRead;
}

function addBookToLibrary(title, author, year, pages, hasBeenRead) {
  const id = crypto.randomUUID();

  const newBook = new Book(title, author, year, pages, id, hasBeenRead);

  console.log(newBook);

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
        `<div class="book-item" data-id=${book.id}>
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>Year: ${book.year}</p>
            <p>Pages: ${book.pages}</p>
            <small>read: ${book.hasBeenRead}</small>
            <hr />
            <button class="remove-button" id="remove-button">Remove item</button>
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

  const hasBeenRead = document.querySelector(
    'input[name="hasBeenRead"]:checked'
  ).value; //get the selected value

  //console.log(hasBeenRead);

  // console.log(title, author, publicationYear, pages);

  addBookToLibrary(title, author, publicationYear, pages, hasBeenRead); // parameters must match Construtor function exactly !!!!
}

form.addEventListener("submit", addNewBook);

// remove book
// add event listener to the parent elemnt, when  element dont exist

const bookContainer = document.getElementById("book-container");

bookContainer.addEventListener("click", (event) => {
  if (
    event.target instanceof HTMLElement &&
    event.target.classList.contains("remove-button")
  ) {
    const bookItem = event.target.closest(".book-item");
    //console.log(bookItem);

    if (bookItem instanceof HTMLElement) {
      const bookId = bookItem.dataset.id;
      //console.log(bookId);
      //console.log(myLibrary);

      const bookIndex = myLibrary.findIndex((book) => book.id === bookId);
      if (bookIndex > -1) {
        console.log(bookIndex);
        myLibrary.splice(bookIndex, 1);
        renderUI(myLibrary); // Re-render after removal
      }
    }
  }
});
