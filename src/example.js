'use strict'

var PanelUI = require('./panelui.js')

var layout = {
  root: 0,
  panels: [
    // 0: wrapper element
    {
      floating: false,
      layout: 'horizontal',
      subpanels: [1, 2]
    },
    // 1: sidebar
    {
      floating: false,
      subpanels: [],
      width: 350,
      id: 'sidebar'
    },
    // 2: right section
    {
      floating: false,
      layout: 'vertical',
      subpanels: [3, 4]
    },
    // 3: upper (main) section
    {
      floating: false,
      subpanels: [],
      id: 'main'
    },
    // 4: bottom bar
    {
      floating: false,
      subpanels: [],
      height: 100,
      id: 'bottom-bar'
    }
  ]
}

PanelUI.create('container', layout)

document.getElementById('sidebar').appendChild(document.getElementById('sidebar-content'))
document.getElementById('main').appendChild(document.getElementById('main-content'))
document.getElementById('bottom-bar').appendChild(document.getElementById('bottom-bar-content'))