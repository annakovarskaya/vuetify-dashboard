import type ColumnType from "@/types/ColumnType";
import type { DataTableHeader } from "vuetify";

export default interface Column extends DataTableHeader {
  // key exists in base type but has too many type options we gonna simplify it
  key: string;
  headerProps: {
    type: ColumnType;
  };
}
