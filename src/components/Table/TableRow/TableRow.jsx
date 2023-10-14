import { data } from "../../../constants/data";
import styles from "./TableRow.module.css";

const TableRow = ({ highlightedData }) => {
  return (
    <>
      <div className={styles.tableRow}>
        {data.map(({ id, title, content }) => (
          <div key={id} className={styles.tableCell}>
            <div className={styles.headerCell}>{title}</div>
            {content.map((cell, index) => (
              <div
                key={index}
                className={`${styles.tableCell} ${
                  highlightedData[id]?.[index] && styles.highlight
                }`}
                data-label={title}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default TableRow;
