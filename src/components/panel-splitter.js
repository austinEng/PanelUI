'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

var PanelSplitter = React.createClass({
  displayName: 'PanelSplitter',

  getInitialState: function getInitialState() {
    return {};
  },

  onDragStart: function onDragStart(event) {
    event.splitter = this;
    this.props.onSplitterDown(event);
  },

  render: function render() {
    var classes = classNames({
      'panel-splitter': true,
      'active': this.state.active
    });

    return React.createElement('div', { className: classes, onMouseDown: this.onDragStart });
  }
});

module.exports = PanelSplitter;
