<script setup>
import { onMounted } from "vue";
import { useCashPayment } from "../composables/useCashPayment";

const { pending, fetchPending, generateCode } = useCashPayment();

onMounted(fetchPending);

const handleGenerate = async (id) => {
  try {
    const data = await generateCode(id);
    alert(`Cash code generated: ${data.code}`);
    fetchPending();
  } catch (err) {
    alert(err?.message || "Failed to generate code");
  }
};

const cancelRequest = async (id) => {
  const res = await fetch(`/payment/admin/cash/cancel/${id}`, {
    method: "POST",
    credentials: "include"
  });

  const data = await res.json();
  alert(data.message || data.error);
  fetchPending();
};
</script>

<template>
  <h1>Cash Payments</h1>

  <div
    v-for="p in pending"
    :key="p.id"
    style="border: 1px solid #ddd; padding: 12px; margin-bottom: 10px"
  >
    <!-- ✅ USER INFO -->
    <p>
      <strong>User:</strong>
      {{ p.username }}
      <span style="color: #888;">(ID: {{ p.user_id }})</span>
    </p>

    <!-- ✅ CASH CODE -->
    <p v-if="p.code">
      <strong>Cash Code:</strong>
      <span style="font-weight: bold; color: #2c7be5;">
        {{ p.code }}
      </span>
    </p>

    <!-- ✅ GENERATE BUTTON -->
    <button
      @click="handleGenerate(p.id)"
      :disabled="!!p.code"
    >
      {{ p.code ? "Code Generated" : "Generate 6-Digit Code" }}
    </button>

    <!-- ✅ CANCEL BUTTON -->
    <button
      @click="cancelRequest(p.id)"
      :disabled="!!p.code"
      style="margin-left: 10px"
    >
      Cancel
    </button>
  </div>
</template>
