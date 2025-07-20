import express from 'express'
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });
import { createProduct, getAllProducts, getProductById } from '../controllers/product.controller.js'
import { apiKeyMiddleware } from '../middlewares/apikey.js'

const router = express.Router()

router.post('/', apiKeyMiddleware, upload.single('image'), createProduct);
router.get('/', apiKeyMiddleware, getAllProducts)
router.get('/:id', apiKeyMiddleware, getProductById)

export default router
