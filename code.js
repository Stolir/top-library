const addButton = document.querySelector(".add");
const modal = document.querySelector("dialog");
const form = modal.querySelector("form");

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


const completed = [];
const reading = [];
const planToRead = [];

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
        completed.push(book)
        break;
    case "reading":
        reading.push(book)
        break;
    default:
        planToRead.push(book)
  }
  renderBooks(completed, reading, planToRead);
}

function renderBooks(completed, reading, planToRead) {

}
