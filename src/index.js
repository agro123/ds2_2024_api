import express from "express";
import cors from "cors";
//import passport from 'passport';
import { json } from "body-parser";
import router from "./routes";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from 'passport';

dotenv.config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

const jwt = new JwtStrategy(opts, (jwt_payload, done) => {
    return done(null, jwt_payload);
});

export const main = async () => {
    const app = express();
    const PORT = process.env.PORT || 35001;
    // Advertencia:  comentar esta linea cuando este deplegado front
    app.use(cors());
    //Advertencia: Descomentar cuando ya este el front delplegado (SEGURIDAD CORS)
    const FRONT_URL = process.env.FRONT_URL || 'http://127.0.0.1:5173';

    app.use((req, res, next) => {
        console.log('Origin:', req.headers.origin);
        next();
    });

    app.use(json({ limit: "50mb" }));
    app.use(
        cors({
            origin: [FRONT_URL,"http://localhost:5173", "*"],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true, // Necesario si envías cookies o autorizaciones
        })
    );
    // Manejar solicitudes preflight (OPTIONS)
    app.options("*", cors());

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 1000, // límite de 100 solicitudes por IP
    });
    app.use(limiter);

    app.use(helmet());
    app.disable("x-powered-by");

    passport.use(jwt);
    passport.initialize();

    app.use("/api/public", router.publicRouter);

    app.use(
        "/api/private",
        passport.authenticate("jwt", { session: false }),
        router.privateRouter
    );

    app.get("/", (req, res) => {
        res.send("It's working! 👏 😁");
    });

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

main();
