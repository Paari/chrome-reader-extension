let changeColor = document.getElementById('changeColor');

// options to remember settings
chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
})

chrome.tabs.executeScript({
  file: 'index.js'
});

chrome.tabs.insertCSS({
  file: 'main.css'
});

// change color on click
changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {file: 'main.js'},
    );
  })
};