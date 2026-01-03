<script setup>
import { ref, onMounted } from "vue"
import api from "../services/api"
import { Chart } from "chart.js/auto"

const forecast = ref(null)
const canvas = ref(null)
let chart = null

const load = async () => {
  forecast.value = (await api.get("/ml/forecast")).data
  render()
}

const run = async () => {
  await api.post("/ml/forecast")
  load()
}

const render = () => {
  if (!forecast.value || !canvas.value) return
  if (chart) chart.destroy()

  chart = new Chart(canvas.value, {
    type: "line",
    data: {
      labels: forecast.value.tomorrow.map(f => f.category),
      datasets: [
        {
          label: "Tomorrow",
          data: forecast.value.tomorrow.map(f => f.predicted_quantity)
        },
        {
          label: "Next 7 Days",
          data: forecast.value.next_7_days.map(f => f.predicted_quantity)
        },
        {
          label: "Next 30 Days",
          data: forecast.value.next_30_days.map(f => f.predicted_quantity)
        }
      ]
    }
  })
}

onMounted(load)
</script>

<template>
  <div class="page">
    <h1>Demand Forecast</h1>
    <button @click="run">Run Model</button>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<style scoped>
canvas {
  margin-top: 20px;
  height: 420px;
}
</style>
