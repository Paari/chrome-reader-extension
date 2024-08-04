/*global chrome*/

chrome.action.onClicked.addListener(function(tab) {
  // Add the reader container to the DOM
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['index.js']
  });

  // Inject styles
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ['main.css']
  });

  // Inject reader script
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['main.js']
  });
});