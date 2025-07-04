import { Order } from "../models/order.model.js";

export const createOrder = async (orderData) => {
  const order = new Order(orderData)
  return await order.save()
}

export const getOrdersByUser = async (orderId) => {
  return await Order.findById({ _id: orderId }).populate('items.productId').exec()
}

export const updateOrderStatusById = async (orderId, newStatus) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { status: newStatus },
    { new: true }
  )
}

export const getAllOrders = async (obj) => {
  try {
    const query = {};
  
    if (obj.isAdmin === 'admin') {
      return await Order.find().sort({ createdAt: -1 });
    }

    if (obj.filters) {
      query.userId = obj.filters;
      return await Order.find(query).sort({ createdAt: -1 });
    }
  } catch (error) {
    throw error.status ? error : new Error('Hubo un problema al obtener la orden por ID de usuario')
  }

};