import * as orderService from '../services/order.service.js'

export const createOrder = async (req, res) => {
    try {
        const userId = req.user.id
        const cartId = req.user.cartId
        const { paymentMethod, cardData } = req.body

        const validPaymentMethod = ['card', 'transfer']
        if (!validPaymentMethod.includes(paymentMethod)) {
            return res.status(400).json({ error: 'Metodo de pago Invalido' })
        }
        const order = await orderService.createOrderFromCart({ userId, cartId, paymentMethod, cardData })
        return res.status(201).json(order)
    }
    catch (error) {
        console.error('Error al crear la orden:', error)
        return res.status(error.status || 400).json({ error: error.message })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const filters = req.user.id;
        const isAdmin = req.user.role;
        const obj = { filters, isAdmin }
        const orders = await orderService.getAllOrders(obj)
        return res.status(200).json(orders)
    }
    catch (error) {
        console.error('Error al obtener las órdenes:', error)
        return res.status(error.status || 400).json({ error: error.message })
    }
}

export const getAllOrdersByUser = async (req, res) => {
    try {
        const filters = req.user.id;
        const isAdmin = req.user.role;
        const orders = await orderService.getAllOrders({ filters, isAdmin })
        return res.status(200).json(orders)
    }
    catch (error) {
        console.error('Error al obtener las órdenes:', error)
        return res.status(error.status || 400).json({ error: error.message })
    }
}


export const changeOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { newOrderStatus } = req.body
        const validStatuses = ['pending', 'paid', 'expired']
        if (!validStatuses.includes(newOrderStatus)) {
            return res.status(400).json({ error: 'Estado de orden inválido' })
        }
        const orders = await orderService.updateOrderStatus({ orderId: id, newOrderStatus })

        return res.status(200).json(orders)
    }
    catch (error) {
        console.error('Error al obtener las órdenes:', error)
        return res.status(error.status || 400).json({ error: error.message })
    }
}

export const getOrderByUser = async (req, res) => {
    try {
        const userId = req.user.id
        console.log(req.user, 'requser');
        
        const orderId = req.params.id
        const orders = await orderService.getOrdersByUser({ userId, orderId })

        return res.status(200).json(orders)
    }
    catch (error) {
        console.error('Error al obtener las órdenes:', error)
        return res.status(error.status || 400).json({ error: error.message })
    }
}

