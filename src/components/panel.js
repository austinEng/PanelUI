'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');

module.exports = React.createClass({
  displayName: 'exports',

  render: function render() {
    var panelClass = classNames({
      'panel-block': true,
      'panel-block-floating': this.props.floating
    });
    return React.createElement('div', { className: panelClass });
  }
});
