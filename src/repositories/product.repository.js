import { Product } from '../models/product.model.js'

export const createProduct = (productData) => Product.create(productData)
export const getProductById = (id) => Product.findById(id)
export const getAllProducts = (filters) => {
   const query = {
    stock: { $gt: 0 }
  };

  if (filters.name) {
    query.name = { $regex: filters.name, $options: 'i' };
  }

  if (filters.category) {
    query.category = filters.category;
  }

  return Product.find(query).sort({ createdAt: -1 });
};

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
