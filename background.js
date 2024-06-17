let isRecording = false;
let recordedDataList = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Obtined message: ", message);
  if (message.action === "startStopRecord") {
    if (isRecording) {
      isRecording = false;
      console.log("Recording stopped...");
      sendResponse({ recorder: { status: "stopped" } });
    } else {
      isRecording = true;
      console.log("Recording started...");
      sendResponse({ recorder: { status: "started" } });
    }
  } else if (message.action === "getRecordedData") {
    sendResponse(recordedDataList);
  } else {
    console.log("Unhandled action ...");
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (isRecording) {
      let requestBody = "";
      if (details.requestBody) {
        if (details.requestBody.formData) {
          requestBody = JSON.stringify(details.requestBody.formData);
        } else if (details.requestBody.raw) {
          requestBody = new TextDecoder().decode(new Uint8Array(details.requestBody.raw[0].bytes));
        }
      }
      recordedDataList.push({
        url: details.url,
        method: details.method,
        body: requestBody,
      });
      console.log("Recorded Request:", {
        url: details.url,
        method: details.method,
        body: requestBody,
      });
    }
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);
