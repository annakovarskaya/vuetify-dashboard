import type Hospital from "./Hospital.ts";

export default interface User {
  name: string;
  password: string;
  hospital: Hospital;
}
