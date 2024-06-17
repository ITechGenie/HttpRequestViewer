document.addEventListener("DOMContentLoaded", () => {
  chrome.runtime.sendMessage({ action: "getRecordedData" }, (response) => {
    const tableBody = document.getElementById("recorded-data-body");
    response.forEach((record) => {
      const row = document.createElement("tr");
      const urlCell = document.createElement("td");
      const methodCell = document.createElement("td");
      const bodyCell = document.createElement("td");

      urlCell.textContent = record.url;
      methodCell.textContent = record.method;
      bodyCell.textContent = record.body;

      row.appendChild(methodCell);
      row.appendChild(urlCell);
      row.appendChild(bodyCell);
      tableBody.appendChild(row);
    });
  });
});
