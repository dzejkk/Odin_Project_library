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

// PROTOTYPE FUNCTION MUSI BYT V GLOBALNOM SCOPE ak ju chces volat //

Book.prototype.toggleReadStatus = function () {
  this.hasBeenRead = !this.hasBeenRead; //simple toggle
  console.log(`status has been change to ${this.hasBeenRead}`);
};

///////////////////////////////////////////////////////////////////////

////////ADD BOOK FUNCTION//////////

function addBookToLibrary(title, author, year, pages, hasBeenRead) {
  const id = crypto.randomUUID();
  const newBook = new Book(title, author, year, pages, id, hasBeenRead);
  //console.log(newBook);
  myLibrary.push(newBook);
  renderUI(myLibrary); // important for re rendering UI after book is added !!!
  return newBook;
}

/// RENDER UI ////

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
            <small>read: ${book.hasBeenRead ? "yes" : "no"}</small>
            <button class="status-button" data-book-id="${
              book.id
            }">change status of read</button>
            <hr />
            <button class="remove-button" data-book-id="${
              book.id
            }">Remove item</button>
      </div>`
    )
    .join("");
}
renderUI(myLibrary); //initial render

// ADD NEW BOOK TO THE LIBRARY//
const form = document.getElementById("book-form");

function addNewBook(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const publicationYear = document.getElementById("year").value;
  const pages = document.getElementById("pages").value;
  const hasBeenReadValue = document.querySelector(
    'input[name="hasBeenRead"]:checked'
  ).value; //get the selected value

  const hasBeenRead = hasBeenReadValue === "yes"; // parse  radio button vlaue to real boolean type
  //console.log(hasBeenRead);
  // console.log(title, author, publicationYear, pages);
  addBookToLibrary(title, author, publicationYear, pages, hasBeenRead); // parameters must match Construtor function exactly !!!!
  form.reset();
}
form.addEventListener("submit", addNewBook);

// REMOVE BOOK + TOGGLE STATUS
// add event listener to the parent elemnt, when element dont exist ( dynamically rendered)

const bookContainer = document.getElementById("book-container");

bookContainer.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLElement)) return; //type checking

  // Handle remove button
  if (event.target.classList.contains("remove-button")) {
    const bookId = event.target.dataset.bookId;
    const bookIndex = myLibrary.findIndex((book) => book.id === bookId);

    if (bookIndex > -1) {
      console.log(`Removing book at index: ${bookIndex}`);
      myLibrary.splice(bookIndex, 1);
      renderUI(myLibrary);
    }
  }

  // Handle status change button
  if (event.target.classList.contains("status-button")) {
    const bookId = event.target.dataset.bookId;
    const book = myLibrary.find((book) => book.id === bookId);

    if (book) {
      book.toggleReadStatus(); // Call the prototype method
      renderUI(myLibrary); // Re-render to show updated status
    }
  }
});
