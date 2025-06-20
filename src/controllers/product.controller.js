import * as productService from '../services/product.service.js'

export const createProduct = async (req, res) => {
  try {
    const user = await productService.createProduct(req.body)
    return res.status(201).json(user)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await productService.getProductById(id)
    return res.status(201).json(user)
  } catch (err) {
    const status = err.status || 500
    return res.status(status).json({ message: err.message })
  }
}
