import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'


export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token requerido' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log(decoded, 'DECODEEED');
    
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' })
  }
}
