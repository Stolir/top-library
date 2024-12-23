const addButton = document.querySelector(".add");
const modal = document.querySelector("dialog");
const form = modal.querySelector("form");

// select all 3 tables
const readingTable = document.querySelector(".reading, .reading table")
const completedTable = document.querySelector(".completed, .reading table")
const planToReadTable = document.querySelector(".plan-to-read, .plan-to-read table") 


addButton.addEventListener("click", () => {
    modal.showModal()
})

form.addEventListener('submit', (e) => {
  if (e.submitter.formMethod !== 'dialog') {
    e.preventDefault();

    const formData = new FormData(form);

    addBookToLibrary(
      formData.get('title'),
      formData.get('author'),
      formData.get('pages'),
      formData.get('rating'),
      formData.get('status'))
  }
})


const completedArray = [];
const readingArray = [];
const planToReadArray = [];

function Book(title, author, pageCount, raiting, status) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.raiting = raiting;
  this.status = status;
}

function addBookToLibrary(title, author, pageCount, raiting, status) {

  const book = new Book(title, author, pageCount, raiting, status);
    
  switch(status) {
    case "completed":
        completed.push(book);
        sortByRating(completedArray);
        renderBook(completedTable, completedArray);
        break;
    case "reading":
        reading.push(book);
        sortByName(readingArray);
        renderBook(readingTable, readingArray);
        break;
    default:
        planToRead.push(book);
        sortByName(planToReadArray);
        renderBook(planToReadTable, planToReadArray);
  }
}

function renderBooks(elements, array) {

}

function sortByRating(array) {
  array.sort((a, b) => a.rating - b.rating);
}

function sortByName(array) {
  array.sort((a, b) => a.title - b.title);
}