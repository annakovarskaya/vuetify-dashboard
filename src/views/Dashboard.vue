<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="justify-center align-center">
        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="serverItems"
          :items-length="totalItems"
          :loading="loading"
          :search="search"
          item-value="name"
          @update:options="loadItems"
          fixed-header
        >
          <!-- 1. in real world i would implement filtering as FilterAlt Material Icon button near sort icon at the top of each column and -->
          <!-- will open modal with filter input and 'Search' by click on this button -->
          <!-- 2. i would also make filter fields not just text fields but also number inputs and date pickers according to header type -->
          <!-- current UX isn't ideal but it's faster to implement and I want to send task today :)  -->
          <!-- happy to implement explained solution by additional request if needed-->
          <template v-slot:tfoot>
            <tr>
              <td v-for="(filter, index) in filters">
                <v-text-field
                  v-model="filter.value"
                  @change="fakeAPIFilter"
                  class="ma-2"
                  density="compact"
                  :placeholder="headers[index].title"
                  hide-details
                  sticky
                ></v-text-field>
              </td>
            </tr>
          </template>

          <template v-slot:item.actions="{ item }">
            <div class="d-flex ga-2 justify-end">
              <v-icon icon="mdi-pencil"></v-icon>
              <v-icon icon="mdi-delete"></v-icon>
            </div>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ApplicationConstants } from "@/constants/ApplicationConstants";
import { useStore } from "@/stores/store";
import type Column from "@/types/Column";
import ColumnType from "@/types/ColumnType";
import type { Hospital } from "@/types/Hospital";
import { hospitalColumns } from "@/types/HospitalColumns";
import type { Product } from "@/types/UserProduct";
import {
  computed,
  ref,
  unref,
  watch,
  type ComputedRef,
  onMounted,
  type Ref,
  nextTick,
  onBeforeMount,
} from "vue";
import type { DataTableHeader } from "vuetify";
import type { SortItem } from "vuetify/lib/components/VDataTable/composables/sort.mjs";
import { clone, filter, orderBy } from "lodash-es";
import { filterItems } from "vuetify/lib/composables/filter.mjs";

const store = useStore();

const { userProducts, userHospital } = store;

// gonna give on typing code for fake api
// also if our API is real, it's no need to unit test it - should be tested on backend side
// but if i have more time i would move all fake api functionality to composable and unit test it just to show i can unit test :)
// but i want to finish and send this today so happy to do it by additional request
const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        let items = unref(userProducts).slice();

        if (sortBy?.length) {
          items = fakeAPISort(sortBy, items);
        }

        const paginated = items.slice(start, end === -1 ? undefined : end);
        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  },
};

// i'm aware we need to call it from fakeAPI in ideal world
// but there's specificity about data table server component which doesn't allow us to fake filtering properly
// there's also a "bug" which exists for same reason - if you set filter and then delete table shows all rows instead of first page
// happy to fix by additional request or talk about it deeper during discussion
const fakeAPIFilter = () => {
  loading.value = true;
  console.log("we load items");
  const search = {};
  unref(columns).forEach((header: Column, index) => {
    const modelValue = unref(filters)[index].value;
    if (modelValue !== "") {
      search[header.key] = modelValue;
    }
  });
  console.log(filters.value);
  console.log(search);
  const filterObj = {};
  serverItems.value = unref(userProducts);
  Object.keys(search).forEach((key) => {
    const headerType = unref(columns).find((header) => header.key === key)
      ?.headerProps?.type;
    if (search[key]) {
      filterObj[key] = search[key];
      serverItems.value = filter(unref(userProducts), filterObj);
      // todo look on it later
      //store.setUserProducts(unref(userProducts).filter(()));
    }
  });
  loading.value = false;
};

const fakeAPISort = (
  sortBy: SortItem[],
  items: Array<Record<string, string>>,
): Array<Record<string, string>> => {
  const sortKey = sortBy[0].key;
  const sortOrder = sortBy[0].order;
  if (sortOrder === undefined) {
    throw new Error("Sort order should be defined");
  }
  // todo lodash's orderBy sorts perfectly values of different types
  // we still need to format dates to show in the table with vuetify slots,
  // could be implemented by additional request if needed
  return orderBy(items, [sortKey], [sortOrder]);
};

// todo move it to types
interface Filter {
  name: string;
  search: Ref<string>;
}

// refs
const itemsPerPage = ref(ApplicationConstants.ProductsPerPage);
const serverItems: Ref<Array<Product>> = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const filters: Ref<Array<Ref<string>>> = ref([]);

const search = ref("");

// methods

// gonna give on typing code for fake api
const loadItems = ({ page, sortBy, itemsPerPage }) => {
  loading.value = true;
  FakeAPI.fetch({
    page,
    sortBy,
    itemsPerPage,
  }).then(({ items, total }) => {
    serverItems.value = items;
    totalItems.value = total;
    loading.value = false;
    console.log();
    // store.setUserProducts(unref(serverItems));
  });
};

// Computed refs
const headers: ComputedRef<Column[]> = computed(() => {
  // we need this to not mutate config hospital columns set with actions column
  const columnsToUpdate: Column[] = clone(unref(columns));

  columnsToUpdate.push({
    title: "Actions",
    key: "actions",
    align: "end",
    sortable: false,
  });
  return columnsToUpdate;
});

const columns: ComputedRef<Column[]> = computed(() => {
  const columns: Column[] | undefined = hospitalColumns.get(
    unref(userHospital),
  );
  if (columns === undefined) {
    throw new Error("Hospital columns should be set in configs by that point");
  }

  return columns;
});

onBeforeMount(() => {
  filters.value = unref(columns).map((header: Column) => {
    return ref("");
  });
  console.log("tt");
  console.log(filters.value);
});

// Watchers
</script>
<style>
/* css styling is not great here but as far as i use vuetify first time ever and css is not my strongest power, i'm gonna concentrate on
functionality to finish task today. happy to refactor styling by additional request if needed
*/
</style>
