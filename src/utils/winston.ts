import winston from 'winston'
import 'winston-daily-rotate-file'
import path from 'path'

// Path folder log yang fleksibel
const logDirectory = path.join(process.cwd(), 'logs')

// Konfigurasi transport untuk Daily Rotate File
const dailyRotateTransport = new winston.transports.DailyRotateFile({
  filename: path.join(logDirectory, 'app-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '1m',
  maxFiles: '14d',
  level: 'error',
  handleExceptions: true
})

// Tambahkan satu file log utama yang tidak di-rotate
const mainFileTransport = new winston.transports.File({
  filename: path.join(logDirectory, 'app.log'),
  level: 'info'
})

// Winston logger configuration
export const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
    winston.format.label({ label: '[LOGGER]' }),
    winston.format.printf(
      (info) =>
        `${info.label} ${info.timestamp} ${info.level.toUpperCase()} : ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      level: 'silly',
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.simple()
      )
    }),
    dailyRotateTransport,
    mainFileTransport
  ],
  exitOnError: false // Agar tidak crash saat error
})

// Handle Uncaught Exceptions & Unhandled Promise Rejections
process.on('uncaughtException', (error) => {
  logger.error(`Uncaught Exception: ${error.message}`)
  process.exit(1) // Bisa diubah ke 0 agar tidak crash
})

process.on('unhandledRejection', (reason) => {
  logger.error(`Unhandled Rejection: ${reason}`)
})
