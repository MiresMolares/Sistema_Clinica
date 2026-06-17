import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true
      }
    });

    res.json(usuarios);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao listar usuários",
      erro: error.message
    });
  }
};

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash
      }
    });

    res.status(201).json(usuario);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao criar usuário",
      erro: error.message
    });
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email } = req.body;

    const usuario = await prisma.usuario.update({
      where: {
        id: Number(id)
      },
      data: {
        nome,
        email
      }
    });

    res.json(usuario);

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao atualizar usuário",
      erro: error.message
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.usuario.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({
      mensagem: "Usuário removido com sucesso"
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao remover usuário",
      erro: error.message
    });
  }
};