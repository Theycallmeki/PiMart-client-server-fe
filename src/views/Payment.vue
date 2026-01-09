<script setup>
import { onMounted } from "vue";
import { useCashPayment } from "../composables/useCashPayment";

const { pending, fetchPending, generateCode } = useCashPayment();

onMounted(fetchPending);

const handleGenerate = async (id) => {
  const data = await generateCode(id);
  alert(`Generated Code: ${data.code}`);
};

const cancelRequest = async (id) => {
  const res = await fetch(`/payment/admin/cash/cancel/${id}`, {
    method: "POST",
    credentials: "include"
  });
  const data = await res.json();
  alert(data.message || data.error);
};


</script>

<template>
  <h1>Cash Payments</h1>

  <div v-for="p in pending" :key="p.id">
    <p>User ID: {{ p.user_id }}</p>
    <button
      @click="handleGenerate(p.id)"
      :disabled="p.code"
    >
      {{ p.code ? "Code Generated" : "Generate 6-Digit Code" }}
    </button>

    <!-- Optional: cancel -->
    <button
      @click="async () => { await cancelRequest(p.id); fetchPending(); }"
      :disabled="p.status !== 'PENDING'"
    >
      Cancel
    </button>

  </div>
</template>
