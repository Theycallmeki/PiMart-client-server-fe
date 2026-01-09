import { ref } from "vue";
import { CashAPI } from "../services/cashApi";

export function useCashPayment() {
  const pending = ref([]);

  const fetchPending = async () => {
    const res = await CashAPI.getPending();
    pending.value = res.data;
  };

  const generateCode = async (id) => {
    const res = await CashAPI.generateCode(id);
    return res.data;
  };

  return { pending, fetchPending, generateCode };
}
