import prisma from "../config/prisma.js";

// LISTAR PACIENTES
export const listarPacientes = async (req, res) => {
  try {
    const pacientes = await prisma.paciente.findMany();

    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao listar pacientes",
      erro: error.message
    });
  }
};

// BUSCAR PACIENTE POR ID
export const buscarPacientePorId = async (req, res) => {
  try {
    const { id } = req.params;

    const paciente = await prisma.paciente.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!paciente) {
      return res.status(404).json({
        mensagem: "Paciente não encontrado"
      });
    }

    res.status(200).json(paciente);
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao buscar paciente",
      erro: error.message
    });
  }
};

// CRIAR PACIENTE
export const criarPaciente = async (req, res) => {
  try {
    const { nome, cpf, telefone, email } = req.body;

    if (!nome || !cpf) {
      return res.status(400).json({
        mensagem: "Nome e CPF são obrigatórios"
      });
    }

    const pacienteExistente = await prisma.paciente.findUnique({
      where: { cpf }
    });

    if (pacienteExistente) {
      return res.status(400).json({
        mensagem: "Já existe um paciente com este CPF"
      });
    }

    const paciente = await prisma.paciente.create({
      data: {
        nome,
        cpf,
        telefone,
        email
      }
    });

    res.status(201).json({
      mensagem: "Paciente cadastrado com sucesso",
      paciente
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao cadastrar paciente",
      erro: error.message
    });
  }
};

// ATUALIZAR PACIENTE
export const atualizarPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cpf, telefone, email } = req.body;

    const paciente = await prisma.paciente.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!paciente) {
      return res.status(404).json({
        mensagem: "Paciente não encontrado"
      });
    }

    const pacienteAtualizado = await prisma.paciente.update({
      where: {
        id: Number(id)
      },
      data: {
        nome,
        cpf,
        telefone,
        email
      }
    });

    res.status(200).json({
      mensagem: "Paciente atualizado com sucesso",
      paciente: pacienteAtualizado
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao atualizar paciente",
      erro: error.message
    });
  }
};

// EXCLUIR PACIENTE
export const excluirPaciente = async (req, res) => {
  try {
    const { id } = req.params;

    const paciente = await prisma.paciente.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!paciente) {
      return res.status(404).json({
        mensagem: "Paciente não encontrado"
      });
    }

    await prisma.paciente.delete({
      where: {
        id: Number(id)
      }
    });

    res.status(200).json({
      mensagem: "Paciente removido com sucesso"
    });

  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao remover paciente",
      erro: error.message
    });
  }
};