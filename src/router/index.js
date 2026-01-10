import { createRouter, createWebHistory } from "vue-router"

import Login from "../views/Login.vue"
import Home from "../views/Home.vue"
import Inventory from "../views/Inventory.vue"
import POS from "../views/POS.vue"
import Payment from "../views/Payment.vue"
import TransactionHistory from "../views/TransactionHistory.vue"

import DemandForecast from "../views/DemandForecast.vue"
import ItemMovement from "../views/ItemMovement.vue"
import StockoutRisk from "../views/StockoutRisk.vue"

const routes = [
  { path: "/login", component: Login },

  { path: "/", component: Home },
  { path: "/inventory", component: Inventory },
  { path: "/pos", component: POS },
  { path: "/payment", component: Payment },
  { path: "/transactions", component: TransactionHistory },

  // Analytics
  { path: "/analytics/demand", component: DemandForecast },
  { path: "/analytics/movement", component: ItemMovement },
  { path: "/analytics/stockout", component: StockoutRisk }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
