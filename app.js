///*@ts-check*/

// Constructor

// Assuming you have a Book constructor/class
// You'll need to import or define your Book class here
// import Book from './Book.js'; // or however you import it

const myLibrary = [
  new Book(
    "Spoločenstvo Prstena",
    "J.R.R. Tolkien",
    "2005",
    "459",
    "f2d844d4-45bb-495f-ab17-7629cf02a5db",
    true
  ),
  new Book(
    "1984",
    "George Orwell",
    "1949",
    "328",
    "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    false
  ),
  new Book(
    "To Kill a Mockingbird",
    "Harper Lee",
    "1960",
    "281",
    "b2c3d4e5-f6g7-8901-bcde-f23456789012",
    true
  ),
  new Book(
    "The Great Gatsby",
    "F. Scott Fitzgerald",
    "1925",
    "180",
    "c3d4e5f6-g7h8-9012-cdef-345678901234",
    false
  ),
  new Book(
    "Pride and Prejudice",
    "Jane Austen",
    "1813",
    "432",
    "d4e5f6g7-h8i9-0123-defg-456789012345",
    true
  ),
  new Book(
    "Brave New World",
    "Aldous Huxley",
    "1932",
    "268",
    "e5f6g7h8-i9j0-1234-efgh-567890123456",
    false
  ),
  new Book(
    "The Catcher in the Rye",
    "J.D. Salinger",
    "1951",
    "234",
    "f6g7h8i9-j0k1-2345-fghi-678901234567",
    true
  ),
  new Book(
    "Moby Dick",
    "Herman Melville",
    "1851",
    "635",
    "g7h8i9j0-k1l2-3456-ghij-789012345678",
    false
  ),
  new Book(
    "Fahrenheit 451",
    "Ray Bradbury",
    "1953",
    "194",
    "h8i9j0k1-l2m3-4567-hijk-890123456789",
    true
  ),
  new Book(
    "Jane Eyre",
    "Charlotte Brontë",
    "1847",
    "507",
    "i9j0k1l2-m3n4-5678-ijkl-901234567890",
    false
  ),
];

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
  console.log(myLibrary);
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
  console.log(myLibrary);
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
