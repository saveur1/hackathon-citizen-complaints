import dotenv from "dotenv";
import { cleanEnv, host, num, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
    NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
    HOST: host({ devDefault: testOnly("localhost") }),
    PORT: port({ devDefault: testOnly(3000) }),
    MONGODB_URI: str({ desc: "MongoDB connection string" }),
    JWT_SECRET: str({ desc: "Secret key for JWT" }),
    JWT_EXPIRES_IN: str({ default: "1d", desc: "JWT expiration time" }),
    CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:3000") }),
    COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
    COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
    // Email service configuration
    // SMTP_HOST: str({ desc: "SMTP host for email service" }),
    // SMTP_PORT: num({ desc: "SMTP port for email service" }),
    // SMTP_USER: str({ desc: "SMTP username" }),
    // SMTP_PASS: str({ desc: "SMTP password" }),
    // SMTP_FROM: str({ desc: "Email sender address" }),
    // RESET_PASSWORD_EXPIRES_IN: str({ default: "1h", desc: "Password reset token expiration time" }),
});
