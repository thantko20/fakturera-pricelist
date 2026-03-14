import styles from "./ProductsTable.module.css";

export default function ProductsTable({
  products,
  selectedProductId,
  getFieldValue,
  onRowInputChange,
  onRowInputKeyDown,
  onRowInputFocus,
  isRowBeingEdited,
}) {
  return (
    <div className={styles.tableScroll}>
      <table className={styles.priceTable}>
        <thead>
          <tr>
            <th data-column="arrow" className={styles.indicatorHeader}></th>
            <th data-column="articleNo">Article No.</th>
            <th data-column="productName">Product/Service</th>
            <th data-column="inPrice">In Price</th>
            <th data-column="price">Price</th>
            <th data-column="unit">Unit</th>
            <th data-column="quantity">In Stock</th>
            <th data-column="description">Description</th>
            <th className={styles.moreHeader}></th>
          </tr>
        </thead>

        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td data-column="arrow" className={styles.rowArrow}>
                {selectedProductId === product.id ? "→" : null}
              </td>
              <td data-column="articleNo">
                <input
                  required
                  type="text"
                  className={styles.rowInput}
                  value={getFieldValue(product, "articleNo")}
                  onChange={(event) =>
                    onRowInputChange(
                      product.id,
                      "articleNo",
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => onRowInputKeyDown(event, product)}
                  onFocus={() => onRowInputFocus(product.id)}
                  disabled={isRowBeingEdited(product.id)}
                />
              </td>
              <td data-column="productName">
                <input
                  disabled={isRowBeingEdited(product.id)}
                  required
                  type="text"
                  className={styles.rowInput}
                  value={getFieldValue(product, "name")}
                  onChange={(event) =>
                    onRowInputChange(product.id, "name", event.target.value)
                  }
                  onKeyDown={(event) => onRowInputKeyDown(event, product)}
                  onFocus={() => onRowInputFocus(product.id)}
                />
              </td>
              <td data-column="inPrice">
                <input
                  disabled={isRowBeingEdited(product.id)}
                  required
                  type="number"
                  min={1}
                  className={styles.rowInput}
                  value={getFieldValue(product, "inPrice")}
                  onChange={(event) =>
                    onRowInputChange(product.id, "inPrice", event.target.value)
                  }
                  onKeyDown={(event) => onRowInputKeyDown(event, product)}
                  onFocus={() => onRowInputFocus(product.id)}
                />
              </td>
              <td data-column="price">
                <input
                  disabled={isRowBeingEdited(product.id)}
                  required
                  type="number"
                  min={1}
                  className={styles.rowInput}
                  value={getFieldValue(product, "price")}
                  onChange={(event) =>
                    onRowInputChange(product.id, "price", event.target.value)
                  }
                  onKeyDown={(event) => onRowInputKeyDown(event, product)}
                  onFocus={() => onRowInputFocus(product.id)}
                />
              </td>
              <td data-column="unit">
                <input
                  disabled={isRowBeingEdited(product.id)}
                  required
                  type="text"
                  className={styles.rowInput}
                  value={getFieldValue(product, "unit")}
                  onChange={(event) =>
                    onRowInputChange(product.id, "unit", event.target.value)
                  }
                  onKeyDown={(event) => onRowInputKeyDown(event, product)}
                  onFocus={() => onRowInputFocus(product.id)}
                />
              </td>
              <td data-column="quantity">
                <input
                  disabled={isRowBeingEdited(product.id)}
                  required
                  type="number"
                  min={0}
                  className={styles.rowInput}
                  value={getFieldValue(product, "quantity")}
                  onChange={(event) =>
                    onRowInputChange(product.id, "quantity", event.target.value)
                  }
                  onKeyDown={(event) => onRowInputKeyDown(event, product)}
                  onFocus={() => onRowInputFocus(product.id)}
                />
              </td>
              <td data-column="description">
                <input
                  disabled={isRowBeingEdited(product.id)}
                  type="text"
                  required
                  className={styles.rowInput}
                  value={getFieldValue(product, "description")}
                  onChange={(event) =>
                    onRowInputChange(
                      product.id,
                      "description",
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => onRowInputKeyDown(event, product)}
                  onFocus={() => onRowInputFocus(product.id)}
                />
              </td>
              <td data-column="more" className={styles.rowMore}>
                ...
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
