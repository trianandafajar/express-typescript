export default interface UserType {
  user_id: string
  email: string
  nama: string
  password: string // hashed password
  role: string
  created_at?: Date
  updated_at?: Date
}
