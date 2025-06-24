import * as orderRepo from '../repositories/order.repository.js'
import { getCartWithTotal } from '../repositories/cart.repository.js'
import { Cart } from '../models/cart.model.js'

export const createOrderFromCart = async ({ userId, cartId }) => {
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

  

  const orderData = {
    userId,
    items: orderItems,
    total: cart.total,
    status: 'paid'
  }

  const order = await orderRepo.createOrder(orderData)

  await Cart.findByIdAndUpdate(cartId, { items: [] })

  return order
}


export const getOrdersByUser = async ({userId, orderId}) => {
  
    try {
        const orderByUser = await orderRepo.getOrdersByUser(orderId)
       
        if(orderByUser?.userId.toString() === userId){
        return orderByUser
    }

     const error = new Error('unauthorized')
      error.status = 403
      throw error

    } catch (error) {
        console.error('Error en la orden:', error)
        throw error.status ? error : new Error('Hubo un problema con la orden')
    }
    
   

}
