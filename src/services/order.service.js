import * as orderRepo from '../repositories/order.repository.js'
import { getCartWithTotal } from '../repositories/cart.repository.js'
import { Cart } from '../models/cart.model.js'
import { findUserById } from '../repositories/user.repository.js'
import { validateCreditCard } from '../utils/index.js'

export const createOrderFromCart = async ({ userId, cartId, paymentMethod, cardData }) => {
  const cart = await getCartWithTotal(cartId)

  if (!cart || cart.items.length === 0) {
    const error = new Error('Carrito vacío')
    error.status = 400
    throw error
  }

  const orderItems = cart.items.map(item => ({
    productId: item.productId._id,
    quantity: item.quantity,
    price: item.productId.price
  }))

  let orderData;
  switch (paymentMethod) {
    case 'card':
      const validateCreditCardResponse = await validateCreditCard(cardData);

      if (!validateCreditCardResponse) {
        const error = new Error('Tarjeta Inválida')
        error.status = 400
        throw error
      }
      orderData = {
        userId,
        items: orderItems,
        paymentMethod,
        total: cart.total,
        status: 'paid'
      }
      break
    case 'transfer':
      orderData = {
        userId,
        items: orderItems,
        paymentMethod,
        total: cart.total,
        status: 'pending'
      }
  }

  const order = await orderRepo.createOrder(orderData)
  const user = await findUserById(userId)

  await Cart.findByIdAndUpdate(cartId, { items: [] })

  return {
    ...order.toObject?.() ?? order,
    transferData: paymentMethod === 'transfer'
      ? {
        alias: "lunabrune.mp",
        cvu: "0000003100001234567890",
        fullName: "Luna Brunella",
        cuil: "20-12345678-9"
      }
      : null,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone
    }
  }

}

export const getAllOrders = async (filters) => {
  try {
    const getAllOrders = await orderRepo.getAllOrders(filters)

    if (!getAllOrders) {
      const error = new Error('Fallo en ordenes')
      error.status = 400
      throw error
    }

    return getAllOrders
  } catch (error) {
    console.error('Error al obtener todas las ordenes:', error)
    throw error.status ? error : new Error('Hubo un problema al obtener todas las ordenes')
  }
}

export const updateOrderStatus = async ({ orderId, newOrderStatus }) => {
  try {
    const updatedOrder = await orderRepo.updateOrderStatusById(orderId, newOrderStatus)

    if (!updatedOrder) {
      const error = new Error('Orden no encontrada')
      error.status = 404
      throw error
    }

    return updatedOrder
  } catch (error) {
    console.error('Error al actualizar estado de la orden:', error)
    throw error.status ? error : new Error('Hubo un problema al actualizar la orden')
  }
}

export const getOrdersByUser = async ({ userId, orderId }) => {
  try {
    const orderByUser = await orderRepo.getOrdersByUser(orderId)
    const user = await findUserById(userId)

    if (orderByUser?.userId.toString() === userId || user.role === 'admin') {
      return {
        ...orderByUser.toObject?.() ?? orderByUser,

        transferData: orderByUser?.paymentMethod === 'transfer'
          ? {
            alias: "lunabrune.mp",
            cvu: "0000003100001234567890",
            fullName: "Luna Brunella",
            cuil: "20-12345678-9"
          }
          : null,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone
        }
      }
    }
    const error = new Error('unauthorized')
    error.status = 403
    throw error

  } catch (error) {
    console.error('Error en la orden:', error)
    throw error.status ? error : new Error('Hubo un problema con la orden')
  }

}
