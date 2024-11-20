export function dropDown(selector, options, fn) {
  const target = document.querySelector(selector)
  if (!target) return

  const select = document.createElement("select", )
  let opts = ""
  for (let [key, value] of Object.entries(options)) {
    opts += `<option value="${value}">${key}</option>\n`
  }
  select.innerHTML = opts
  select.addEventListener("change", (e) => {
    fn(e)
  })
  target?.appendChild(select)
}
