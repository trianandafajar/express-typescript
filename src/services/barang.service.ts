import type { BarangType } from '../types/barang.type'
import prisma from '../utils/client'

// Ambil semua barang
export const getBarang = async (): Promise<BarangType[]> => {
  const barang = await prisma.barang.findMany()
  return barang
}

// Ambil barang berdasarkan ID
export const getBarangById = async (id: number): Promise<BarangType | null> => {
  const barang = await prisma.barang.findUnique({ where: { id } })
  return barang
}

// Insert barang baru
export const insertBarang = async (payload: BarangType): Promise<BarangType> => {
  const barang = await prisma.barang.create({ data: payload })
  return barang
}

// Update barang
export const updateBarang = async (payload: BarangType): Promise<BarangType> => {
  const barang = await prisma.barang.update({
    where: { id: payload.id },
    data: { ...payload }
  })
  return barang
}

// Hapus barang
export const deleteBarang = async (id: number): Promise<BarangType> => {
  const barang = await prisma.barang.delete({ where: { id } })
  return barang
}
