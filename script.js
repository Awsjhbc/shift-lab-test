const searchInput = document.getElementById("searchInput");
const resultInfo = document.getElementById("resultInfo");

const tableRows = document.querySelectorAll(
  "#tableContainer .tableRow:not(.header)"
);

function updateTable(highlightedColumns) {
  tableRows.forEach((row, rowIndex) => {
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
  if (totalHighlights > 0) {
    resultInfo.textContent = `Найдено совпадений: ${totalHighlights}`;
  } else {
    resultInfo.textContent = "Ничего не найдено";
  }
}

function handleSearch() {
  let highlightedColumns = {};
  const searchValue = searchInput.value.trim();

  if (!searchValue) {
    highlightedColumns = {};
    updateTable(highlightedColumns);
    updateResultInfo(0);
    return;
  }

  tableRows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll(".tableCell");
    cells.forEach((cell, cellIndex) => {
      const content = cell.textContent.trim();
      if (content.toLowerCase().includes(searchValue.toLowerCase())) {
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

  updateTable(highlightedColumns);
  updateResultInfo(totalHighlights);
}

function handleResetSearch() {
  searchInput.value = "";
  updateTable({});
  updateResultInfo(0);
}

document.getElementById("searchInput").addEventListener("input", handleSearch);
document.getElementById("searchButton").addEventListener("click", handleSearch);
document
  .getElementById("resetButton")
  .addEventListener("click", handleResetSearch);
