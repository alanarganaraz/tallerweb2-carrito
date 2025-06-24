import * as orderService from '../services/order.service.js'

export const createOrder = async (req, res) => {
    try{
        const userId = req.user.id
        const cartId = req.user.cartId

        const order = await orderService.createOrderFromCart({userId, cartId})
       
        return res.status(201).json(order)
    }
    catch (error) {
         console.error('Error al crear la orden:', error)
        return res.status(error.status || 400).json({error: error.message})
    }
}

export const getOrderByUser = async (req, res) => {
    try{
       
        const userId = req.user.id
        const orderId = req.params.id
        const orders = await orderService.getOrdersByUser({userId , orderId})

        return res.status(200).json(orders)
    }
    catch(error) {
        console.error('Error al obtener las órdenes:', error)
        return res.status(error.status || 400).json({ error: error.message })
    }
}

