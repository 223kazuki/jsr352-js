'use strict';

var reduce = require('lodash/collection/reduce'),
    every = require('lodash/collection/every'),
    inherits = require('inherits');

var is = require('bpmn-js/lib/util/ModelUtil').is,
    isAny = require('bpmn-js/lib/features/modeling/util/ModelingUtil').isAny;

var BpmnRules = require('bpmn-js/lib/features/rules/BpmnRules');

var HIGH_PRIORITY = 1500;


function isJSR352(element) {
  return element && new RegExp('^jsr352:').test(element.type);
}

/**
 * Specific rules for custom elements
 */
function JSR352Rules(eventBus) {
  BpmnRules.call(this, eventBus);
}

inherits(JSR352Rules, BpmnRules);

JSR352Rules.$inject = [ 'eventBus' ];

module.exports = JSR352Rules;

/**
 * Can source and target be connected?
 */
function canConnect(source, target) {

  // only judge about custom elements
  if (!isJSR352(source) && !isJSR352(target)) {
    return {};
  }

  // allow connection between custom shape and task
  if (isJSR352(source)) {
    if (isAny(target, ['jsr352:BatchComponent', 'jsr352:End', 'jsr352:Fail', 'jsr352:Stop'])) {
      return {type: 'jsr352:Transition'};
    } else {
      return false;
    }
  } else if (isJSR352(target)) {
    if (isAny(source, ['jsr352:BatchComponent', 'jsr352:Start'])) {
      return {type: 'jsr352:Transition'};
    } else {
      return false;
    }
  }
};

function hasNoChildren(element, self) {
  return every(element.children, function(child) {
    return child == self || !isAny(child, ['jsr352:Batchlet', 'jsr352:Chunk']);
  });
}

JSR352Rules.prototype.init = function() {

  /**
   * Can shape be created on target container?
   */
  function canCreate(shape, target) {
    // only judge about custom elements
    if (!isJSR352(shape) || !target) {
      return;
    }

    if (isAny(shape, ['jsr352:Step'])) {
      return isAny(target, ['jsr352:Flow', 'jsr352:Job']);
    } else if (is(shape, 'jsr352:Listener')) {
      return isAny(target, ['jsr352:Step']);
    } else if (is(shape, 'jsr352:Flow')) {
      return isAny(target, ['jsr352:Split', 'jsr352:Job']);
    } else if (isAny(shape, ['jsr352:Batchlet', 'jsr352:Chunk'])) {
      return isAny(target, ['jsr352:Step']) && hasNoChildren(target, shape);
    } else if (isAny(shape, ['jsr352:Reader', 'jsr352:Processor', 'jsr352:Writer'])) {
      return isAny(target, ['jsr352:Chunk']);
    } else {
      return isAny(target, ['jsr352:Job']);
    }
  }

  this.addRule('elements.move', HIGH_PRIORITY, function(context) {

    var target = context.target,
        shapes = context.shapes;

    var type;

    // do not allow mixed movements of custom / BPMN shapes
    // if any shape cannot be moved, the group cannot be moved, too
    var allowed = reduce(shapes, function(result, s) {
      if (type === undefined) {
        type = isJSR352(s);
      }

      if (type !== isJSR352(s) || result === false) {
        return false;
      }

      return canCreate(s, target);
    }, undefined);

    // reject, if we have at least one
    // custom element that cannot be moved
    return allowed;
  });

  this.addRule('shape.create', HIGH_PRIORITY, function(context) {
    var target = context.target,
        shape = context.shape;

    return canCreate(shape, target);
  });

  this.addRule('shape.resize', HIGH_PRIORITY, function(context) {
    var shape = context.shape;

    if (isJSR352(shape) && !isAny(shape, ['jsr352:Flow', 'jsr352:Split', 'jsr352:Step'])) {
      // cannot resize custom elements
      return false;
    }
  });

  this.addRule('connection.create', HIGH_PRIORITY, function(context) {
    var source = context.source,
        target = context.target;

    return canConnect(source, target);
  });

  this.addRule('connection.reconnectStart', HIGH_PRIORITY, function(context) {
    var connection = context.connection,
        source = context.hover || context.source,
        target = connection.target;

    return canConnect(source, target, connection);
  });

  this.addRule('connection.reconnectEnd', HIGH_PRIORITY, function(context) {
    var connection = context.connection,
        source = connection.source,
        target = context.hover || context.target;

    return canConnect(source, target, connection);
  });

};

JSR352Rules.prototype.canConnect = canConnect;
