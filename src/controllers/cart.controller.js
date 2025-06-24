import * as cartServices from '../services/cart.service.js'

export const addProductToCart = async (req, res) => {
  try {
    const cartId = req.user.cartId
    const { productId, quantity, action } = req.body
    const updatedCart = await cartServices.addProductToCart({ cartId, productId, quantity, action })
    return res.status(201).json(updatedCart)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export const deleteItemCarts = async (req, res) => {
  try {
    const cartId = req.user.cartId
    const userId = req.user.id
    const cart = await cartServices.deleteItemsCart({ cartId, userId })
    return res.status(cart.status).json(cart?.detail)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export const getCartById = async (req, res) => {
  try {
    const cartId = req.user.cartId
    const cart = await cartServices.getCartById({ cartId })
    return res.status(201).json(cart)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}
