// TODO
// * Change the colour of the icon if I've already bookmarked the page, i.e. make
//   the http request for each page view, not just when the button is clicked.
//     -- I've made a fairly trivial improvement here by setting the badge, but it can
//        definitely be improved.
// * Custom icon for the toolbar
// * Can I avoid the 404 warnings in the background.js console if a bookmark doesn't
//   exist for the given URL?
// * Display the new bookmark form if the request to roosmarks returns a 404

var showBookmark = function(url) {
  bookmarkUrl = 'https://roosmarks.herokuapp.com/bookmarks/';
  bookmarkUrl = bookmarkUrl + encodeURIComponent(url);
  var req = new XMLHttpRequest();
  req.onload = function() {
    var bookmarkContainer = document.createElement('div');
    if (this.status == 200) {
      var bookmark = JSON.parse(this.responseText);
      var comments = document.createElement('p');
      comments.appendChild(document.createTextNode(bookmark.comments));
      bookmarkContainer.appendChild(comments);
    } else {
      var error = document.createElement('p');
      error.appendChild(document.createTextNode("Bookmark doesn't exist"));
      bookmarkContainer.appendChild(error);
    };
    document.body.appendChild(bookmarkContainer);
  };
  req.open('GET', bookmarkUrl, true);
  req.setRequestHeader('Accept', 'application/json');
  req.send(null);
}

chrome.tabs.query({active: true, windowId: chrome.windows.WINDOW_ID_CURRENT}, function(arrayOfTabs) {
  var tab = arrayOfTabs[0];
  showBookmark(tab.url);
});