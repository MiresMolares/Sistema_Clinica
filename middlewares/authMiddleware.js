import jwt from 'jsonwebtoken';

// Valida o token JWT enviado no header Authorization: Bearer <token>
export const validarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    console.log('authMiddleware - Authorization header:', authHeader);
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('authMiddleware - token ausente');
        return res.status(401).json({ mensagem: "Acesso negado." });
    }

    try {
        const secret = process.env.JWT_SECRET || 'segredo_super_secreto';
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next();
    } catch (err) {
        console.log('authMiddleware - token inválido:', err.message);
        res.status(401).json({ mensagem: "Token inválido." });
    }
};

export default validarToken;