import { API_KEY, ADMIN_API_KEY } from '../config/env.js'

export const apiKeyMiddleware = (req, res, next) => {
  const key = req.headers['x-api-key']

  if (!key) {
    return res.status(401).json({ error: 'Missing API key' })
  }

  if (key === ADMIN_API_KEY) {
    req.isAdminRequest = true
    return next()
  }

  if (key === API_KEY) {
    req.isAdminRequest = false
    return next()
  }

  return res.status(401).json({ error: 'Invalid API key' })
}