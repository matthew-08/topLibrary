const button = document.querySelector("#input-form");

const bookInfo = document.querySelectorAll("#input-form input");

const booksList = document.getElementById('books-list-body');

let booksRead = document.querySelector(".books-read");

let booksUnread = document.querySelector(".books-unread");

let totalBooks = document.querySelector(".total-books");

let readStatus = [ ]

button.addEventListener("submit", function ok(e) {
e.preventDefault();
getBookData(e.target);
});

function getBookData(form) {
    let formData = new FormData(form)

    let object = Object.fromEntries(formData)

    let title = object.booktitle;
    let author = object.bookauthor
    let pages = object.bookpages;
    let readStatus = object.checkbox;


    let book = new bookData(title, author, pages, readStatus    )


    myLibrary.push(book);
    showBookOnScreen(book);
    
}


function bookData(title, author, numberOfPages, readStatus) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages
    this.readStatus = readStatus;
}

let myLibrary = [ ]

function showBookOnScreen(book){
   let bookToDisplay = myLibrary[myLibrary.length -1];
    if (bookToDisplay.readStatus == "on") {
        bookToDisplay.readStatus = "Read"
        booksRead.textContent++
    } else {
        bookToDisplay.readStatus = "Unread"
        booksUnread.textContent++
    }
        let row = document.createElement("tr")
        row.dataset.book = `${myLibrary.indexOf(bookToDisplay)}`    ;
        booksList.appendChild(row);
        for (let i in bookToDisplay) {
            let data = document.createElement("td");
            if (book[i] == "Read" || book[i] == "Unread") {
                data.classList.add("readStatus")
                readStatus.push(data);
            }
            data.textContent = book[i];
            row.appendChild(data);
        }
        let remove = document.createElement("td");
        let removalImg = document.createElement("span");
        removalButtons.push(removalImg);
        removalImg.classList.add("removal-image");
        remove.appendChild(removalImg);
        row.appendChild(remove)
        removalButtons.forEach((img) => img.addEventListener("click", removeBook))
        totalBooks.textContent++

        document.getElementById("input-form").reset();
        readStatus.forEach(e => e.addEventListener("click", resetReadStatus));
}


function removeBook(button) {
    let clicked = event.target  
    const rowToRemove = clicked.parentElement.parentElement;
    let indexToRemove = rowToRemove.dataset.book
    if (myLibrary[indexToRemove].readStatus === "Read") {
        booksRead.textContent--
    } else booksUnread.textContent--
    myLibrary.splice(indexToRemove, 1);
    rowToRemove.remove();
    totalBooks.textContent--
    let ok = Array.from(document.querySelectorAll("tr[data-book"))

    ok.forEach(e => {
        if (e.dataset.book > indexToRemove) {
            e.dataset.book--
        }
    })

}

let removalButtons = [ ];



function resetReadStatus (e) {
    let clicked = event.target 
    let indexToChange = clicked.parentElement.dataset.book
    if (myLibrary[indexToChange].readStatus === "Read") {
        clicked.textContent = "Unread"
        myLibrary[indexToChange].readStatus = "Unread"
        booksRead.textContent--
        booksUnread.textContent++
    } else {
        myLibrary[indexToChange].readStatus = "Read"
        clicked.textContent = "Read"
        booksRead.textContent++
        booksUnread.textContent--
    }
}
