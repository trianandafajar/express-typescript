import { Router } from 'express'
import barangRouter from './barang.route'
import userRouter from './user.route' // Typo sebelumnya: 'user.router' harusnya 'user.route'
import { errorHandling, notFound } from '../controllers/error.controller'

const router = Router()

// Prefix semua API dengan '/api'
router.use('/api/barang', barangRouter) // Langsung '/api/barang'
router.use('/api/user', userRouter)     // Langsung '/api/user'

// Error handler
router.use('*', notFound)
router.use(errorHandling)

export default router
