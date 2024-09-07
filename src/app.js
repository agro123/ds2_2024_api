import express from "express";
import cors from "cors";
//import passport from 'passport';
import { json } from "body-parser";
import router from "./routes";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const main = async () => {
    const app = express();
    const PORT = process.env.PORT || 35001;
    const FRONT_URL = process.env.FRONT_URL || '';

    app.use(json({ limit: "50mb" }));
    app.use(
        cors({
            origin: [FRONT_URL,"http://localhost:5173", "*"],
        })
    );

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 100, // límite de 100 solicitudes por IP
    });
    app.use(limiter);

    app.use(helmet());
    app.disable("x-powered-by");

    /* passport.use(jwt)
    passport.initialize() */

    app.use("/api/public", cors(), json(), router);

    app.use("/api/private", cors(), json(), router);

    app.get("/", (req, res) => {
        res.send("This is working!");
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

main();
