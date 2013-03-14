function saveOptions() {
  var roosmarksServer = document.getElementById('roosmarksServer');
  localStorage['roosmarksServer'] = roosmarksServer.value;
}

function restoreOptions() {
  var roosmarksServer = localStorage["roosmarksServer"];
  var roosmarksServerInput = document.getElementById('roosmarksServer');
  roosmarksServerInput.value = roosmarksServer;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#save').addEventListener('click', saveOptions);