var toggleClass = function(el, className) {
  if (el.classList) {
  el.classList.toggle(className);
} else {
  var classes = el.className.split(' ');
  var existingIndex = classes.indexOf(className);

  if (existingIndex >= 0)
    classes.splice(existingIndex, 1);
  else
    classes.push(className);

  el.className = classes.join(' ');
}
};


var nodeListToArray = function(nl) {
  for(var a=[], l=nl.length; l--; a[l]=nl[l]);
  return a;
};

var outerHeight = function(el) {
  var height = el.offsetHeight;
  var style = getComputedStyle(el);

  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
};

var outerWidth = function(el) {
  var width = el.offsetWidth;
  var style = getComputedStyle(el);

  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
  return width;
};

window.DOM = {
  toggleClass: toggleClass,
  nodeListToArray: nodeListToArray,
  outerHeight: outerHeight,
  outerWidth: outerWidth
}
