import express from 'express'
import { createProduct, getProductById } from '../controllers/product.controller.js'
import { apiKeyMiddleware } from '../middlewares/apikey.js'

const router = express.Router()

router.post('/', apiKeyMiddleware, createProduct)
router.get('/:id', apiKeyMiddleware, getProductById)

export default router
