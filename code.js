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

    let book = new Book(title, author, pageCount, raiting, status);
    
  switch(status) {
    case "completed":
        completed.push(book)
        break;
    case "reading":
        reading.push(book)
        break;
    case "plan-to-read":
        planToRead.push(book)
  }

}


const addButton = document.querySelector(".add");
const modal = document.querySelector("dialog")

addButton.addEventListener("click", () => {
    modal.showModal()
})