'use strict';

var Modeler = require('bpmn-js/lib/Modeler');

var assign = require('lodash/object/assign'),
    isArray = require('lodash/lang/isArray');

var inherits = require('inherits');

function JSR352Modeler(options) {
  Modeler.call(this, options);

  this._customElements = [];
}

inherits(JSR352Modeler, Modeler);

JSR352Modeler.prototype._modules = [].concat(
  JSR352Modeler.prototype._modules,
  [
    require('./jsr352')
  ]
);

/**
 * Add a single custom element to the underlying diagram
 *
 * @param {Object} customElement
 */
JSR352Modeler.prototype._addCustomShape = function(element) {

  this._customElements.push(element);

  var canvas = this.get('canvas'),
      elementFactory = this.get('elementFactory');

  var customAttrs = assign({ businessObject: element }, element);

  var customShape = elementFactory.create('shape', customAttrs);
  return canvas.addShape(customShape);

};

JSR352Modeler.prototype._addCustomConnection = function(customElement) {

  this._customElements.push(customElement);

  var canvas = this.get('canvas'),
      elementFactory = this.get('elementFactory'),
      elementRegistry = this.get('elementRegistry');

  var customAttrs = assign({ businessObject: customElement }, customElement);

  var connection = elementFactory.create('connection', assign(customAttrs, {
    source: elementRegistry.get(customElement.source),
    target: elementRegistry.get(customElement.target)
  }),
  elementRegistry.get(customElement.source).parent);

  return canvas.addConnection(connection);

};

/**
 * Add a number of custom elements and connections to the underlying diagram.
 *
 * @param {Array<Object>} customElements
 */
JSR352Modeler.prototype.addCustomElements = function(customElements) {

  if (!isArray(customElements)) {
    throw new Error('argument must be an array');
  }

  var shapes = [],
      connections = [];

  customElements.forEach(function(customElement) {
    if (isJSR352Connection(customElement)) {
      connections.push(customElement);
    } else {
      shapes.push(customElement);
    }
  });

  // add shapes before connections so that connections
  // can already rely on the shapes being part of the diagram
  shapes.forEach(this._addCustomShape, this);

  connections.forEach(this._addCustomConnection, this);
};

/**
 * Get custom elements with their current status.
 *
 * @return {Array<Object>} custom elements on the diagram
 */
JSR352Modeler.prototype.getCustomElements = function() {
  return this._customElements;
};

module.exports = JSR352Modeler;

function isJSR352Connection(element) {
   return element.type === 'jsr352:Transition';
}
