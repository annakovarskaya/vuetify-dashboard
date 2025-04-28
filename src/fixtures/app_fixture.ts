import type Column from "@/types/Column";
import ColumnType from "@/types/ColumnType";
import { Hospital } from "@/types/Hospital";
import { hospitalColumns } from "@/types/HospitalColumns";
import type User from "@/types/User";
import type { Product, UserProduct } from "@/types/UserProduct";
import { Chance } from "chance";

const chance = new Chance();

const user1 = {
  name: "Maria",
  password: "password1",
  hospital: Hospital.LEAMINGTON,
  productsNumber: 150,
};
const user2 = {
  name: "Maks",
  password: "password2",
  hospital: Hospital.WARWICK,
  productsNumber: 84,
};

export const users: Array<User> = [user1, user2];

export const createInventoryFixtureForUser = (user: User): UserProduct[] => {
  const userInventory: UserProduct[] = [];

  const userColumns: Column[] | undefined = hospitalColumns.get(user.hospital);
  if (userColumns === undefined) {
    throw Error("Columns should be defined for user's hospital");
  }
  Array.from({ length: user.productsNumber }, (_, index) => {
    const product: Product = new Map();
    const userProduct: UserProduct = new Map();
    userColumns.forEach((column: Column) => {
      let value: string = chance.word();
      // this data structure allows us to add new column types easily
      switch (column.type) {
        case ColumnType.STRING:
          break;
        case ColumnType.NUMBER:
          value = chance.integer({ min: 1, max: 20 }).toString();
          break;
        case ColumnType.DATE:
          value = chance.date({ string: true });
          break;
        default:
          throw new Error("Unknown column type");
      }
      product.set(column, value);
      userProduct.set(index, product);
    });
    userInventory.push(userProduct);
  });

  return userInventory;
};
