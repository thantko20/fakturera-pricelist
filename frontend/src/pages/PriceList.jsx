import styles from "./PriceList.module.css";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
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

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, ...payload }) => {
      return await api.put(`/products/${id}`, payload).then((res) => res.data);
    },
    onSuccess: () => {
      productsQuery.refetch();
    },
  });

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  const onRowInputFocus = (productId) => {
    setSelectedProductId(productId);
  };

  const onRowInputChange = (productId, field, value) => {
    const fieldKey = `${productId}:${field}`;

    setEditedFields((previous) => ({
      ...previous,
      [fieldKey]: value,
    }));
  };

  const getFieldValue = (product, field) => {
    const fieldKey = `${product.id}:${field}`;
    return editedFields[fieldKey] ?? product[field] ?? "";
  };

  const buildEditedProduct = (product) => {
    return {
      ...product,
      articleNo: getFieldValue(product, "articleNo"),
      name: getFieldValue(product, "name"),
      inPrice: parseInt(getFieldValue(product, "inPrice")),
      price: parseInt(getFieldValue(product, "price")),
      unit: getFieldValue(product, "unit"),
      quantity: parseInt(getFieldValue(product, "quantity")),
      description: getFieldValue(product, "description"),
    };
  };

  const onRowInputCommit = (product, field) => {
    const editedProduct = buildEditedProduct(product);

    updateProductMutation.mutate(editedProduct);

    console.log("PRODUCT_EDIT_COMMIT", {
      productId: product.id,
      field,
      value: editedProduct?.[field],
      product: editedProduct,
    });
  };

  const onRowInputKeyDown = (event, product, field) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    onRowInputCommit(product, field);
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
              {productsQuery.data?.map((product) => (
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
                      onKeyDown={(event) =>
                        onRowInputKeyDown(event, product, "articleNo")
                      }
                      onFocus={() => onRowInputFocus(product.id)}
                    />
                  </td>
                  <td data-column="productName">
                    <input
                      required
                      type="text"
                      className={styles.rowInput}
                      value={getFieldValue(product, "name")}
                      onChange={(event) =>
                        onRowInputChange(product.id, "name", event.target.value)
                      }
                      onKeyDown={(event) =>
                        onRowInputKeyDown(event, product, "name")
                      }
                      onFocus={() => onRowInputFocus(product.id)}
                    />
                  </td>
                  <td data-column="inPrice">
                    <input
                      required
                      type="number"
                      min={1}
                      className={styles.rowInput}
                      value={getFieldValue(product, "inPrice")}
                      onChange={(event) =>
                        onRowInputChange(
                          product.id,
                          "inPrice",
                          event.target.value
                        )
                      }
                      onKeyDown={(event) =>
                        onRowInputKeyDown(event, product, "inPrice")
                      }
                      onFocus={() => onRowInputFocus(product.id)}
                    />
                  </td>
                  <td data-column="price">
                    <input
                      required
                      type="number"
                      min={1}
                      className={styles.rowInput}
                      value={getFieldValue(product, "price")}
                      onChange={(event) =>
                        onRowInputChange(
                          product.id,
                          "price",
                          event.target.value
                        )
                      }
                      onKeyDown={(event) =>
                        onRowInputKeyDown(event, product, "price")
                      }
                      onFocus={() => onRowInputFocus(product.id)}
                    />
                  </td>
                  <td data-column="unit">
                    <input
                      required
                      type="text"
                      className={styles.rowInput}
                      value={getFieldValue(product, "unit")}
                      onChange={(event) =>
                        onRowInputChange(product.id, "unit", event.target.value)
                      }
                      onKeyDown={(event) =>
                        onRowInputKeyDown(event, product, "unit")
                      }
                      onFocus={() => onRowInputFocus(product.id)}
                    />
                  </td>
                  <td data-column="quantity">
                    <input
                      required
                      type="number"
                      min={0}
                      className={styles.rowInput}
                      value={getFieldValue(product, "quantity")}
                      onChange={(event) =>
                        onRowInputChange(
                          product.id,
                          "quantity",
                          event.target.value
                        )
                      }
                      onKeyDown={(event) =>
                        onRowInputKeyDown(event, product, "quantity")
                      }
                      onFocus={() => onRowInputFocus(product.id)}
                    />
                  </td>
                  <td data-column="description">
                    <input
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
                      onKeyDown={(event) =>
                        onRowInputKeyDown(event, product, "description")
                      }
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
