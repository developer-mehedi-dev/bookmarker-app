// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark)

// Save Bookmark
function saveBookmark(e) {
    // Prevent form submiting
    e.preventDefault()

    // Get form values
    var siteName = document.getElementById('siteName').value
    var siteURL = document.getElementById('siteURL').value

    if(!validateForm(siteName, siteURL)){
        return false
    }

    // Bookmark object
    var bookmark = {
        name: siteName,
        url: siteURL
    }

    // Store in Localstorage
    if (localStorage.getItem('bookmarks') === null) {
        // Init Array
        var bookmarks = []
        // Add to Array
        bookmarks.push(bookmark)
        // Set to Localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    } else {
        // Get bookmars from localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        // Add bookmark to array
        bookmarks.push(bookmark)
        // Reset to Localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }

    document.getElementById('myForm').reset()
    
    // Re-fetch bookmarks
    fetchBookmarks()
}

// Delete bookmark
function deleteBookmark(url){
    // Get bookmars from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

    // Loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url === url){
            // Remove from array
            bookmarks.splice(i, 1)
        }
    }
    // Reset to Localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    // Re-fetch bookmarks
    fetchBookmarks()
}

// Fetch bookmarks
function fetchBookmarks() {
    // Get bookmars from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

    // Get output ID
    var bookmarksResult = document.getElementById('bookmarks-result')

    // Show ouuput
    bookmarksResult.innerHTML = ''
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name
        var url = bookmarks[i].url

        bookmarksResult.innerHTML += '<div class="card card-body bg-light">'+
                                    '<h3>'+name+
                                    ' <a class="btn btn-secondary ml-3" target="_blank" href="'+addhttp(url)+'">Visit</a> '+
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
                                    '</h3>'+
                                    '</div>'
    }
}

// Validate form
function validateForm(siteName, siteURL){
    if(!siteName || !siteURL){
        alert('Please fill in the form')
        return false
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('Please use a valid URL')
        return false
    }

    return true

}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}   