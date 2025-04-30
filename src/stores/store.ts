import type Column from "@/types/Column";
import { Hospital } from "@/types/Hospital";
import { hospitalColumns } from "@/types/HospitalColumns";
import type { Product } from "@/types/UserProduct";
import { defineStore } from "pinia";
import { computed, ref, unref, type ComputedRef, type Ref } from "vue";
import { clone } from "lodash-es";

export const useStore = defineStore("store", () => {
  // State
  const products: Ref<Array<Product>> = ref([]);
  const hospital: Ref<Hospital | null> = ref(null);

  // Getters
  const userHospital: ComputedRef<Hospital> = computed(() => {
    const hospitalValue = unref(hospital);
    if (hospitalValue === null) {
      throw new Error("Hospital should be set in store by that point");
    }
    return hospitalValue;
  });

  const columns: ComputedRef<Column[]> = computed(() => {
    const cols: Column[] | undefined = hospitalColumns.get(unref(userHospital));
    if (cols === undefined) {
      throw new Error(
        "Hospital columns should be set in configs by that point",
      );
    }

    return cols;
  });

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

  // Actions
  function setUserProducts(productsValue: Array<Product>) {
    products.value = productsValue;
  }

  function addUserProduct(inputs: Array<Ref<string>>) {
    const product = createProductFromInputs(inputs);
    products.value.unshift(product);
  }

  function getUserProduct(id: string): Product {
    const product = unref(products).find(
      (product: Product) => product.id == id,
    );
    if (product === undefined) {
      throw new Error("Product should exist");
    }
    return product;
  }

  function editUserProduct(inputs: Array<Ref<string>>, id: string) {
    const updatedProducts = unref(products).map((product: Product) => {
      if (product.id === id) {
        const productToUpdate = createProductFromInputs(inputs, id);
        return productToUpdate;
      }
      return product;
    });
    useStore().setUserProducts(updatedProducts);
  }

  function createProductFromInputs(
    inputs: Array<Ref<string>>,
    id?: string,
  ): Product {
    const product: Product = {};
    product["id"] = id ?? unref(products).length.toString();
    unref(columns).forEach((header: Column, index) => {
      const modelValue = inputs[index].value;
      product[header.key] = modelValue;
    });
    return product;
  }

  function deleteUserProduct(id: string) {
    products.value = unref(products).filter(
      (product: Product) => product.id !== id,
    );
  }

  function setUserHospital(hospitalValue: Hospital) {
    hospital.value = hospitalValue;
  }

  return {
    products,
    userHospital,
    columns,
    headers,
    setUserProducts,
    setUserHospital,
    deleteUserProduct,
    addUserProduct,
    editUserProduct,
    getUserProduct,
  };
});
