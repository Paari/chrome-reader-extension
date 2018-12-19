// check if dom already contains root
if (document.getElementById('rr-root') === null) {
  // add the node to the DOM
  let newNode = document.createElement('div');
  newNode.setAttribute("id", "rr-root");
  document.body.append(newNode);
}
