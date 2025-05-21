import pino from "pino"
import { env } from "@/config/envConfig"

export const logger = pino({
  level: env.isProduction ? "info" : "debug",
  transport: env.isProduction || env.isDevelopment
    ? {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "HH:MM:ss", // Show time in a short format
            ignore: "pid,hostname",    // Ignore unnecessary fields
            singleLine: true,          // Display logs in a single line
        },
      }
    : undefined,
})