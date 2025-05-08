import { Router } from 'express'
import barangRouter from './barang.route'
import userRouter from './user.route'
import { notFound, errorHandling } from '../controllers/error.controller'

const router = Router()

// Group all API routes under /api
router.use('/api/barang', barangRouter)
router.use('/api/user', userRouter)

// Catch-all route for 404
router.use('*', notFound)

// Centralized error handling
router.use(errorHandling)

export default router
