'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var PanelGroup = require('../components/panel-group.js');
var Panel = require('../components/panel.js');

module.exports = React.createClass({
  displayName: 'exports',

  getInitialState: function getInitialState() {
    return this.props.layout;
  },

  render: function render() {
    return React.createElement(
      'div',
      { className: 'panel-window' },
      React.createElement(PanelGroup, { panels: this.state.panels, layout: this.state.layout, floating: false })
    );
  }
});
