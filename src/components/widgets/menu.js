// menu.js

import DOM from "../../utils/DOM"

export default function (widgets, config) {
  
  const elMenu = widgets.elements.elMenu

  elMenu.innerHTML = config.content
  elMenu.style.top = `${config.pos[1]}px`
  elMenu.style.left = `${config.pos[0]}px`
  elMenu.style.display = "block"

  setTimeout(() => DOM.hideOnClickOutside(elMenu), 1000)
}
