import type Column from "./Column";
import ColumnType from "./ColumnType";
import { Hospital } from "./Hospital";

const BaseColumns: Column[] = [
  {
    title: "Product name",
    headerProps: { type: ColumnType.String },
    key: "product_name",
  },
  {
    title: "Item number",
    headerProps: { type: ColumnType.Number },
    key: "item_number",
  },
  {
    title: "Manufacturer",
    headerProps: { type: ColumnType.String },
    key: "manufacturer",
  },
  {
    title: "Category",
    headerProps: { type: ColumnType.String },
    key: "category",
  },
  {
    title: "Quantity",
    headerProps: { type: ColumnType.Number },
    key: "quantity",
  },
];

export const hospitalColumns: Map<Hospital, Column[]> = new Map();

// Columns config for every hospital
hospitalColumns.set(Hospital.Leamington, BaseColumns);
hospitalColumns.set(Hospital.Warwick, [
  ...BaseColumns,
  {
    title: "Expiry date",
    headerProps: { type: ColumnType.Date },
    key: "expiry_date",
  },
  { title: "Price", headerProps: { type: ColumnType.Number }, key: "price" },
]);
