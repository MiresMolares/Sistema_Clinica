import express from "express";
import cors from "cors";

// Import das Rotas
import authRoute from "./routes/authRoute.js";
import usuarioRoute from "./routes/usuarioRoute.js";
import pacienteRoute from "./routes/pacienteRoute.js";
import especialidadeRoute from "./routes/especialidadeRoute.js";
import medicoRoute from "./routes/medicoRoute.js";
import consultaRoute from "./routes/consultaRoute.js";

// Import do Swagger (Documentação)
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger.js";

const app = express();

// Middlewares Globais
app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173", 
        "https://sistema-de-academia.vercel.app" // Front-end do seu professor
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "ngrok-skip-browser-warning"]
}));

// Rota de Documentação (Swagger)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rota de Teste de Saúde da API
app.get("/", (req, res) => {
    res.status(200).json({ msg: "API funcionando perfeitamente!" });
});

// Registro das Rotas da Aplicação
app.use("/auth", authRoute);
app.use("/usuarios", usuarioRoute);
app.use("/pacientes", pacienteRoute);
app.use("/especialidades", especialidadeRoute);
app.use("/medicos", medicoRoute);
app.use("/consultas", consultaRoute);

// Exporta o app para ser usado no server.js ou nos Testes do Jest
export default app;