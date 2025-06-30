import { Product } from '../models/product.model.js'

export const createProduct = (productData) => Product.create(productData)
export const getProductById = (id) => Product.findById(id)
export const getAllProducts = () => Product.find()
export const decreaseProductStock = async (productId, quantity) => {
  return Product.findByIdAndUpdate(
    productId,
    { $inc: { stock: -quantity } },
    { new: true }
  )
}

export const increaseProductStock = async (productId, quantity) => {
  return Product.findByIdAndUpdate(
    productId,
    { $inc: { stock: quantity } },
    { new: true }
  )
}
