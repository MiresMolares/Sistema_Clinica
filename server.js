import dotenv from "dotenv";
import app from "./app.js";

// Carrega as variáveis do arquivo .env
dotenv.config();

// Define a porta com base no .env ou usa 3000 como padrão
const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📄 Documentação disponível em http://localhost:${PORT}/api-docs`);
});