import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const registrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({
        mensagem: "Nome, email e senha são obrigatórios"
      });
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).json({
        mensagem: "Email já cadastrado"
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash
      }
    });

    res.status(201).json({
      mensagem: "Usuário criado com sucesso"
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao registrar",
      erro: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado"
      });
    }

    const senhaValida = await bcrypt.compare(
      senha,
      usuario.senha
    );

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: "Senha inválida"
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      },
      jwtConfig.secret,
      { expiresIn: "8h" }
    );

    res.json({
      mensagem: "Login realizado com sucesso",
      token
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro no login",
      erro: error.message
    });
  }
};