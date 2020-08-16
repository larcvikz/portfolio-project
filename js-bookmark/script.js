const modal = document.querySelector('#modal');
const modalShow = document.querySelector('#show-modal');
const modalClose = document.querySelector('#close-modal');
const bookmarkForm = document.querySelector('#bookmark-form');
const websiteNameEl = document.querySelector('#website-name');
const websiteUrlEl = document.querySelector('#website-url');
const bookmarksContainer = document.querySelector('#bookmarks-container');

// Global variable
let bookmarks = [];

// Show modal
function showModal(){
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}

modalShow.addEventListener('click', showModal);
// Close modal with clicking X logo
modalClose.addEventListener('click', function(){
    modal.classList.remove('show-modal');
});
// Close modal with clicking outside modal box
window.addEventListener('click', function(event){
    if(event.target === modal ? modal.classList.remove('show-modal') : false);
});

// Validate Form
function validate(websiteNameValue, websiteUrlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if(!websiteNameValue || !websiteUrlValue){
        //if website name value == empty or website url value == empty
        alert('Please submit values for both fields.');
        return false;
    }
    if(!websiteUrlValue.match(regex)){
        alert('Please provide a valid web address.');
        return false;
    }
    // if all condition match set value to true
    return true;
}

// Fetch data from localStorage
function fetchBookmarks(){
    // Check bookmarks data from localStorage if available or not empty
    if(localStorage.getItem('bookmarks')){
        // Get the bookmarks array from localStorage with object format
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        // Create default bookmarks array in localStorage if empty
        bookmarks = [
            {
                name: 'LarcVikz',
                url: 'https://larcvikz.github.io/portfolio-project/',
            },
        ];
        // Save back the bookmarks array with object format into the localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}

// Handle data form
function storeBookmark(event){
    event.preventDefault();
    const websiteNameValue = websiteNameEl.value;
    let websiteUrlValue = websiteUrlEl.value;
    // Adding https:// for correct path if there is none
    if(!websiteUrlValue.includes('http://', 'https://')){
        websiteUrlValue = `https://${websiteUrlValue}`;
    }
    if(!validate(websiteNameValue, websiteUrlValue)){
        // check if the both website name value and website url value are true, if it doesn't set the value to false and code above will not continue or run;
        return false;
    }
    const bookmark = {
        name : websiteNameValue,
        url : websiteUrlValue,
    };
    // Put the collection of data to the bookmarks object
    bookmarks.push(bookmark);
    // Save the bookmarks object to the localStorage with array format
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // Check the localStorage data
    fetchBookmarks();
    // Reset all the input after click submit button
    bookmarkForm.reset();
    // Make the website name input element to focus
    websiteNameEl.focus();
}

bookmarkForm.addEventListener('submit', storeBookmark);

// On load fetch bookmarks
fetchBookmarks();