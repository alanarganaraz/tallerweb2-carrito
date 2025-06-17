import * as authService from '../services/auth.service.js'

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const data = await authService.login(req.body)
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
