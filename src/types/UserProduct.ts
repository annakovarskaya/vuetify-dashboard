import type Column from "./Column";

export type Product = Map<Column, string>;

export type UserProduct = Map<number, Product>;
