'use strict'

var React = require('react')
var ReactDOM = require('react-dom')
var classNames = require('classnames')

var PanelSplitter = React.createClass({
  getInitialState: function() {
    return {}
  },

  onDragStart: function(event) {
    event.splitter = this
    this.props.onSplitterDown(event)
  },

  render: function() {
    var classes = classNames({
      'panel-splitter': true,
      'active': this.state.active
    })

    return (
      <div className={classes} onMouseDown={this.onDragStart}></div>
    )
  }
})

module.exports = PanelSplitter