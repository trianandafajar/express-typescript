import { Router } from 'express'
import {
  registerUser,
  loginUser,
  refreshToken
} from '../controllers/user.controller'

const router = Router()

/**
 * @route   POST /api/user/register
 * @desc    Register new user
 */
router.post('/register', registerUser)

/**
 * @route   POST /api/user/login
 * @desc    Login user
 */
router.post('/login', loginUser)

/**
 * @route   GET /api/user/refresh
 * @desc    Refresh access token
 */
router.get('/refresh', refreshToken)

export default router
