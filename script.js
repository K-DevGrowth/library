const tableBody = document.querySelector(".table-body");

const addBookBtn = document.querySelector("#addBook");
const closeBtn = document.querySelector("#closeBtn");
const confirmBtn = document.querySelector("#confirmBtn");
const favDialog = document.querySelector("#favDialog");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

const displayLibrary = () => {
  tableBody.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const row = document.createElement("tr");
    row.innerHTML = 
      `<th>${index + 1}</th>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>
      ${book.read === "read" ? 
        `<button class="status btn">read</button>` :
        `<button class="status btn active">not read yet</button>`}
      </td>
      <td>
       <button class="delete btn" 
        data-index="${index}">Delete</button>
      </td>`
    tableBody.appendChild(row);
  })
}

const reset = () => {
  favDialog.close();
  title.value = "";
  author.value = "";
  pages.value = "";
}

addBookBtn.addEventListener("click", () => favDialog.showModal());
closeBtn.addEventListener("click", () => favDialog.close());
confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (title.value && author.value && pages.value) {
    addBookToLibrary(title.value, author.value, pages.value, read.value);
    reset();
  }
  else {
    alert("You must enter the value!");
  }  
  displayLibrary();
});

tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let index = e.target.getAttribute("data-index");
    myLibrary.splice(index, 1);
    displayLibrary();
  }
});

tableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("status")) {
    e.target.textContent === "read" ?
      e.target.textContent = "not read yet" :
      e.target.textContent = "read";
  }
  if (!e.target.classList.contains("active") &&
      e.target.textContent !== "read") {
    e.target.classList.add("active")
  }
  else {
    e.target.classList.remove("active")
  }
})

addBookToLibrary("Atomic Habits", "James Clear", 388, "read");
addBookToLibrary("Deep Work", "Cal Newport", 356, "not read yet");
displayLibrary();