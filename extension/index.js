// check if dom already contains root
if (document.getElementById('rr-root') === null) {
  // make a reference to the body
  // the page will not refresh, so make reference on first load
  var body = document.getElementsByTagName('body');

  // add the node to the DOM
  let newNode = document.createElement('div');
  newNode.setAttribute("id", "rr-root");
  document.body.append(newNode);
}

// Make the page not scroll when the extension is active
body[0].style.height = '100vh';
body[0].style.overflow = 'hidden';
