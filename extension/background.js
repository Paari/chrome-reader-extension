chrome.browserAction.onClicked.addListener(function(tabs) {
  // Add the reader container to the DOM
  chrome.tabs.executeScript({
    file: 'index.js'
  });

  // Inject styles
  chrome.tabs.insertCSS({
    file: 'main.css'
  });

  // Inject reader script
  chrome.tabs.executeScript(
    {file: 'main.js'},
  );
})
