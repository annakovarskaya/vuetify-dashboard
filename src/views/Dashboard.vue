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
          <!-- in real world i would implement filtering as FilterAlt Material Icon button near sort icon at the top of each column and -->
          <!-- will open modal with filter input and 'Search' by click on this button -->
          <!-- current UX isn't ideal but it's faster to implement and I want to send task today :)  -->
          <!-- happy to implement explained solution by additional request if needed-->
          <template v-slot:tfoot>
            <tr>
              <td>
                <v-text-field
                  v-model="name"
                  class="ma-2"
                  density="compact"
                  placeholder="Search name..."
                  hide-details
                  sticky
                ></v-text-field>
              </td>
              <td>
                <v-text-field
                  v-model="calories"
                  class="ma-2"
                  density="compact"
                  placeholder="Minimum calories"
                  type="number"
                  hide-details
                ></v-text-field>
              </td>
            </tr>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="d-flex ga-2 justify-end">
              <v-icon icon="mdi-pencil" size="small"></v-icon>
              <v-icon icon="mdi-delete" size="small"></v-icon>
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
import type { Hospital } from "@/types/Hospital";
import { hospitalColumns } from "@/types/HospitalColumns";
import type { Product } from "@/types/UserProduct";
import { computed, ref, unref, watch, type ComputedRef, onMounted } from "vue";
import type { DataTableHeader } from "vuetify";

const store = useStore();

// gonna give on typing code for fake api
const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy, search }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = unref(products)
          .slice()
          .filter((item) => {
            if (
              search.name &&
              !item.name.toLowerCase().includes(search.name.toLowerCase())
            ) {
              return false;
            }
            // eslint-disable-next-line sonarjs/prefer-single-boolean-return
            if (
              search.calories &&
              !(item.calories >= Number(search.calories))
            ) {
              return false;
            }
            return true;
          });
        if (sortBy.length) {
          const sortKey = sortBy[0].key;
          const sortOrder = sortBy[0].order;
          items.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
          });
        }
        const paginated = items.slice(start, end === -1 ? undefined : end);
        resolve({ items: paginated, total: items.length });
      }, 500);
    });
  },
};

// refs
const itemsPerPage = ref(ApplicationConstants.ProductsPerPage);
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const name = ref("");
const calories = ref("");
const search = ref("");

// methods
// gonna give on typing code for fake api
const loadItems = ({ page, sortBy, itemsPerPage }) => {
  loading.value = true;
  FakeAPI.fetch({
    page,
    sortBy,
    itemsPerPage,
    search: { name: name.value, calories: calories.value },
  }).then(({ items, total }) => {
    serverItems.value = items;
    totalItems.value = total;
    loading.value = false;
  });
};

onMounted(() => {
  console.log(unref(headers));
  console.log(store.userProducts);
});

// Computed refs
const headers: ComputedRef<DataTableHeader[]> = computed(() => {
  const columns: DataTableHeader[] | undefined = hospitalColumns.get(
    unref(userHospital),
  );
  if (columns === undefined) {
    throw new Error("Hospital columns should be set in configs by that point");
  }
  columns.push({
    title: "Actions",
    key: "actions",
    align: "end",
    sortable: false,
  });
  return columns;
});

const products: ComputedRef<Array<Record<string, string>>> = computed(() => {
  return store.userProducts.map((map) => Object.fromEntries(map));
});

const userHospital: ComputedRef<Hospital> = computed(() => {
  if (store.userHospital === null) {
    throw new Error("Hospital should be set in store by that point");
  }
  return store.userHospital;
});

// Watchers
watch(name, () => {
  search.value = String(Date.now());
});
watch(calories, () => {
  search.value = String(Date.now());
});
</script>
<style>
/* css styling is not great here but as far as i use vuetify first time ever and css is not my strongest power, i'm gonna concentrate on
functionality to finish task today. happy to refactor styling by additional request if needed
*/
</style>
