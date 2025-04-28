import { Hospital } from "./Hospital.ts";

export default interface User {
  name: string;
  password: string;
  hospital: Hospital;
  // we need products number for user just for generation initial fixture products array per user
  // this will be set to store and then all operations like add/delete/edit will happen in store only as we have no API
  productsNumber: number;
}
