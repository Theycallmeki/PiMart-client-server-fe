import { createRouter, createWebHistory } from "vue-router"
import api from "../services/api"

import Login from "../views/Login.vue"
import Home from "../views/Home.vue"
import Inventory from "../views/Inventory.vue"
import POS from "../views/POS.vue"
import Payment from "../views/Payment.vue"
import Analytics from "../views/Analytics.vue"
import TransactionHistory from "../views/TransactionHistory.vue"

const routes = [
  { path: "/login", component: Login, meta: { public: true } },

  { path: "/", component: Home },
  { path: "/inventory", component: Inventory },
  { path: "/pos", component: POS },
  { path: "/payment", component: Payment },
  { path: "/analytics", component: Analytics },
  { path: "/transactions", component: TransactionHistory }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔒 in-memory auth cache
let isAuthenticated = false
let authChecked = false

router.beforeEach(async (to, from, next) => {
  if (to.meta.public) return next()

  // ✅ already checked → instant
  if (authChecked && isAuthenticated) {
    return next()
  }

  try {
    await api.get("/users/me")
    isAuthenticated = true
    authChecked = true
    next()
  } catch {
    isAuthenticated = false
    authChecked = true
    next("/login")
  }
})

export default router
