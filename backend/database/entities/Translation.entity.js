import { EntitySchema } from "typeorm";

const Translation = new EntitySchema({
  name: "Translation",
  tableName: "translations",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    keyName: {
      type: "varchar",
      name: "key_name",
    },
    content: {
      type: "text",
    },
    locale: {
      type: "varchar",
      length: 10,
    },
  },
  indices: [
    {
      columns: ["locale"],
    },
  ],
});

export default Translation;
