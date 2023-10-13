import { useState } from "react";
import styles from "./Table.module.css";

const Table = () => {
  const columns = [
    {
      id: 1,
      title: "Имя",
      content: ["Иван", "Мария", "Александр", "Елена"],
    },
    {
      id: 2,
      title: "Возраст",
      content: ["25", "30", "22", "35"],
    },
    {
      id: 3,
      title: "Город",
      content: ["Москва", "Томск", "Новосибирск", "Самара"],
    },
    {
      id: 4,
      title: "Работа",
      content: ["Инженер", "Врач", "Программист", "Учитель"],
    },
    {
      id: 5,
      title: "Хобби",
      content: ["Фотография", "Путешествия", "Литература", "Спорт"],
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedColumns, setHighlightedColumns] = useState({});

  const handleSearch = () => {
    const results = columns.reduce((acc, { id, content }) => {
      acc[id] = content.map((cell) =>
        cell.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return acc;
    }, {});
    setHighlightedColumns(results);
  };

  const totalHighlights = Object.values(highlightedColumns)
    .flat()
    .filter(Boolean).length;

  return (
    <div>
      <input
        type="text"
        placeholder="Введите текст для поиска"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Искать</button>
      <div>
        {totalHighlights > 0 ? (
          <p>Найдено совпадений: {totalHighlights}</p>
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
      <div className={styles.tableContainer}>
        <div className={`${styles.tableRow} ${styles.header}`}>
          {columns.map(({ id, title, content }) => (
            <div key={id} className={styles.tableCell}>
              <div className={`${styles.tableCell} ${styles.header}`}>
                {title}
              </div>
              {content.map((cell, index) => (
                <div
                  key={index}
                  className={`${styles.tableCell} ${
                    highlightedColumns[id]?.[index] && styles.highlight
                  }`}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
