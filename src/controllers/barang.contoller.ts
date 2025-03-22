import { type NextFunction, type Request, type Response } from 'express'
import { inputBarangValidation } from '../validations/barang.validation'
import {
  deleteBarang,
  getBarang,
  getBarangById,
  insertBarang,
  updateBarang
} from '../services/barang.service'

// Helper untuk menangani error dengan lebih rapi
const handleError = (error: unknown, functionName: string, next: NextFunction) => {
  next(new Error(`Error di barang.controller.ts -> ${functionName}: ${String((error as Error).message)}`))
}

// Mendapatkan semua barang
export const getAllBarang = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getBarang()
    if (!data.length) {
      return res.status(404).json({ error: null, message: 'Data barang kosong', data: [] })
    }
    return res.status(200).json({ error: null, message: 'Pengambilan semua data berhasil', data })
  } catch (error) {
    handleError(error, 'getAllBarang', next)
  }
}

// Mendapatkan barang berdasarkan ID
export const getDataBarangById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ error: 'ID tidak valid', message: 'Gagal mengambil data', data: null })

    const barang = await getBarangById(id)
    if (!barang) return res.status(404).json({ error: null, message: 'Barang tidak ditemukan', data: null })

    return res.status(200).json({ error: null, message: 'Pengambilan data sukses', data: barang })
  } catch (error) {
    handleError(error, 'getDataBarangById', next)
  }
}

// Menambahkan barang baru
export const insertDataBarang = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = inputBarangValidation(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message, message: 'Input data gagal', data: null })

    const barang = await insertBarang(value)
    return res.status(201).json({ error: null, message: 'Input data sukses', data: barang })
  } catch (error) {
    handleError(error, 'insertDataBarang', next)
  }
}

// Mengupdate data barang
export const updateDataBarang = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ error: 'ID tidak valid', message: 'Update data gagal', data: null })

    const { error, value } = inputBarangValidation(req.body)
    if (error) return res.status(400).json({ error: error.details[0].message, message: 'Update data gagal', data: null })

    const updatedData = await updateBarang({ ...value, id })
    if (!updatedData) return res.status(404).json({ error: null, message: 'Barang tidak ditemukan', data: null })

    return res.status(200).json({ error: null, message: 'Update data sukses', data: updatedData })
  } catch (error) {
    handleError(error, 'updateDataBarang', next)
  }
}

// Menghapus barang
export const deleteDataBarang = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    if (isNaN(id)) return res.status(400).json({ error: 'ID tidak valid', message: 'Hapus data gagal', data: null })

    const deletedData = await deleteBarang(id)
    if (!deletedData) return res.status(404).json({ error: null, message: 'Barang tidak ditemukan', data: null })

    return res.status(200).json({ error: null, message: 'Delete data sukses', data: deletedData })
  } catch (error) {
    handleError(error, 'deleteDataBarang', next)
  }
}
