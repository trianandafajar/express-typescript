import type { UserType } from '../types/user.type'
import prisma from '../utils/client'

// Service untuk membuat user baru
export const createUser = async (payload: UserType): Promise<UserType> => {
  const user = await prisma.user.create({
    data: {
      ...payload
    }
  })
  return user
}

// Service untuk login (mencari user berdasarkan email)
export const userLogin = async (
  payload: UserType
): Promise<UserType | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  })
  return user
}
