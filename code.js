const completedArray = [];
const readingArray = [];
const planToReadArray = [];

let currentArgs = [];
let isEditMode = false;
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
  if (isEditMode) {
    deleteBook(currentArgs[0], currentArgs[1], currentArgs[2])
    isEditMode = false;
    document.querySelectorAll('form input').forEach((input) => {
      input.value = "";
    })
  }
  modoal.close();
})

function Book(title, author, pageCount, raiting, status) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.rating = raiting;
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
    let index = 0;
    const keysLength = Object.keys(obj).length;
    const tableRow = elements[1].insertRow(-1);
    for (let key in obj) {
      const tableCell = tableRow.insertCell(-1);
      tableCell.textContent = obj[key];
      // if we are on the last cell add the edit/delete button inside it
      if (index === keysLength - 1) {
        // make edit icon
        const editIcon = document.createElement("img");
        editIcon.setAttribute('src', 'assets/pencil.svg');
        editIcon.classList.add('edit');
        editIcon.addEventListener('click', () => {
          const parentRow = editIcon.closest('tr');
          const parentIndex = parentRow.rowIndex - 1;
          editBook(elements, array, parentIndex);
        })
        // make delete Icon 
        const deleteIcon = document.createElement("img");
        deleteIcon.setAttribute('src', 'assets/delete.svg');
        deleteIcon.classList.add('delete');
        deleteIcon.addEventListener('click', () => {
          const parentRow = deleteIcon.closest('tr');
          const parentIndex = parentRow.rowIndex - 1;
          deleteBook(elements, array, parentIndex)
        });
        tableCell.appendChild(editIcon);
        tableCell.appendChild(deleteIcon);
      }
      index++;
    }
    elements[1].appendChild(tableRow);
  });

  if (elements[0].classList.contains("hidden")) {
    elements[0].classList.remove("hidden");
    emptyMessage.classList.add("hidden")
  }
}

function sortByRating(array) {
  return array.sort((a, b) => b.rating - a.rating);
}

function sortByName(array) {
  return array.sort((a, b) => a.title.localeCompare(b.title));
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


function deleteBook(elements, array, index) {
  array.splice(index, 1);
  elements[1].deleteRow(index);
  if (array.length <= 0) {
    elements[0].classList.add("hidden");
  }
}

function editBook(elements, array, index) {
  isEditMode = true;
  currentArgs = arguments;
  document.querySelector("form #title").value = array[index].title;
  document.querySelector("form #author").value = array[index].author;
  document.querySelector("form #pages").value = array[index].pageCount;
  document.querySelector("form #rating").value = array[index].rating;
  document.querySelector("form #status").value = array[index].status;
  modal.showModal();

}