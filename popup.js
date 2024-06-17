document.getElementById("startStopRecord").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "startStopRecord" });
});

document.getElementById("history").addEventListener("click", () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("/history.html") });
});
