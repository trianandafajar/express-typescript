import joi from 'joi'
import type { BarangType } from '../types/barang.type'

export const inputBarangValidation = (
  payload: BarangType
): joi.ValidationResult<BarangType> => {
  const schema = joi
    .object({
      nama: joi.string().trim().required().messages({
        'string.base': 'Barang harus berupa string',
        'string.empty': 'Barang tidak boleh kosong',
        'any.required': 'Barang harus diisi'
      }),
      jumlah: joi.number().strict().greater(0).required().messages({
        'number.base': 'Jumlah harus berupa angka',
        'number.empty': 'Jumlah tidak boleh kosong',
        'number.greater': 'Jumlah harus lebih dari 0',
        'any.required': 'Jumlah harus diisi'
      }),
      harga: joi.number().strict().greater(0).required().messages({
        'number.base': 'Harga harus berupa angka',
        'number.empty': 'Harga tidak boleh kosong',
        'number.greater': 'Harga harus lebih dari 0',
        'any.required': 'Harga harus diisi'
      })
    })
    .strict()

  return schema.validate(payload, { abortEarly: false })
}
