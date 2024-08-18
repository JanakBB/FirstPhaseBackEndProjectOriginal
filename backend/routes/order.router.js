import express from "express";
import {
  addOrder,
  changeOrderStatus,
  getMyOrders,
  getOrderById,
  getOrders,
} from "../controller/order.controller.js";
import { checkAdmin, checkAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getOrders);
router.post("/addorder", checkAuth, addOrder);
router.get("/myorders", checkAuth, getMyOrders);
router.get("/:id", checkAuth, getOrderById);
router.put("/:id/changestatus", checkAuth, checkAdmin, changeOrderStatus)

export default router;
