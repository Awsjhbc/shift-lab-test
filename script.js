import "./style.css";

document.addEventListener("DOMContentLoaded", function () {
  let highlightedColumns = {};

  function handleSearch() {
    const searchTerm = document.getElementById("searchInput").value.trim();

    if (searchTerm === "") {
      highlightedColumns = {};
      updateTable();
      updateResultInfo(0);
      return;
    }

    const regex = new RegExp(searchTerm, "i");

    highlightedColumns = {};
    const rows = document.querySelectorAll(
      "#tableContainer .tableRow:not(.header)"
    );

    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll(".tableCell");
      cells.forEach((cell, cellIndex) => {
        const content = cell.textContent.trim();
        if (regex.test(content)) {
          if (!highlightedColumns[rowIndex]) {
            highlightedColumns[rowIndex] = [];
          }
          highlightedColumns[rowIndex][cellIndex] = true;
        }
      });
    });

    const totalHighlights = Object.values(highlightedColumns)
      .flat()
      .filter(Boolean).length;

    updateTable();
    updateResultInfo(totalHighlights);
  }

  function handleResetSearch() {
    document.getElementById("searchInput").value = "";
    highlightedColumns = {};
    updateTable();
    updateResultInfo(0);
  }

  function updateTable() {
    const tableContainer = document.getElementById("tableContainer");

    const rows = document.querySelectorAll(
      "#tableContainer .tableRow:not(.header)"
    );

    rows.forEach((row, rowIndex) => {
      const cells = row.querySelectorAll(".tableCell");

      cells.forEach((cell, cellIndex) => {
        if (highlightedColumns[rowIndex]?.[cellIndex]) {
          cell.classList.add("highlight");
        } else {
          cell.classList.remove("highlight");
        }
      });
    });
  }

  function updateResultInfo(totalHighlights) {
    const resultInfo = document.getElementById("resultInfo");

    if (totalHighlights > 0) {
      resultInfo.textContent = `Найдено совпадений: ${totalHighlights}`;
    } else {
      resultInfo.textContent = "Ничего не найдено";
    }
  }

  document
    .getElementById("searchInput")
    .addEventListener("input", handleSearch);
  document
    .getElementById("searchButton")
    .addEventListener("click", handleSearch);
  document
    .getElementById("resetButton")
    .addEventListener("click", handleResetSearch);
});
