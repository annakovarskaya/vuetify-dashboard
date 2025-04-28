import type Column from "./Column";
import ColumnType from "./ColumnType";
import { Hospital } from "./Hospital";

const BaseColumns: Column[] = [
  { name: "Product name", type: ColumnType.STRING },
  { name: "Item number", type: ColumnType.NUMBER },
  { name: "Manufacturer", type: ColumnType.STRING },
  { name: "Category", type: ColumnType.STRING },
  { name: "Quantity", type: ColumnType.NUMBER },
];

export const hospitalColumns: Map<Hospital, Column[]> = new Map();

// Columns config for every hospital
hospitalColumns.set(Hospital.LEAMINGTON, BaseColumns);
hospitalColumns.set(Hospital.WARWICK, [
  ...BaseColumns,
  { name: "Expiry date", type: ColumnType.DATE },
  { name: "Price", type: ColumnType.NUMBER },
]);
