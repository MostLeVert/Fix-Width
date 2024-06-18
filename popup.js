async function triggerContentFunction() {
  const tab = await getCurrentTab()
  if (!tab) {
    return
  }
  try {
    await chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      css: `html{display:flex;justify-content:center}
        body{max-width:1000px;margin:auto;}`,
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

document.getElementById("fix-width-btn").addEventListener("click", async () => {
  await triggerContentFunction()
})
