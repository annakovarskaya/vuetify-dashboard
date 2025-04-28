import { Hospital } from "@/types/Hospital";
import type { UserProduct } from "@/types/UserProduct";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useStore = defineStore("store", () => {
  // State
  const userProducts: Ref<Array<UserProduct>> = ref([]);
  const userHospital: Ref<Hospital | null> = ref(null);

  // Actions
  function setUserProducts(products: Array<UserProduct>) {
    userProducts.value = products;
  }

  function setUserHospital(hospital: Hospital) {
    userHospital.value = hospital;
  }

  return {
    userProducts,
    userHospital,
    setUserProducts,
    setUserHospital,
  };
});
