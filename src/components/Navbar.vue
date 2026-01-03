<script setup>
import Menubar from "primevue/menubar"
import api from "../services/api"

const handleLogout = async () => {
  await api.post("/users/logout")
  window.location.href = "/login"
}

const items = [
  {
    label: "Home",
    icon: "pi pi-home",
    command: () => (window.location.href = "/")
  },
  {
    label: "Inventory",
    icon: "pi pi-box",
    command: () => (window.location.href = "/inventory")
  },
  {
    label: "POS",
    icon: "pi pi-shopping-cart",
    command: () => (window.location.href = "/pos")
  },
  {
    label: "Payment",
    icon: "pi pi-credit-card",
    command: () => (window.location.href = "/payment")
  },
  {
    label: "Transactions",
    icon: "pi pi-receipt",
    command: () => (window.location.href = "/transactions")
  },
  {
    label: "Analytics",
    icon: "pi pi-chart-line",
    command: () => (window.location.href = "/analytics")
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: handleLogout
  }
]
</script>

<template>
  <Menubar :model="items" />
</template>
