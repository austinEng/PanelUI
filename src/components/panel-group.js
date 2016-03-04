'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Panel = require('../components/panel.js');
var classNames = require('classnames');

var PanelGroup = React.createClass({
  displayName: 'PanelGroup',

  render: function render() {
    var groupClass = classNames({
      'panel-group': true,
      'panel-layout-horizontal': this.props.layout == 'horizontal',
      'panel-layout-vertical': this.props.layout == 'vertical' || !this.props.layout,
      'panel-group-floating': this.props.floating
    });
    return React.createElement(
      'div',
      { className: groupClass },
      this.props.panels.map(function (panel, index) {

        if (panel.panels) {
          return React.createElement(PanelGroup, { panels: panel.panels, layout: panel.layout, floating: panel.floating, key: index });
        } else {
          return React.createElement(Panel, { panel: panel, floating: panel.floating, key: index });
        }
      })
    );
  }
});

module.exports = PanelGroup;
