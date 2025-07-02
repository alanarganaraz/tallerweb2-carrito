import { Order } from "../models/order.model.js";

export const createOrder = async(orderData) => {
    const order = new Order (orderData)
    return await order.save()
}

export const getOrdersByUser = async(orderId) => {
    return await Order.findOne({_id: orderId})
}

export const updateOrderStatusById = async (orderId, newStatus) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { status: newStatus },
    { new: true }
  )
}

export const getAllOrders = async (filters) => {
  const query = {};

  if (filters.id) {
    query._id = filters.id;
  }

  return await Order.find(query);
};