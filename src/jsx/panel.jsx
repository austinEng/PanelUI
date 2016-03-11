'use strict'

var React = require('react')
var ReactDOM = require('react-dom')
var classNames = require('classnames')

var Panel = React.createClass({
  render: function() {
    var panel = this.props.getPanel(this.props.idx)
    var panelClass = classNames({
      'panel-block': true,
      'panel-block-floating': panel.floating
    })

    var style = {}
    if ('parIdx' in this.props) {
      var parent = this.props.getPanel(this.props.parIdx)
      if (parent.layout == 'horizontal') {
        style.flexBasis = this.props.width
      }
      if (parent.layout == 'vertical') {
        style.flexBasis = this.props.height
      }
    }

    return (
      <div className={panelClass} style={style}>
        <div className='panel-content' id={this.props.id}>{this.props.children}</div>
      </div>
    )
  }
})

module.exports = Panel