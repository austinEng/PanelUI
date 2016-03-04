'use strict'

var React = require('react')
var ReactDOM = require('react-dom')
var PanelGroup = require('../components/panel-group.js')
var Panel = require('../components/panel.js')

module.exports = React.createClass({
  getInitialState: function() {
    return this.props.layout;
  },

  render: function() {
    return (
      <div className='panel-window'>
        <PanelGroup panels={this.state.panels} layout={this.state.layout} floating={false} />
      </div>
    )
  }
})