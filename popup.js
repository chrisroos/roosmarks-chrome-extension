// TODO
// * Don't display the popup if the request to roosmarks returns a 404
// * Change the colour of the icon if I've already bookmarked the page, i.e. make
//   the http request for each page view, not just when the button is clicked.
//     -- I've made a fairly trivial improvement here by setting the badge, but it can
//        definitely be improved.
// * Custom icon for the toolbar
// * Can I avoid the 404 warnings in the background.js console if a bookmark doesn't
//   exist for the given URL?

var showBookmark = function(url) {
  bookmarkUrl = 'https://roosmarks.herokuapp.com/bookmarks/';
  bookmarkUrl = bookmarkUrl + encodeURIComponent(url);
  var req = new XMLHttpRequest();
  req.onload = function() {
    if (this.status == 200) {
      var bookmark = this.responseText;
      var p = document.createElement('p');
      p.appendChild(document.createTextNode(bookmark));
      document.body.appendChild(p);
    } else {
      var p = document.createElement('p');
      p.appendChild(document.createTextNode("Bookmark doesn't exist"));
      document.body.appendChild(p);
    };
  };
  req.open('GET', bookmarkUrl, true);
  req.setRequestHeader('Accept', 'application/json');
  req.send(null);
}

chrome.tabs.query({active: true, windowId: chrome.windows.WINDOW_ID_CURRENT}, function(arrayOfTabs) {
  var tab = arrayOfTabs[0];
  showBookmark(tab.url);
});