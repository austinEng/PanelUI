'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var PanelGroup = require('../components/panel-group.js');
var Panel = require('../components/panel.js');

// loop over refs
var loopOverChildren = function loopOverChildren(nodeRef, hcb, vcb) {
  for (var childName in nodeRef.refs) {
    var childRef = nodeRef.refs[childName];
    if (!childRef.props.floating) {
      if (nodeRef.props.layout == 'horizontal') {
        hcb(childRef);
      } else if (nodeRef.props.layout == 'vertical') {
        vcb(childRef);
      }
    }
  }
};

// recalculate flexbox basis sizes to preserve current layout
var recalculateSpace = function recalculateSpace(state, parRef) {
  var parDomEl = ReactDOM.findDOMNode(parRef);
  var totalWidth = parDomEl.offsetWidth;
  var totalHeight = parDomEl.offsetHeight;

  var wSum = 0;
  var hSum = 0;
  loopOverChildren(parRef, function (childRef) {
    wSum += childRef.props.width;
  }, function (childRef) {
    hSum += childRef.props.height;
  });

  loopOverChildren(parRef, function (childRef) {
    state.panels[childRef.props.idx].width = totalWidth * (childRef.props.width / wSum);
  }, function (childRef) {
    state.panels[childRef.props.idx].height = totalHeight * (childRef.props.height / hSum);
  });

  return state;
};

var PanelWindow = React.createClass({
  displayName: 'PanelWindow',

  getInitialState: function getInitialState() {
    return this.props.layout;
  },

  componentDidMount: function componentDidMount() {
    var me = ReactDOM.findDOMNode(this);
    var totalWidth = me.offsetWidth;
    var totalHeight = me.offsetHeight;

    var state = this.state;
    var process = function process(nodeRef, w, h) {
      state.panels[nodeRef.props.idx].width = w;
      state.panels[nodeRef.props.idx].height = h;

      var wCount = 0;
      var hCount = 0;
      loopOverChildren(nodeRef, function (childRef) {
        if (childRef.props.width) {
          w -= childRef.props.width;
        } else {
          wCount += 1;
        }
      }, function (childRef) {
        if (childRef.props.height) {
          h -= childRef.props.height;
        } else {
          hCount += 1;
        }
      });
      loopOverChildren(nodeRef, function (childRef) {
        if (!childRef.props.width) {
          var width = w / wCount;
          if (width < 0) {
            width = 0;
          }
          state.panels[childRef.props.idx].width = width;
          state.panels[childRef.props.idx].height = h;
          process(childRef, width, h);
        }
      }, function (childRef) {
        if (!childRef.props.height) {
          var height = h / hCount;
          if (height < 0) {
            height = 0;
          }
          state.panels[childRef.props.idx].width = w;
          state.panels[childRef.props.idx].height = height;
          process(childRef, w, height);
        }
      });
    };
    process(this.refs.root, totalWidth, totalHeight);
    this.setState(state);
  },

  getPanel: function getPanel(idx) {
    return this.state.panels[idx];
  },

  handleSplitterDown: function handleSplitterDown(event) {
    var par = event.splitter.props.par;
    var fpanel = par.refs[event.splitter.props.fIdx];
    var spanel = par.refs[event.splitter.props.sIdx];
    var state = recalculateSpace(this.state, par);

    event.splitter.setState({
      active: true
    });
    this.setState({
      activeSplitter: event.splitter,
      panels: state.panels
    });

    //window.addEventListener('mousemove', this.handleSplitterDrag)
    //window.addEventListener('mouseup', this.clearSplitter)
  },

  clearSplitter: function clearSplitter() {
    this.state.activeSplitter.setState({
      active: false
    });
    this.setState({
      activeSplitter: null
    });

    //window.removeEventListener('mousemove', this.handleSplitterDrag)
    //window.removeEventListener('mouseup', this.clearSplitter)
  },

  handleSplitterDrag: function handleSplitterDrag(event) {
    var parent = this.state.activeSplitter.props.par;
    var fNode = parent.refs[this.state.activeSplitter.props.fIdx];
    var sNode = parent.refs[this.state.activeSplitter.props.sIdx];
    var fDOMEl = ReactDOM.findDOMNode(fNode);
    var sDOMEl = ReactDOM.findDOMNode(sNode);
    var fRect = fDOMEl.getBoundingClientRect();
    var sRect = sDOMEl.getBoundingClientRect();
    var mPos = { x: event.clientX, y: event.clientY };
    var state = this.state;
    if (parent.props.layout == 'horizontal') {
      state.panels[fNode.props.idx].width = mPos.x - fRect.left;
      state.panels[sNode.props.idx].width = sRect.right - mPos.x;
      this.setState(state);
    } else if (parent.props.layout == 'vertical') {
      state.panels[fNode.props.idx].height = mPos.y - fRect.top;
      state.panels[sNode.props.idx].height = sRect.bottom - mPos.y;
      this.setState(state);
    }
  },

  render: function render() {
    var current = this.state.panels[this.state.root];
    if (!this.state.activeSplitter) {
      return React.createElement(
        'div',
        { className: 'panel-window' },
        React.createElement(PanelGroup, {
          ref: 'root',
          idx: this.state.root,
          width: current.width,
          height: current.height,
          layout: current.layout,
          onSplitterDown: this.handleSplitterDown,
          getPanel: this.getPanel })
      );
    } else {
      return React.createElement(
        'div',
        { className: 'panel-window', onMouseMove: this.handleSplitterDrag, onMouseUp: this.clearSplitter },
        React.createElement(PanelGroup, {
          ref: 'root',
          idx: this.state.root,
          width: current.width,
          height: current.height,
          layout: current.layout,
          onSplitterDown: this.handleSplitterDown,
          getPanel: this.getPanel,
          id: current.id })
      );
    }
  }
});

module.exports = PanelWindow;
