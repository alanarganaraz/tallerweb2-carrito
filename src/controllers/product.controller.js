import * as productService from '../services/product.service.js'

export const createProduct = async (req, res) => {
  try {
    let base64Image = null;
    
   
    if (req.file) {
      base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    }

    const productData = {
      ...req.body,
      imageUrl: base64Image 
    };

    const product = await productService.createProduct(productData);

    return res.status(201).json(product);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    return res.status(200).json(product);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message });
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const filters = req.query;
    const products = await productService.getAllProducts(filters);
    return res.status(200).json(products);
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ message: err.message });
  }
}