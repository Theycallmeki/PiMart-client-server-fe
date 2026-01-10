<script setup>
import { onMounted } from "vue";
import { useCashPayment } from "../composables/useCashPayment";
import { CashAPI } from "../services/cashApi";

const { pending, fetchPending, generateCode } = useCashPayment();

onMounted(fetchPending);

/* -----------------------
   GENERATE CASH CODE
----------------------- */
const handleGenerate = async (id) => {
  try {
    const data = await generateCode(id);
    alert(`Cash code generated: ${data.code}`);
    fetchPending();
  } catch (err) {
    alert(err?.message || "Failed to generate code");
  }
};

/* -----------------------
   CANCEL CASH REQUEST (ADMIN)
----------------------- */
const cancelRequest = async (id) => {
  const confirmed = confirm(
    "Are you sure you want to cancel this cash payment?"
  );
  if (!confirmed) return;

  const reason = prompt(
    "Reason for cancelling this cash request? (optional)"
  );

  try {
    await CashAPI.cancel(id, reason);
    alert("Cash payment cancelled");
    fetchPending();
  } catch (err) {
    console.error(err);
    alert(err?.response?.data?.error || "Cancel failed");
  }
};
</script>

<template>
  <h1>Cash Payments</h1>

  <div
    v-for="p in pending"
    :key="p.id"
    style="border: 1px solid #ddd; padding: 12px; margin-bottom: 10px"
  >
    <!-- USER INFO -->
    <p>
      <strong>User:</strong>
      {{ p.username }}
      <span style="color: #888;">(ID: {{ p.user_id }})</span>
    </p>

    <!-- CASH CODE -->
    <p v-if="p.code">
      <strong>Cash Code:</strong>
      <span style="font-weight: bold; color: #2c7be5;">
        {{ p.code }}
      </span>
    </p>

    <!-- GENERATE CODE BUTTON -->
    <button
      @click="handleGenerate(p.id)"
      :disabled="!!p.code"
    >
      {{ p.code ? "Code Generated" : "Generate 6-Digit Code" }}
    </button>

    <!-- CANCEL BUTTON -->
    <button
      @click="cancelRequest(p.id)"
      style="margin-left: 10px; color: red"
    >
      Cancel
    </button>
  </div>
</template>
