import { useState } from "react";

import { data } from "../../constants/data";
import TableInput from "./TableInput/TableInput";
import TableRow from "./TableRow/TableRow";

const Table = () => {
  const [searchValue, setSearchValue] = useState("");
  const [highlightedData, setHighlightedData] = useState({});

  const handleSearch = () => {
    if (searchValue.trim() === "") {
      setHighlightedData({});
      return;
    }

    const results = data.reduce((acc, { id, content }) => {
      acc[id] = content.map((cell) =>
        cell.toLowerCase().includes(searchValue.toLowerCase())
      );
      return acc;
    }, {});

    setHighlightedData(results);
  };

  const handleResetSearch = () => {
    setSearchValue("");
    setHighlightedData({});
  };

  const totalHighlights = Object.values(highlightedData)
    .flat()
    .filter(Boolean).length;
  return (
    <div>
      <TableInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        handleResetSearch={handleResetSearch}
      />
      <div>
        {totalHighlights > 0 ? (
          <p>Найдено совпадений: {totalHighlights}</p>
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
      <TableRow highlightedData={highlightedData} />
    </div>
  );
};

export default Table;
