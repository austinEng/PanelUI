'use strict'

var React = require('react')
var ReactDOM = require('react-dom')
var Panel = require('./components/panel.js')
var PanelGroup = require('./components/panel-group.js')
var PanelWindow = require('./components/panel-window.js')

window.createPanelWindow = function(id, layout) {
  ReactDOM.render(React.createElement(PanelWindow, { layout: layout }), document.getElementById(id));
}