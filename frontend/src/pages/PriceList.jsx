import styles from "./PriceList.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import {
  PlusCircleIcon,
  PrinterIcon,
  ToggleRightIcon,
} from "@phosphor-icons/react";

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
            <p>New Product</p>
            <PlusCircleIcon size={24} weight="fill" color="green" />
          </button>
          <button type="button" className={styles.actionButton}>
            <p>Print List</p>
            <PrinterIcon size={24} weight="fill" color="#30a9dc" />
          </button>
          <button type="button" className={styles.actionButton}>
            <p>Advanced mode</p>
            <ToggleRightIcon size={24} weight="fill" color="#30a9dc" />
          </button>
        </div>
      </section>

      <section className={styles.tableSection}>
        <div className={styles.tableScroll}>
          <table className={styles.priceTable}>
            <thead>
              <tr>
                <th className={styles.indicatorHeader}></th>
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
              {productsQuery.data?.map((product) => (
                <tr key={product.id}>
                  <td className={styles.rowArrow}>
                    {selectedProductId === product.id ? "→" : null}
                  </td>
                  <td data-column="articleNo">
                    <input
                      className={styles.rowInput}
                      defaultValue={product.articleNo}
                      onFocus={() => onRowInputFocus(product.id)}
                    />
                  </td>
                  <td data-column="productName">
                    <input
                      className={styles.rowInput}
                      defaultValue={product.name}
                      onFocus={() => onRowInputFocus(product.id)}
                    />
                  </td>
                  <td data-column="inPrice">
                    <input
                      className={styles.rowInput}
                      defaultValue={product.inPrice}
                      onFocus={() => onRowInputFocus(product.id)}
                    />
                  </td>
                  <td data-column="price">
                    <input
                      className={styles.rowInput}
                      defaultValue={product.price}
                      onFocus={() => onRowInputFocus(product.id)}
                    />
                  </td>
                  <td data-column="unit">
                    <input
                      className={styles.rowInput}
                      defaultValue={product.unit}
                      onFocus={() => onRowInputFocus(product.id)}
                    />
                  </td>
                  <td data-column="quantity">
                    <input
                      className={styles.rowInput}
                      defaultValue={product.quantity}
                      onFocus={() => onRowInputFocus(product.id)}
                    />
                  </td>
                  <td data-column="description">
                    <input
                      className={styles.rowInput}
                      defaultValue={product.description}
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
      </section>
    </div>
  );
}
