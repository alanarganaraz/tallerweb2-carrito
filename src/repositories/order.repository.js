import { Order } from "../models/order.model.js";

export const createOrder = async(orderData) => {
    const order = new Order (orderData)
    return await order.save()
}

export const getOrdersByUser = async(orderId) => {
    return await Order.findOne({_id: orderId})
}