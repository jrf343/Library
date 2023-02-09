/*
TODO:

*/

const libraryCards = document.querySelector('.library-cards');
const formDisplay = document.querySelector('.form-display');
const formInfo = document.querySelector('form');

let library = [];

class Book {
    constructor(title, author, pageNum) {
        this.title = title;
        this.author = author;
        this.pageNum = pageNum;
        this.readStatus = 'not read';
        this.displayed = false;
        this.getDisplayStatus = function () {
            return this.displayed;
        };
        this.setDisplayStatus = function (value) {
            this.displayed = value;
        }
    }
}

function displayLibrary () {
    for (let elem of library) {
        index = library.indexOf(elem);
        if ( elem.getDisplayStatus() === false ) {
            newBook = createBookCard(elem, index);
            libraryCards.appendChild(newBook);
            elem.setDisplayStatus(true);
        }
    }
}

function addBookToLibrary (Book) {
    library.push(Book);
    displayLibrary();
}

function createBookCard (Book, index) {
    const newBook = document.createElement('div');
        newBook.classList.add('newBook');
        newBook.setAttribute('id',`${index}`);

    const newBookTitle = document.createElement('div');
        newBookTitle.classList.add('newBookTitle');
        newBookTitle.textContent = Book.title;
        newBook.appendChild(newBookTitle);

    const newBookAuthor = document.createElement('div');
        newBookAuthor.classList.add('newBookAuthor');
        newBookAuthor.textContent = Book.author;
        newBook.appendChild(newBookAuthor);

    const newBookPageNum = document.createElement('div');
        newBookPageNum.classList.add('newBookPageNum');
        newBookPageNum.textContent = `${Book.pageNum} pages`;
        newBook.appendChild(newBookPageNum);

    const newBookReadStatus = document.createElement('div');
        newBookReadStatus.classList.add('newBookReadStatus');

        const label = document.createElement('label');
            label.classList.add('label');

            const status = document.createElement('input');
                status.classList.add('status');
                status.setAttribute('type', 'checkbox');
                label.appendChild(status);

            const slider = document.createElement('div');
                slider.classList.add('slider');
                slider.setAttribute('unchecked', 'not read');
                slider.setAttribute('checked', 'read');
                label.appendChild(slider);
            
            newBookReadStatus.appendChild(label);  
    
        newBook.appendChild(newBookReadStatus);

    const deleteButton = document.createElement('button');
        deleteButton.textContent = "Delete Book";
        deleteButton.classList.add('deleteButton');
        newBook.appendChild(deleteButton);

    return newBook;
}

const book1 = new Book ('Souvlaki', 'Slowdive', '367');
const book2 = new Book ('I Feel Love', 'Donna Summer', '203');
const book3 = new Book ('Four Seasons', 'Max Richter', '378');

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);


const newBookButton = document.querySelector('#new-book');
newBookButton.addEventListener('click', () => {
    formDisplay.style.display = 'block';
})

window.addEventListener('click', function(event) {
   if (!event.target.matches('#new-book')) {
        if ( (formDisplay.style.display === 'block') && (!event.target.closest('.form-popup')) ) {
            formDisplay.style.display = 'none';
            document.querySelector("form").reset();
        }
   }
})

const submitButton = document.querySelector('#submit-button');
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (emptyCheck() === false) {
        return;
    }
    if (numCheck() === false) {
        return;
    }
    const formTitle = document.querySelector('#book-title').value;
    const formAuthor = document.querySelector('#book-author').value;
    const formPageNum = document.querySelector('#book-pageNum').value;
    const formReadStatus = 'not read';
    const addition = new Book(formTitle, formAuthor, formPageNum, formReadStatus);
    addBookToLibrary(addition);
    displayLibrary();
    formDisplay.style.display = 'none';
    document.querySelector("form").reset();
})

function emptyCheck() {
    let titleCheck = document.getElementById('book-title').value;
    let authorCheck = document.getElementById('book-author').value;
    let pageNumCheck = document.getElementById('book-pageNum').value;
    if ((titleCheck === '') || (authorCheck === '')|| (pageNumCheck === '')) {
        alert('Please enter information in each field.')
        return false;
    }
}

function numCheck() {
    let pageNumCheck = document.getElementById('book-pageNum').value;
    if (isNaN(pageNumCheck)) {
        alert('Must enter numbers.')
        document.getElementById('book-pageNum').value = '';
        return false;
    }
}

document.querySelector('.library-cards').onclick = (event) => {
    let el = event.target.matches('.deleteButton');
    if (el) {
        let bookDiv = event.target.parentElement;
        let targetID = bookDiv.getAttribute('id');
        library.splice(parseInt(targetID), 1);
        bookDiv.remove();
        displayLibrary();
    }
}

document.querySelector('.library-cards').onchange = (event) => {
    let el = event.target.matches('.status');
    if (el) {
        let bookDiv = event.target.parentElement.parentElement.parentElement;
        let targetID = bookDiv.getAttribute('id');
        let targetBook = library[parseInt(targetID)];
        if ( targetBook.readStatus === 'not read' ) {
            targetBook.readStatus = 'read';
        } else {
            targetBook.readStatus = 'not read';
        }
    }
}