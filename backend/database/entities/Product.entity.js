import { EntitySchema } from "typeorm";

const Product = new EntitySchema({
  name: "Product",
  tableName: "products",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    articleNo: {
      type: "varchar",
      name: "article_no",
      unique: true,
    },
    name: {
      type: "varchar",
      unique: true,
    },
    inPrice: {
      type: "integer",
      name: "in_price",
    },
    price: {
      type: "integer",
    },
    unit: {
      type: "varchar",
    },
    quantity: {
      type: "int",
    },
    description: {
      type: "text",
    },
  },
});

export default Product;
