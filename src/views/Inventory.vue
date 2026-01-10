<script setup>
import { ref, onMounted, computed } from "vue"
import api from "../services/api"

// ✅ FIX: no trailing slash
const getItems = () => api.get("items")
const createItem = (data) => api.post("items", data)
const updateItem = (id, data) => api.put(`items/${id}`, data)
const deleteItem = (id) => api.delete(`items/${id}`)

const categories = [
  "Fruits","Vegetables","Meat","Seafood","Dairy","Beverages","Snacks","Bakery",
  "Frozen","Canned Goods","Condiments","Dry Goods","Grains & Pasta",
  "Spices & Seasonings","Breakfast & Cereal","Personal Care","Household",
  "Baby Products","Pet Supplies","Health & Wellness","Cleaning Supplies"
]

const items = ref([])
const search = ref("")
const editMode = ref(false)
const currentId = ref(null)

const form = ref({
  name: "",
  quantity: 0,
  category: "",
  price: 0,
  barcode: ""
})

const filteredItems = computed(() => {
  if (!search.value) return items.value
  const q = search.value.toLowerCase()
  return items.value.filter(
    i => i.name.toLowerCase().includes(q) || i.barcode.includes(q)
  )
})

const fetchItems = async () => {
  const res = await getItems()
  console.log("ITEMS:", res.data) // ✅ DEBUG
  items.value = res.data
}

const submitForm = async () => {
  if (editMode.value) {
    await updateItem(currentId.value, form.value)
  } else {
    await createItem(form.value)
  }
  resetForm()
  fetchItems()
}

const editItem = (item) => {
  editMode.value = true
  currentId.value = item.id
  form.value = { ...item }
}

const removeItem = async (id) => {
  if (!confirm("Delete this item?")) return
  await deleteItem(id)
  fetchItems()
}

const resetForm = () => {
  editMode.value = false
  currentId.value = null
  form.value = { name:"", quantity:0, category:"", price:0, barcode:"" }
}

onMounted(fetchItems)
</script>

<template>
  <div class="inventory">
    <h1>Inventory</h1>

    <input v-model="search" placeholder="Search by name or barcode" />

    <form @submit.prevent="submitForm">
      <input v-model="form.name" placeholder="Name" />
      <input v-model.number="form.quantity" type="number" />
      <select v-model="form.category">
        <option value="" disabled>Select category</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
      <input v-model.number="form.price" type="number" />
      <input v-model="form.barcode" placeholder="Barcode" />

      <button type="submit">
        {{ editMode ? "Update" : "Add" }}
      </button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Qty</th>
          <th>Category</th>
          <th>Price</th>
          <th>Barcode</th>
          <th>Actions</th>
        </tr>
      </thead>

      <!-- ✅ FIX: only render rows if data exists -->
      <tbody v-if="filteredItems.length">
        <tr v-for="item in filteredItems" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.barcode }}</td>
          <td>
            <button @click="editItem(item)">Edit</button>
            <button @click="removeItem(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.inventory {
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  color: #fff;
}
</style>
