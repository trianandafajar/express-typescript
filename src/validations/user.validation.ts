import type { UserType } from '../types/user.type'
import joi from 'joi'

// Validasi input untuk registrasi user
export const inputUserValidation = (
  payload: UserType
): joi.ValidationResult<UserType> => {
  const schema = joi
    .object({
      user_id: joi.string().trim().allow(null, ''),

      email: joi.string().trim().email().required().messages({
        'string.base': 'Email harus berupa string',
        'string.empty': 'Email tidak boleh kosong',
        'string.email': 'Email tidak valid',
        'any.required': 'Email harus diisi'
      }),

      nama: joi.string().trim().required().messages({
        'string.base': 'Nama harus berupa string',
        'string.empty': 'Nama tidak boleh kosong',
        'any.required': 'Nama harus diisi'
      }),

      password: joi.string().min(6).max(30).required().messages({
        'string.base': 'Password harus berupa string',
        'string.empty': 'Password tidak boleh kosong',
        'string.min': 'Password minimal 6 karakter',
        'string.max': 'Password maksimal 30 karakter',
        'any.required': 'Password harus diisi'
      }),

      confirmPassword: joi
        .string()
        .valid(joi.ref('password'))
        .required()
        .messages({
          'any.only': 'Konfirmasi password tidak cocok dengan password',
          'any.required': 'Konfirmasi password harus diisi'
        }),

      role: joi.string().trim().valid('admin', 'user').allow(null, '').messages({
        'string.base': 'Role harus berupa string',
        'any.only': 'Role hanya boleh admin atau user'
      })
    })
    .strict()

  return schema.validate(payload, { abortEarly: false })
}

// Validasi input untuk login user
export const loginUserValidation = (
  payload: UserType
): joi.ValidationResult<UserType> => {
  const schema = joi
    .object({
      email: joi.string().trim().email().required().messages({
        'string.base': 'Email harus berupa string',
        'string.empty': 'Email tidak boleh kosong',
        'string.email': 'Email tidak valid',
        'any.required': 'Email harus diisi'
      }),

      password: joi.string().required().messages({
        'string.base': 'Password harus berupa string',
        'string.empty': 'Password tidak boleh kosong',
        'any.required': 'Password harus diisi'
      })
    })
    .strict()

  return schema.validate(payload, { abortEarly: false })
}
