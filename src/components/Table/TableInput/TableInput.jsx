import styles from "./TableInput.module.css";

const TableInput = ({
  searchValue,
  setSearchValue,
  handleSearch,
  handleResetSearch,
}) => {
  return (
    <>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Введите текст для поиска"
          value={searchValue}
          onInput={(e) => {
            setSearchValue(e.target.value);
            handleSearch();
          }}
          className={styles.inputRow}
        />
        <div>
          <button onClick={handleSearch}>Искать</button>
          <button onClick={handleResetSearch}>Сбросить поиск</button>
        </div>
      </div>
    </>
  );
};

export default TableInput;
