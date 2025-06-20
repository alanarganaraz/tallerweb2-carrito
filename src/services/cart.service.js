import { addProductToCart as addProductToCartRepo, getCartWithTotal, removeProductToCart } from '../repositories/cart.repository.js'
import { getProductById } from '../repositories/product.repository.js'
import { decreaseProductStock, increaseProductStock } from './product.service.js'

export const getCartById = async ({ cartId }) => {
  try {
     return await getCartWithTotal(cartId)
  } catch (error) {
    console.error('Error a obtener el carrito:', error)
    throw error.status ? error : new Error('Hubo un problema obteniendo el carrito')
  }
}

export const addProductToCart = async ({ cartId, productId, quantity, action }) => {
  try {
    const product = await getProductById(productId)

    if (!product) {
      const error = new Error('Producto no encontrado')
      error.status = 404
      throw error
    }
    const totalProductIfRemove = quantity + product.stock;

    if (action === 'add' && product.stock < quantity) {
      const error = new Error('Stock insuficiente')
      error.status = 400
      throw error
    }

    if (action === 'remove' && product.originalStock < totalProductIfRemove) {
      const error = new Error('Error de stock')
      error.status = 400
      throw error
    }

    if (action === 'add') {
      const decreaseProduct = await decreaseProductStock(productId, quantity);
      if (decreaseProduct?.id) {
        await addProductToCartRepo(cartId, productId, quantity)
        return await getCartWithTotal(cartId)

      }
    }

    if (action === 'remove') {
      const increaseProduct = await increaseProductStock(productId, quantity);
      if (increaseProduct?.id) {
        await removeProductToCart(cartId, productId, quantity)
        return await getCartWithTotal(cartId)
      }
    }
    throw new Error('Hubo un problema con el carrito')

  } catch (error) {
    console.error('Error en el carrito:', error)
    throw error.status ? error : new Error('Hubo un problema con el carrito')
  }
}
