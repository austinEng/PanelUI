'use strict'

var React = require('react')
var ReactDOM = require('react-dom')
var PanelWindow = require('./src/components/panel-window.js')

var PanelUI = {
  create: function(id, layout) {
    ReactDOM.render(React.createElement(PanelWindow, { layout: layout }), document.getElementById(id));   
  }
}

module.exports = PanelUI