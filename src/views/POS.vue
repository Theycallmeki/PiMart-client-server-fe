<script setup>
import { ref, computed } from "vue"
import api from "../services/api"

/* ---------------- STATE ---------------- */
const barcode = ref("")
const quantity = ref(1)
const cart = ref([])
const message = ref("")

/* ---------------- API ---------------- */
const getItemByBarcode = (barcode) =>
  api.get(`/items/barcode/${barcode}`)

const createTransaction = (items) =>
  api.post("/sales", { items })

/* ---------------- CART ---------------- */
const addToCart = async () => {
  try {
    const res = await getItemByBarcode(barcode.value)
    const item = res.data

    const existing = cart.value.find(c => c.item_id === item.id)

    if (existing) {
      existing.quantity += quantity.value
    } else {
      cart.value.push({
        item_id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantity.value
      })
    }

    barcode.value = ""
    quantity.value = 1
  } catch (e) {
    alert(e.response?.data?.error || "Item not found")
  }
}

const removeFromCart = (id) => {
  cart.value = cart.value.filter(i => i.item_id !== id)
}

/* ---------------- TOTAL ---------------- */
const total = computed(() =>
  cart.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
)

/* ---------------- CHECKOUT ---------------- */
const checkout = async () => {
  try {
    const payload = {
      items: cart.value.map(i => ({
        item_id: i.item_id,
        quantity: i.quantity
      }))
    }

    console.log("PAYLOAD:", payload)

    const res = await createTransaction(payload.items)

    console.log("SUCCESS:", res.data)

    cart.value = []
    message.value = "Transaction completed"
  } catch (e) {
    console.error("CHECKOUT ERROR:", e.response?.data)
    message.value = e.response?.data?.error || "Checkout failed"
  }
}
</script>

<template>
  <div class="pos">
    <h1>🧾 Cashier POS</h1>

    <div class="scan">
      <input
        v-model="barcode"
        placeholder="Scan barcode"
        @keyup.enter="addToCart"
      />
      <input
        v-model.number="quantity"
        type="number"
        min="1"
      />
      <button @click="addToCart">Add</button>
    </div>

    <table v-if="cart.length">
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in cart" :key="c.item_id">
          <td>{{ c.name }}</td>
          <td>{{ c.quantity }}</td>
          <td>{{ c.price }}</td>
          <td>{{ (c.price * c.quantity).toFixed(2) }}</td>
          <td>
            <button @click="removeFromCart(c.item_id)">❌</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Total: ₱{{ total.toFixed(2) }}</h2>

    <button class="pay" @click="checkout">PAY</button>

    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.pos {
  padding: 20px;
}

.scan {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.scan input {
  height: 48px;
  font-size: 1rem;
  padding: 0 12px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

.pay {
  height: 48px;
  padding: 0 20px;
  background: #3ddc97;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
}
</style>
