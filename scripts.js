let myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", 310, true),
    new Book("1984", "George Orwell", 328, false),
    new Book("To Kill a Mockingbird", "Harper Lee", 281, true)
];

// Function to add a book to the library
function addBookToLibrary(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('read-status').checked;

    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);

    displayLibrary();
    closeDialog(); // Close the modal after adding a book
}

// Function to remove a book from the library
function removeBook(index) {
    myLibrary.splice(index, 1); // Remove the book at the specified index
    displayLibrary(); // Update the library display
}

// Function to toggle a book's read status
function toggleReadStatus(index) {
    myLibrary[index].toggleReadStatus(); // Use the prototype method to toggle status
    displayLibrary(); // Update the library display
}

// Function to display books in the library
function displayLibrary() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = ''; // Clear previous entries

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> ${book.isRead ? 'Read' : 'Not Read Yet'}</p>
            <button class="toggle-btn" data-index="${index}">Toggle Read Status</button>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        libraryDiv.appendChild(bookCard);
    });

    // Add event listeners to all "Remove" buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = button.getAttribute('data-index');
            removeBook(index); // Remove the book when the button is clicked
        });
    });

    // Add event listeners to all "Toggle Read Status" buttons
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = button.getAttribute('data-index');
            toggleReadStatus(index); // Toggle the read status when the button is clicked
        });
    });
}

// Open and Close Modal Functions
function openDialog() {
    const dialog = document.getElementById('book-dialog');
    dialog.showModal(); // Open the modal dialog
}

function closeDialog() {
    const dialog = document.getElementById('book-dialog');
    dialog.close(); // Close the modal dialog
}

// Event listener for opening the form modal
document.getElementById('new-book-btn').addEventListener('click', openDialog);

// Event listener for form submission
document.getElementById('book-form').addEventListener('submit', addBookToLibrary);

// Event listener for canceling the form
document.getElementById('cancel-btn').addEventListener('click', closeDialog);

// Initial display of the library
displayLibrary();
