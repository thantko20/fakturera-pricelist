import styles from "./PriceList.module.css";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";
import ProductsTable from "../components/ProductsTable";
import {
  PlusCircleIcon,
  PrinterIcon,
  ToggleRightIcon,
} from "@phosphor-icons/react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

export default function PriceList() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  const clearEditedFieldsByProductId = (productId) => {
    if (productId == null) {
      return;
    }

    const rowPrefix = `${productId}:`;

    setEditedFields((previous) => {
      const next = {};

      for (const [fieldKey, value] of Object.entries(previous)) {
        if (!fieldKey.startsWith(rowPrefix)) {
          next[fieldKey] = value;
        }
      }

      return next;
    });
  };

  const releaseSelectedProduct = (productId) => {
    setSelectedProductId((current) => {
      if (productId == null || current === productId) {
        return null;
      }

      return current;
    });
  };

  const productsQuery = useQuery({
    queryFn: async () => {
      return await api.get("/products").then((res) => res.data);
    },
    queryKey: ["products"],
  });

  const updateProductMutation = useMutation({
    mutationFn: async ({ id, ...payload }) => {
      return await api.put(`/products/${id}`, payload).then((res) => res.data);
    },
    onSuccess: async (_, variables) => {
      toast.success("Success!");
      await productsQuery.refetch();
      clearEditedFieldsByProductId(variables?.id);
      releaseSelectedProduct(variables?.id);
    },
    onError: (error, variables) => {
      clearEditedFieldsByProductId(variables?.id);
      releaseSelectedProduct(variables?.id);

      if (isAxiosError(error)) {
        toast.error(
          error.response.data?.error?.message ?? "Error while updating product"
        );
        return;
      }

      toast.error("Unknown Error");
    },
  });

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

  const onRowInputCommit = (product) => {
    const editedProduct = buildEditedProduct(product);

    updateProductMutation.mutate(editedProduct);
  };

  const onRowInputKeyDown = (event, product) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    onRowInputCommit(product);
  };

  const isRowBeingEdited = (productId) => {
    return selectedProductId === productId && updateProductMutation.isPending;
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
        <ProductsTable
          products={productsQuery.data}
          selectedProductId={selectedProductId}
          getFieldValue={getFieldValue}
          onRowInputChange={onRowInputChange}
          onRowInputKeyDown={onRowInputKeyDown}
          onRowInputFocus={onRowInputFocus}
          isRowBeingEdited={isRowBeingEdited}
        />
      </section>
    </div>
  );
}
