<script setup>
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import api from "../services/api"

const router = useRouter()
const route = useRoute()

const isOpen = ref(false)

const tabs = [
  { label: "Home", path: "/", icon: "pi pi-home" },
  { label: "Inventory", path: "/inventory", icon: "pi pi-box" },
  { label: "POS", path: "/pos", icon: "pi pi-shopping-cart" },
  { label: "Payment", path: "/payment", icon: "pi pi-credit-card" },
  { label: "Transactions", path: "/transactions", icon: "pi pi-receipt" },
  { label: "Analytics", path: "/analytics", icon: "pi pi-chart-line" }
]

const navigate = (path) => {
  isOpen.value = false
  router.push(path)
}

const handleLogout = async () => {
  try {
    await api.post("/users/logout")
  } finally {
    isOpen.value = false
    router.push("/login")
  }
}
</script>

<template>
  <nav class="folder-nav">
    <!-- MOBILE HAMBURGER -->
    <button class="hamburger mobile" @click="isOpen = !isOpen">
      <i class="pi pi-bars" />
    </button>

    <!-- DESKTOP TABS -->
    <div class="tabs desktop">
      <button
        v-for="tab in tabs"
        :key="tab.path"
        class="tab"
        :class="{ active: route.path === tab.path }"
        @click="navigate(tab.path)"
      >
        <i :class="tab.icon" />
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <div class="spacer"></div>

    <!-- DESKTOP LOGOUT -->
    <button class="logout desktop" @click="handleLogout">
      <i class="pi pi-sign-out" />
    </button>

    <!-- BACKDROP -->
    <div
      v-if="isOpen"
      class="backdrop"
      @click="isOpen = false"
    ></div>

    <!-- MOBILE MENU -->
    <div v-if="isOpen" class="mobile-menu">
      <button
        v-for="tab in tabs"
        :key="tab.path"
        class="mobile-item"
        :class="{ active: route.path === tab.path }"
        @click="navigate(tab.path)"
      >
        <i :class="tab.icon" />
        <span>{{ tab.label }}</span>
      </button>

      <button class="mobile-item logout-item" @click="handleLogout">
        <i class="pi pi-sign-out" />
        Logout
      </button>
    </div>
  </nav>
</template>

<style scoped>
/* NAVBAR */
.folder-nav {
  display: flex;
  align-items: flex-end;
  padding: 0 8px;
  height: 40px;
  background-color: #1e1e1e;
  position: relative;
  z-index: 101;
}

/* COVER STRIP */
.folder-nav::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background-color: #242424;
}

/* DESKTOP TABS */
.tabs {
  display: flex;
  gap: 4px;
}

.tab {
  min-width: 96px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: #2a2a2a;
  color: #cfcfcf;
  border: 1px solid #333;
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  cursor: pointer;
  font-size: 0.8rem;
}

.tab.active {
  background-color: #242424;
  color: #ffffff;
  border-color: #2f2f2f;
}

/* SPACER */
.spacer {
  flex: 1;
}

/* LOGOUT */
.logout {
  height: 28px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #ff6b6b;
  border: 1px solid #444;
  border-radius: 6px;
  cursor: pointer;
}

/* HAMBURGER */
.hamburger {
  height: 32px;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #cfcfcf;
  border: 1px solid #444;
  border-radius: 6px;
  cursor: pointer;
}

/* BACKDROP */
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 99;
}

/* MOBILE MENU */
.mobile-menu {
  position: fixed;
  top: 40px;
  left: 8px;
  width: 220px;
  background-color: #1e1e1e;
  border: 1px solid #333;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.mobile-item {
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  color: #cfcfcf;
  border: none;
  text-align: left;
  cursor: pointer;
}

.mobile-item:hover {
  background-color: #2a2a2a;
}

.mobile-item.active {
  background-color: #242424;
  color: #ffffff;
}

.logout-item {
  color: #ff6b6b;
}

/* RESPONSIVE */
.desktop {
  display: flex;
}

.mobile {
  display: none;
}

@media (max-width: 768px) {
  .folder-nav {
    align-items: center;
  }

  .desktop {
    display: none;
  }

  .mobile {
    display: flex;
  }
}
</style>
