import { Decimal } from '@prisma/client/runtime/library'

export interface BarangType {
  id: number
  nama: string
  jumlah: number
  harga: Decimal | number // fleksibel, tergantung apakah digunakan di backend/frontend
  created_at?: Date | string
  updated_at?: Date | string
}

export default BarangType
