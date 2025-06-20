import { Cart } from '../models/cart.model.js'

export const addProductToCart = async (cartId, productId, quantity) => {
  const cart = await Cart.findById(cartId)

  if (!cart) throw new Error('Carrito no encontrado')

  const existingItem = cart.items.find(item => item.productId.equals(productId))

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.items.push({ productId, quantity })
  }

  return await cart.save()
}


export const getCartWithTotal = async (cartId) => {
  const cart = await Cart.findById(cartId).populate('items.productId')

  if (!cart) throw new Error('Carrito no encontrado')

  let total = 0

  const itemsWithPrice = cart.items.map(item => {
    const product = item.productId
    const quantity = item.quantity
    const subtotal = product.price * quantity
    total += subtotal

    return {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      subtotal
    }
  })

  return {
    cartId: cart._id,
    items: itemsWithPrice,
    total
  }
}

export const removeProductToCart = async (cartId, productId, quantityToRemove) => {
  const cart = await Cart.findById(cartId)

  if (!cart) throw new Error('Carrito no encontrado')

  const existingItem = cart.items.find(item => item.productId.equals(productId))

  if (!existingItem) throw new Error('Producto no encontrado en el carrito')

  if (existingItem.quantity <= quantityToRemove) {
    cart.items = cart.items.filter(item => !item.productId.equals(productId))
  } else {
    existingItem.quantity -= quantityToRemove
  }

  return await cart.save()
}

export const createCart = () => Cart.create({ items: [] })