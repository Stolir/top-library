const completedArray = [];
const readingArray = [];
const planToReadArray = [];

const addButton = document.querySelector(".add");
const modal = document.querySelector("dialog");
const form = modal.querySelector("form");


// select all 3 tables
const readingTable = document.querySelectorAll(".reading, .reading tbody");
const completedTable = document.querySelectorAll(".completed, .completed tbody");
const planToReadTable = document.querySelectorAll(".plan-to-read, .plan-to-read tbody") ;
const emptyMessage = document.querySelector(".empty");

const filters = document.querySelectorAll(".filter *")
filters.forEach((filter) => {
  filter.addEventListener("click", () => filterTables(filter.textContent))
})

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
    case "Completed":
        completedArray.push(book);
        sortByRating(completedArray);
        renderBooks(completedTable, completedArray);
        break;
    case "Reading":
        readingArray.push(book);
        sortByName(readingArray);
        renderBooks(readingTable, readingArray);
        break;
    default:
        planToReadArray.push(book);
        sortByName(planToReadArray);
        renderBooks(planToReadTable, planToReadArray);
  }
}

function renderBooks(elements, array) {

  while ((elements[1].rows.length) > 0) {
    elements[1].deleteRow(-1);
  }

  array.forEach((obj) => {
    const tableRow = elements[1].insertRow(-1);
    for (let key in obj) {
      const tableCell = tableRow.insertCell(-1);
      tableCell.textContent = obj[key];
    }
    elements[1].appendChild(tableRow);
  });

  if (elements[0].classList.contains("hidden")) {
    elements[0].classList.toggle("hidden");
    emptyMessage.classList.add("hidden")
  }
}

function sortByRating(array) {
  array.sort((a, b) => a.rating - b.rating);
}

function sortByName(array) {
  array.sort((a, b) => a.title - b.title);
}

function filterTables(filter) {
  if (filter == "Reading" && readingArray.length > 0) {
    completedTable[0].classList.add("hidden");
    planToReadTable[0].classList.add("hidden");
    readingTable[0].classList.remove("hidden");
  }
  else if (filter == "Completed" && completedArray.length > 0) {
    completedTable[0].classList.remove("hidden");
    planToReadTable[0].classList.add("hidden");
    readingTable[0].classList.add("hidden");
  }
  else if (filter == "Plan to read" && planToReadArray.length > 0) {
    completedTable[0].classList.add("hidden");
    planToReadTable[0].classList.remove("hidden");
    readingTable[0].classList.add("hidden");
  }
  else {
    if (completedArray.length > 0) {
        completedTable[0].classList.remove("hidden");
    }
    if (planToReadArray.length > 0) {
      planToReadTable[0].classList.remove("hidden");
    }
    if (readingArray.length > 0) {
      readingTable[0].classList.remove("hidden");
    }
  }
}