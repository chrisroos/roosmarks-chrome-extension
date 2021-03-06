var roosmarksServer = localStorage['roosmarksServer'];

var roosmarksUrlFor = function(url) {
  return roosmarksServer + '/bookmarks/' + encodeURIComponent(url);
}

chrome.browserAction.setTitle({title: "Roosmarks (" + roosmarksServer + ")"});

var showBookmark = function(tab) {
  var req = new XMLHttpRequest();
  req.onload = function() {
    if (this.status == 200) {
      chrome.browserAction.setIcon({"path": "images/icon19-yellow.png", tabId: tab.id})
    };
  };
  req.open('GET', roosmarksUrlFor(tab.url), true);
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