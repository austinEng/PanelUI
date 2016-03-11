'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Panel = require('../components/panel.js');
var PanelSplitter = require('../components/panel-splitter.js');
var classNames = require('classnames');

var PanelGroup = React.createClass({
  displayName: 'PanelGroup',


  render: function render() {

    var panel = this.props.getPanel(this.props.idx);

    var groupClass = classNames({
      'panel-group': true,
      'panel-layout-horizontal': panel.layout == 'horizontal',
      'panel-layout-vertical': panel.layout == 'vertical',
      'panel-group-floating': panel.floating
    });

    var style = {};
    if ('parIdx' in this.props) {
      var parent = this.props.getPanel(this.props.parIdx);
      if (parent.layout == 'horizontal') {
        style.flexBasis = this.props.width;
      }
      if (parent.layout == 'vertical') {
        style.flexBasis = this.props.height;
      }
    }

    var parIdx = this.props.idx; // child panels' parent is this one
    var items = panel.subpanels;
    var newarr = [];
    for (var i = 0; i < items.length; i++) {
      newarr.push(items[i]);
      if (i != items.length - 1) {
        newarr.push(-1 * i - 1);
      }
    }
    var splitterDownCB = this.props.onSplitterDown;
    var that = this;
    return React.createElement(
      'div',
      { className: groupClass, style: style, id: this.props.id },
      newarr.map(function (panelIdx, index) {
        var panel = that.props.getPanel(panelIdx);
        if (panelIdx < 0) {
          var itemIdx = -(panelIdx + 1);

          return React.createElement(
            'div',
            { className: 'panel-splitter-pos' },
            React.createElement(PanelSplitter, { key: index, fIdx: 'panel' + items[itemIdx], sIdx: 'panel' + items[itemIdx + 1], par: that, onSplitterDown: splitterDownCB })
          );
        } else {
          if (panel.subpanels && panel.subpanels.length > 0) {
            return React.createElement(PanelGroup, {
              ref: 'panel' + panelIdx,
              idx: panelIdx,
              parIdx: parIdx,
              width: panel.width,
              height: panel.height,
              layout: panel.layout,
              key: index,
              onSplitterDown: splitterDownCB,
              getPanel: that.props.getPanel,
              id: panel.id });
          } else {
            return React.createElement(Panel, {
              ref: 'panel' + panelIdx,
              idx: panelIdx,
              parIdx: parIdx,
              width: panel.width,
              height: panel.height,
              key: index,
              getPanel: that.props.getPanel,
              id: panel.id });
          }
        }
      })
    );
  }
});

module.exports = PanelGroup;
