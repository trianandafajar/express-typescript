import Joi from 'joi'
import type { UserType } from '../types/user.type'

// Validasi input untuk registrasi user
export const inputUserValidation = (
  payload: UserType
): Joi.ValidationResult<UserType> => {
  const schema = Joi.object<UserType>({
    user_id: Joi.string().trim().allow(null, ''),

    email: Joi.string().trim().email().required().messages({
      'string.base': 'Email harus berupa string',
      'string.empty': 'Email tidak boleh kosong',
      'string.email': 'Email tidak valid',
      'any.required': 'Email harus diisi'
    }),

    nama: Joi.string().trim().required().messages({
      'string.base': 'Nama harus berupa string',
      'string.empty': 'Nama tidak boleh kosong',
      'any.required': 'Nama harus diisi'
    }),

    password: Joi.string().min(6).max(30).required().messages({
      'string.base': 'Password harus berupa string',
      'string.empty': 'Password tidak boleh kosong',
      'string.min': 'Password minimal 6 karakter',
      'string.max': 'Password maksimal 30 karakter',
      'any.required': 'Password harus diisi'
    }),

    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': 'Konfirmasi password tidak cocok dengan password',
      'any.required': 'Konfirmasi password harus diisi'
    }),

    role: Joi.string().trim().valid('admin', 'user').allow(null, '').messages({
      'string.base': 'Role harus berupa string',
      'any.only': 'Role hanya boleh admin atau user'
    })
  }).strict()

  return schema.validate(payload, { abortEarly: false })
}

// Validasi input untuk login user
export const loginUserValidation = (
  payload: Pick<UserType, 'email' | 'password'>
): Joi.ValidationResult<Pick<UserType, 'email' | 'password'>> => {
  const schema = Joi.object<Pick<UserType, 'email' | 'password'>>({
    email: Joi.string().trim().email().required().messages({
      'string.base': 'Email harus berupa string',
      'string.empty': 'Email tidak boleh kosong',
      'string.email': 'Email tidak valid',
      'any.required': 'Email harus diisi'
    }),

    password: Joi.string().required().messages({
      'string.base': 'Password harus berupa string',
      'string.empty': 'Password tidak boleh kosong',
      'any.required': 'Password harus diisi'
    })
  }).strict()

  return schema.validate(payload, { abortEarly: false })
}
