import { Hospital } from "@/types/Hospital";
import type { Product } from "@/types/UserProduct";
import { defineStore } from "pinia";
import { computed, ref, unref, type ComputedRef, type Ref } from "vue";

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

  // Actions
  function setUserProducts(productsValue: Array<Product>) {
    products.value = productsValue;
  }

  function setUserHospital(hospitalValue: Hospital) {
    hospital.value = hospitalValue;
  }

  return {
    products,
    userHospital,
    setUserProducts,
    setUserHospital,
  };
});
