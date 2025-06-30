import { createProduct as createProductRepo, getProductById as getProductByIdRepo, getAllProducts as getAllProductsRepo } from '../repositories/product.repository.js'

export const createProduct = async (productData) => {
  try {
    const product = await createProductRepo(productData)
    return { id: product._id, name: product.name }
  } catch (error) {
    console.error('Error al crear el producto:', error)

    if (error.name === 'ValidationError') {
      const customError = new Error('Datos inválidos para crear el producto')
      customError.status = 400
      throw customError
    }

    if (error.code === 11000) {
      const customError = new Error('Producto duplicado')
      customError.status = 409
      throw customError
    }

    throw new Error('No se pudo crear el producto')
  }
}

export const getProductById = async (productData) => {
  try {
    const product = await getProductByIdRepo(productData)
    
    if (product) {
      return { product }
    }

    const error = new Error('Producto inexistente')
    error.status = 404
    throw error

  } catch (error) {
    console.error('Error al obtener el producto:', error)
    throw error.status ? error : new Error('No se pudo obtener el producto')
  }
}

export const getAllProducts = async () => {
  try {
    const product = await getAllProductsRepo()
    
    if (product) {
      return { product }
    }

    const error = new Error('Producto inexistente')
    error.status = 404
    throw error

  } catch (error) {
    console.error('Error al obtener el producto:', error)
    throw error.status ? error : new Error('No se pudo obtener el producto')
  }
}

export const increaseProductStock = async (productId, quantity) => {
  try {
    const product = await getProductByIdRepo(productId)

    if (!product) {
      const error = new Error('Producto inexistente')
      error.status = 404
      throw error
    }
    product.stock += quantity

    await product.save()

    return { id: product._id, name: product.name, stock: product.stock }
  } catch (error) {
    console.error('Error al aumentar el stock:', error)

    if (error.status) {
      throw error
    }

    throw new Error('No se pudo aumentar el stock')
  }
}

export const decreaseProductStock = async (productId, quantity) => {
  try {
    const product = await getProductByIdRepo(productId)

    if (!product) {
      const error = new Error('Producto inexistente')
      error.status = 404
      throw error
    }

    if (product.stock < quantity) {
      const error = new Error('No hay suficiente stock disponible')
      error.status = 400
      throw error
    }

    product.stock -= quantity

    await product.save()

    return { id: product._id, name: product.name, stock: product.stock }
  } catch (error) {
    console.error('Error al disminuir el stock:', error)

    if (error.status) {
      throw error
    }

    throw new Error('No se pudo disminuir el stock')
  }
}
