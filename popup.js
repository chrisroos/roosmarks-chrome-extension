var showBookmark = function(url) {
  var roosmarksServer = localStorage['roosmarksServer'];
  var bookmarkUrl = roosmarksServer + '/bookmarks/' + encodeURIComponent(url);
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