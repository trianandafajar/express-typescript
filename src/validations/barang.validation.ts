import Joi from 'joi'
import type { BarangType } from '../types/barang.type'

export const inputBarangValidation = (
  payload: BarangType
): Joi.ValidationResult<BarangType> => {
  const schema = Joi.object<BarangType>({
    nama: Joi.string().trim().required().messages({
      'string.base': 'Nama barang harus berupa string',
      'string.empty': 'Nama barang tidak boleh kosong',
      'any.required': 'Nama barang harus diisi'
    }),
    jumlah: Joi.number().strict().greater(0).required().messages({
      'number.base': 'Jumlah harus berupa angka',
      'number.empty': 'Jumlah tidak boleh kosong',
      'number.greater': 'Jumlah harus lebih dari 0',
      'any.required': 'Jumlah harus diisi'
    }),
    harga: Joi.number().strict().greater(0).required().messages({
      'number.base': 'Harga harus berupa angka',
      'number.empty': 'Harga tidak boleh kosong',
      'number.greater': 'Harga harus lebih dari 0',
      'any.required': 'Harga harus diisi'
    })
  }).strict()

  return schema.validate(payload, { abortEarly: false })
}
