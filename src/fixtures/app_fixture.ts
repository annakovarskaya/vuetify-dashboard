import type Column from "@/types/Column";
import ColumnType from "@/types/ColumnType";
import Hospital from "@/types/Hospital";
import { hospitalColumns } from "@/types/HospitalColumns";
import type User from "@/types/User";
import type { UserProduct } from "@/types/UserProduct";
import { Chance } from "chance";

const chance = new Chance();

const user1 = {
  name: "Maria",
  password: "password1",
  hospital: Hospital.LEAMINGTON,
};
const user2 = {
  name: "Maks",
  password: "password2",
  hospital: Hospital.WARWICK,
};

export const users: Array<User> = [user1, user2];

export const createInventoryForUser = (
  user: User,
  length: number,
): UserProduct[] => {
  const userInventory: UserProduct[] = [];

  const userColumns: Column[] | undefined = hospitalColumns.get(user.hospital);
  if (userColumns === undefined) {
    throw Error("Columns should be defined for user's hospital");
  }
  Array.from({ length }, () => {
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
      userProduct.set(column, value);
    });
    userInventory.push(userProduct);
  });

  return userInventory;
};
