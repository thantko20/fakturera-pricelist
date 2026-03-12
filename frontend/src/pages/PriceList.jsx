import styles from "./PriceList.module.css";

export default function PriceList() {
  return (
    <div className={styles.priceListPage}>
      <section className={styles.toolbarSection}>
        <div className={styles.searchGroup}>
          <input
            className={styles.searchInput}
            placeholder="Search Article No..."
          />
          <input
            className={styles.searchInput}
            placeholder="Search Product ..."
          />
        </div>

        <div className={styles.actionGroup}>
          <button type="button" className={styles.actionButton}>
            New Product
          </button>
          <button type="button" className={styles.actionButton}>
            Print List
          </button>
          <button type="button" className={styles.actionButton}>
            Advanced mode
          </button>
        </div>
      </section>

      <section className={styles.tableSection}>
        <div className={styles.tableScroll}>
          <table className={styles.priceTable}>
            <thead>
              <tr>
                <th className={styles.indicatorHeader}></th>
                <th>Article No.</th>
                <th>Product/Service</th>
                <th>In Price</th>
                <th>Price</th>
                <th>Unit</th>
                <th>In Stock</th>
                <th>Description</th>
                <th className={styles.moreHeader}></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className={styles.rowArrow}>→</td>
                <td>
                  <input
                    className={styles.rowInput}
                    defaultValue="1234567890"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className={styles.rowInput}
                    defaultValue="This is a test product with fifty characters this!"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className={styles.rowInput}
                    defaultValue="900500"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className={styles.rowInput}
                    defaultValue="1500800"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className={styles.rowInput}
                    defaultValue="kilometers/hour"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className={styles.rowInput}
                    defaultValue="2500600"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className={styles.rowInput}
                    defaultValue="This is the description with fifty characters this"
                    readOnly
                  />
                </td>
                <td className={styles.rowMore}>...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
