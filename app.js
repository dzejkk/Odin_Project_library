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
addBookToLibrary("blue Hustler", 2011, 429, crypto.randomUUID());

console.log(myLibrary);
