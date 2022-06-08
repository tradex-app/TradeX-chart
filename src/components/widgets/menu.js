// menu.js

export default function (widgets, config) {
  
  const elMenu = widgets.elements.elMenu

  elMenu.innerHTML = config.content
  elMenu.style.top = "-100px"
  elMenu.style.left = 0
  elMenu.style.display = "block"
}