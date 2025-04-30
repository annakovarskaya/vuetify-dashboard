<template>
  <v-container class="fill-height">
    <v-row>
      <v-col class="justify-center align-center">
        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="store.headers"
          :items="serverItems"
          :items-length="totalItems"
          :loading="loading"
          :search="search"
          :sortBy="serverSortBy"
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
                  :placeholder="store.headers[index].title"
                  hide-details
                  sticky
                />
              </td>
            </tr>
          </template>

          <template v-slot:item.actions="{ item }">
            <div class="d-flex ga-2 justify-end">
              <v-icon icon="mdi-pencil" @click="editProduct(item.id)" />
              <v-icon icon="mdi-delete" @click="deleteProduct(item.id)" />
            </div>
          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>
                <v-icon icon="mdi-book-multiple" size="x-small" start />
                Hospital products
              </v-toolbar-title>
              <v-btn
                class="me-2"
                prepend-icon="mdi-plus"
                rounded="lg"
                text="Add a Product"
                border
                @click="addProduct"
              />
            </v-toolbar>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog" max-width="500">
    <v-card
      :subtitle="`${editedProductId ? 'Update' : 'Create'} hospital product`"
      :title="`${editedProductId ? 'Edit' : 'Add'} a Product`"
    >
      <template v-slot:text>
        <v-row>
          <v-col cols="12" v-for="(input, index) in inputs">
            <v-text-field
              v-model="input.value"
              class="ma-2"
              density="compact"
              :placeholder="store.headers[index].title"
              hide-details
              sticky
            ></v-text-field>
          </v-col>
        </v-row>
      </template>

      <v-divider></v-divider>

      <v-card-actions class="bg-surface-light">
        <v-btn text="Cancel" variant="plain" @click="dialog = false" />

        <v-spacer></v-spacer>

        <v-btn text="Save" @click="saveProduct" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ApplicationConstants } from "@/constants/ApplicationConstants";
import { useStore } from "@/stores/store";
import type Column from "@/types/Column";
import type { Product } from "@/types/UserProduct";
import { ref, unref, type Ref, onBeforeMount } from "vue";
import type { SortItem } from "vuetify/lib/components/VDataTable/composables/sort.mjs";
import { filter, orderBy } from "lodash-es";

const store = useStore();

const { deleteUserProduct, editUserProduct, addUserProduct, getUserProduct } =
  store;

// if our API is real, it's no need to unit test it - should be tested on backend side
// but if i have more time i would move all fake api functionality to composable and unit test it just to show i can unit test :)
// but i want to finish and send this today so happy to do it by additional request
const FakeAPI = {
  async fetch({ page, itemsPerPage, sortBy }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        let items: Product[] = store.products.slice();
        if (sortBy?.length) {
          items = fakeAPISort(sortBy, items);
        }
        const paginated: Product[] = items.slice(
          start,
          end === -1 ? undefined : end,
        );
        resolve({ items: paginated, total: items.length, sortBy });
      }, 500);
    });
  },
};

// i'm aware we need to call it from fakeAPI in ideal world
// but there's specificity about data table server component which doesn't allow us to fake filtering properly
// there's also a "bug" which exists for same reason - if you set filter and then delete it, table shows all rows instead of first page
// and sort doesn't work fo date column - that's an effect of fake api - in real world i would sent/receive raw dates to server in hidden column
// and show formatted values of this in another column table. looks like we found here cons of vuetify server side data table - not great to work with dates.
// or i'm just tired and don't see something obvious right now - we always have this option being human :)

const fakeAPIFilter = () => {
  loading.value = true;
  const search = {};
  store.columns.forEach((header: Column, index) => {
    const modelValue = unref(filters)[index].value;
    if (modelValue !== "") {
      search[header.key] = modelValue;
    }
  });
  const filterObj = {};
  serverItems.value = store.products;
  Object.keys(search).forEach((key) => {
    const headerType = store.columns.find((header) => header.key === key)
      ?.headerProps?.type;
    if (search[key]) {
      filterObj[key] = search[key];
      serverItems.value = filter(store.products, filterObj);
    }
  });
  loading.value = false;
};

// there's a bug in sorting - it works for asc and desc first 2 clicks, but looses sortBy on 3rd click so shows initials unsorted array
// i digged it a bit - think it's an effect of fake api so I leave it in peace
const fakeAPISort = (
  sortBy: SortItem[],
  items: Array<Product>,
): Array<Product> => {
  const sortKey = sortBy[0].key;
  const sortOrder = sortBy[0].order;
  if (sortOrder === undefined) {
    throw new Error("Sort order should be defined");
  }
  // todo lodash's orderBy sorts perfectly values of different types
  // we still need to format dates to show in the table with vuetify slots,
  // could be implemented by additional request if needed
  const orderedItems = orderBy(items, [sortKey], [sortOrder]);
  return orderedItems;
};

// refs
const itemsPerPage = ref(ApplicationConstants.ProductsPerPage);
const serverItems: Ref<Array<Product>> = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const filters: Ref<Array<Ref<string>>> = ref([]);
const inputs: Ref<Array<Ref<string>>> = ref([]);

const search = ref("");
const serverSortBy: Ref<SortItem[]> = ref([]);
const dialog = ref(false);

const editedProductId = ref("");

// methods
const deleteProduct = (id: string) => {
  // i would add confirmation modal here before actual delete but want to send task todat so will skip it
  // happy to implement it by additional request if needed
  deleteUserProduct(id);

  loadItems({
    page: 1,
    itemsPerPage: unref(itemsPerPage),
    sortBy: unref(serverSortBy),
  });
};

const addProduct = async () => {
  editedProductId.value = "";
  inputs.value = store.columns.map((header: Column) => {
    return ref("");
  });
  dialog.value = true;
};

const editProduct = async (id: string) => {
  editedProductId.value = id;
  const editedProduct: Product = getUserProduct(id);
  store.columns.forEach(
    (header, index) =>
      (inputs.value[index] = ref(editedProduct[header.key].toString())),
  );
  dialog.value = true;
};

const saveProduct = () => {
  const id = unref(editedProductId);
  if (id) {
    editUserProduct(unref(inputs), id);
  } else {
    addUserProduct(unref(inputs));
  }

  loadItems({
    page: 1,
    itemsPerPage: unref(itemsPerPage),
    sortBy: unref(serverSortBy),
  });
  dialog.value = false;
};

// gonna give on typing code for fake api
const loadItems = ({ page, sortBy, itemsPerPage }) => {
  loading.value = true;
  filters.value = unref(filters).map((filter) => ref(""));
  FakeAPI.fetch({
    page,
    sortBy,
    itemsPerPage,
  }).then(({ items, total, sortBy }) => {
    serverItems.value = items;
    totalItems.value = total;
    loading.value = false;
    serverSortBy.value = sortBy;
  });
};

// Computed refs

// had as onMount before then found it fires after table's @update:options is fired
// copilot explained what happened and suggested onBeforwMount
onBeforeMount(() => {
  filters.value = store.columns.map((header: Column) => {
    return ref("");
  });
});

// Watchers
</script>
<style>
/* css styling is not great here but as far as i use vuetify first time ever and css is not my strongest power, i'm gonna concentrate on
functionality to finish task today. happy to refactor styling by additional request if needed
*/
</style>
