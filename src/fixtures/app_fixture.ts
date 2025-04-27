import type Column from "@/types/Column";
import ColumnType from "@/types/ColumnType";
import Hospital from "@/types/Hospital";
import { hospitalColumns } from "@/types/HospitalColumns";
import type User from "@/types/User";
import type { UserInventory } from "@/types/UserInventory";
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

const createInventoryForUser = (user: User): UserInventory => {
  const userInventory: UserInventory = new Map();

  const userColumns: Column[] | undefined = hospitalColumns.get(user.hospital);
  if (userColumns === undefined) {
    throw Error("Columns should be defined for user's hospital");
  }
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
    userInventory.set(column, value);
  });
  return userInventory;
};

export const user1Inventory: UserInventory = createInventoryForUser(user1);
export const user2Inventory: UserInventory = createInventoryForUser(user2);
