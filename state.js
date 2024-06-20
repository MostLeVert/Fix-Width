const widthSelector = document.getElementById("width-selector")
const rememberToggle = document.getElementById("remember-toggle")

window.addEventListener("DOMContentLoaded", function () {
  const lsWidth = this.localStorage.getItem("width")
  const lsRemember = this.localStorage.getItem("remember")

  if (lsWidth) {
    widthSelector.value = lsWidth
  }

  if (lsRemember) {
    rememberToggle.value = lsRemember
    if (lsRemember === "true") {
      rememberToggle.checked = true
    }
  }

  widthSelector.addEventListener("input", handleWidthChange)

  function handleWidthChange(e) {
    const newValue = e.target.value
    localStorage.setItem("width", newValue)
  }

  rememberToggle.addEventListener("input", handleRememberChange)

  function handleRememberChange(e) {
    const oldValue = e.target.value
    const newValue = oldValue === "true" ? "false" : "true"
    e.target.value = newValue
    console.log(newValue)
    localStorage.setItem("remember", newValue)
  }
})
