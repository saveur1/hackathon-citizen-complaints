import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { openAPIRouter } from "@/api-docs/openAPIRouter";
import errorHandler from "@/middleware/errorHandler";
import rateLimiter from "@/middleware/rateLimiter";
import { env } from "@/config/envConfig";
import path from "path";

// Import routes
import authRoutes from "@/routes/auth/auth.routes"
import complaintRoutes from "@/routes/complaint/complaint.routes"
import responseRoutes from "@/routes/response/response.routes"
import agencyRoutes from "@/routes/agency/agency.routes"
import userRoutes from "@/routes/user/user.routes"
const logger = pino({ name: "server start" });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(helmet());
// app.use(rateLimiter);

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/complaints", complaintRoutes)
app.use("/api/responses", responseRoutes)
app.use("/api/agencies", agencyRoutes)
app.use("/api/users", userRoutes)

// Swagger UI
app.use("/api/docs", openAPIRouter);

if(env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(path.join(__dirname,"../frontend/dist/index.html")));
    })
}

// Error handlers
app.use(errorHandler());
export { app, logger };
