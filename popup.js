window.addEventListener("DOMContentLoaded", function () {
  const fixWidthBtn = document.getElementById("fix-width-btn")
  fixWidthBtn.addEventListener("click", async () => {
    await triggerContentFunction()
  })
})

async function triggerContentFunction() {
  const tab = await getCurrentTab()

  if (!tab) {
    console.error("TAB NOT FOUND")
    return
  }


  try {
    let sizePreference = this.localStorage.getItem("width")
    console.log(sizePreference)
    let sizePreferenceMap = 100
    switch (sizePreference) {
      case "small":
        sizePreferenceMap = 500
        break
      case "medium":
        sizePreferenceMap = 1000
        break
      case "large":
        sizePreferenceMap = 1500
        break
      default:
        sizePreferenceMap = 50
        break
    }

    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      css: `html{display:flex;justify-content:center}
        body{max-width:${sizePreferenceMap}px;margin:auto;}`,
    })
  } catch (error) {
    console.error("Error inserting CSS:", error)
  }
}

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  return tab
}
