/**
 * Content block which can collaps and expand
 * @param {Object} options
 * @returns CollapsibleContentBlocks
 */
var CollapsibleContentBlocks = function(options) {
    var self = this;
    var elementsVisible = 3 || options.elementsVisible;
    this.options = _.extend({
        elementsVisible: elementsVisible,
        afterNElementSelector: '.detail-col:not(:nth-child(-n+' + elementsVisible + '))',
        collapsibleButtonSelector: '.collapsible-button',
        collapsedClassName: 'collapsed'
    }, options);
    this.lastMaxHeight = DOM.outerHeight(this.getOuterHeighestNode());
    this.collapsibleButton = document.querySelector(this.options.collapsibleButtonSelector);
    this.collapsibleButton.addEventListener('click', this.collapsibleClickHandler.bind(this));
    /**
     * When resizing just caculate the height as a percentage
     * but when stop resizing set the height back into a px value
     * @param
     * @returns
     */
    var resizeTimer;
    window.addEventListener('resize', function() {
        if (!self.isCollapsed()) {
            var lastMaxHeight = DOM.outerHeight(self.getOuterHeighestNode());
            self.getOuterHeighestNode().style.maxHeight = (
                DOM.outerHeight(self.getOuterHeighestNode()) / DOM.outerHeight(document.body)
            ) * 100 + '%';
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                self.getOuterHeighestNode().style.maxHeight = lastMaxHeight + 'px';
            }, 10);
        }
    });

    // set the button and the blocks as collapsed state
    this.setCollapsed();

} || {};

CollapsibleContentBlocks.prototype.isCollapsed = function() {
    var self = this;
    return document.querySelector(self.options.afterNElementSelector)
        .classList.contains(self.options.collapsedClassName);
};

CollapsibleContentBlocks.prototype.collapsibleClickHandler = function(event) {
    var self = this;
    DOM.toggleClass(self.collapsibleButton, self.options.collapsedClassName);
    DOM.nodeListToArray(
        document.querySelectorAll(self.options.afterNElementSelector)
    ).forEach(function(node) {
        if (node.classList.contains('collapsed')) {
            node.style.maxHeight = self.lastMaxHeight + 'px';
            node.style.visibility = 'visible';
            node.classList.remove(self.options.collapsedClassName);
        } else {
            self.lastMaxHeight = DOM.outerHeight(self.getOuterHeighestNode());
            node.classList.add(self.options.collapsedClassName);
            node.removeAttribute('style');
        }
    });
};

CollapsibleContentBlocks.prototype.setCollapsed = function() {
    var self = this;
    DOM.nodeListToArray(
        document.querySelectorAll(self.options.afterNElementSelector)
    ).forEach(function(node) {
        node.classList.add(self.options.collapsedClassName);
    });
    this.collapsibleButton.classList.add(this.options.collapsedClassName);
};

/**
 * Get the node with the highest outerHeight
 */
CollapsibleContentBlocks.prototype.getOuterHeighestNode = function() {
    var self = this;
    return DOM.nodeListToArray(
        document.querySelectorAll(self.options.afterNElementSelector)
    ).sort(function(nodeA, nodeB) {
        return DOM.outerHeight(nodeB) - DOM.outerHeight(nodeA);
    })[0];
};
