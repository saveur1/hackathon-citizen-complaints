import mongoose from "mongoose"
import { env } from "@/config/envConfig"
import { logger } from "@/config/logger"

export async function connectToDatabase(): Promise<void> {
    try {
        await mongoose.connect(env.MONGODB_URI)
        logger.info("Connected to MongoDB")
    } catch (error) {
        logger.error("Failed to connect to MongoDB", error)
        process.exit(1)
    }
}

mongoose.connection.on("disconnected", () => {
    logger.warn("Disconnected from MongoDB")
})

mongoose.connection.on("error", (err) => {
    logger.error("MongoDB connection error", err)
})

// Close the Mongoose connection when the Node process ends
process.on("SIGINT", async () => {
    await mongoose.connection.close()
    logger.info("MongoDB connection closed due to app termination")
    process.exit(0)
})
