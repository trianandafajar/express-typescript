import { Router } from 'express'
import {
  loginUser,
  refreshToken,
  registerUser
} from '../controllers/user.controller'

const userRouter = Router()

// POST /api/user/register
userRouter.post('/register', registerUser)

// POST /api/user/login
userRouter.post('/login', loginUser)

// GET /api/user/refresh
userRouter.get('/refresh', refreshToken)

export default userRouter
