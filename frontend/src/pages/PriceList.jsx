import styles from "./PriceList.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

export default function PriceList() {
  const productsQuery = useQuery({
    queryFn: async () => {
      return await api.get("/products").then((res) => res.data);
    },
  });

  const [selectedProductId, setSelectedProductId] = useState(null);

  const onRowInputFocus = (productId) => {
    setSelectedProductId(productId);
  };

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
              {productsQuery.data?.map((product) => (
                <tr key={product.id}>
                  <td className={styles.rowArrow}>
                    {selectedProductId === product.id ? "→" : null}
                  </td>
                  <td>
                    <input
                      className={styles.rowInput}
                      defaultValue={product.articleNo}
                      onFocus={() => onRowInputFocus(product.id)}
                    />
                  </td>
                  <td>
                    <input
                      className={styles.rowInput}
                      defaultValue={product.name}
                    />
                  </td>
                  <td>
                    <input
                      className={styles.rowInput}
                      defaultValue={product.inPrice}
                    />
                  </td>
                  <td>
                    <input
                      className={styles.rowInput}
                      defaultValue={product.price}
                    />
                  </td>
                  <td>
                    <input
                      className={styles.rowInput}
                      defaultValue={product.unit}
                    />
                  </td>
                  <td>
                    <input
                      className={styles.rowInput}
                      defaultValue={product.quantity}
                    />
                  </td>
                  <td>
                    <input
                      className={styles.rowInput}
                      defaultValue={product.description}
                    />
                  </td>
                  <td className={styles.rowMore}>...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
