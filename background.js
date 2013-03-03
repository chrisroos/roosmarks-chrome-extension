var showBookmark = function(tab) {
  bookmarkUrl = 'https://roosmarks.herokuapp.com/bookmarks/';
  bookmarkUrl = bookmarkUrl + encodeURIComponent(tab.url);
  var req = new XMLHttpRequest();
  req.onload = function() {
    if (this.status == 200) {
      chrome.browserAction.setBadgeText({text: '1', tabId: tab.id});
    };
  };
  req.open('GET', bookmarkUrl, true);
  req.setRequestHeader('Accept', 'application/json');
  req.send(null);
}

// Detect moving to a different already open tab
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    showBookmark(tab);
  });
});

// Detect loading a new page in a tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    showBookmark(tab);
  };
});