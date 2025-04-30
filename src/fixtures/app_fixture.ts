import type Column from "@/types/Column";
import ColumnType from "@/types/ColumnType";
import { Hospital } from "@/types/Hospital";
import { hospitalColumns } from "@/types/HospitalColumns";
import type User from "@/types/User";
import type { Product } from "@/types/UserProduct";
import { Chance } from "chance";

const chance = new Chance();

export const user1 = {
  name: "Maria",
  password: "password1",
  hospital: Hospital.Leamington,
  productsNumber: 150,
};
export const user2 = {
  name: "Maks",
  password: "password2",
  hospital: Hospital.Warwick,
  productsNumber: 84,
};

export const users: Array<User> = [user1, user2];

export const createInventoryFixtureForUser = (user: User): Product[] => {
  const userInventory: Product[] = [];

  const userColumns: Column[] | undefined = hospitalColumns.get(user.hospital);
  if (userColumns === undefined) {
    throw Error("Columns should be defined for user's hospital");
  }

  Array.from({ length: user.productsNumber }, (_, index) => {
    const product: Product = {};
    product["id"] = index.toString();
    userColumns.forEach((column: Column) => {
      let value: string = chance.word();
      // this data structure allows us to add new column types easily
      switch (column.headerProps?.type) {
        case ColumnType.String:
          break;
        case ColumnType.Number:
          value = chance.integer({ min: 1, max: 20 }).toString();
          break;
        case ColumnType.Date:
          value = chance.date().toLocaleString();
          break;
        default:
          throw new Error("Unknown column type");
      }

      product[column.key] = value;
    });
    userInventory.push(product);
  });

  return userInventory;
};
