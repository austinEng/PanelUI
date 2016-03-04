'use strict'

var React = require('react')
var ReactDOM = require('react-dom')
var classNames = require('classnames')

module.exports = React.createClass({
  render: function() {
    var panelClass = classNames({
      'panel-block': true,
      'panel-block-floating': this.props.floating
    })
    return (
      <div className={panelClass}></div>
    );
  }
})